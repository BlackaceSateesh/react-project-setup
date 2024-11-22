import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import {
  emailValidator,
  passwordValidator,
} from "../../utils/inputValidator";
import TextInput from "../inputFields/TextInput";
import { loginUser } from "../../api/auth/auth";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    newErrors.email = emailValidator(formData.email);
    newErrors.password = passwordValidator(formData.password);

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const payload = { ...formData };
      loginUserHandler(payload);
    }
  };

  const loginUserHandler = async (payload) => {
    setLoading(true);
    console.log("Payload:", payload);
    try {
      await loginUser(payload); // Assume loginUser is an API call
    } catch (error) {
      console.error("Login Error:", error);
      setErrors({ general: "Invalid email or password" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
      <h2 className="text-center mb-4 text-[2rem]">Login</h2>
      {loading && <span>Loading...</span>}
      {errors.general && (
        <div className="text-danger mb-3">{errors.general}</div>
      )}
      <TextInput
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        name="email"
        error={errors.email}
      />

      <TextInput
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        name="password"
        error={errors.password}
      />

      <Button
        variant="primary"
        type="submit"
        className="w-100 text-[1.4rem] mt-3"
        disabled={loading}
      >
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
