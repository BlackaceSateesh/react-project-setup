import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import TextInput from "../inputFields/TextInput";
import { Link, useNavigate } from "react-router-dom"; // for navigation
import { AuthRoutes } from "../../constants/Routes";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email || !formData.email.includes("@"))
      newErrors.email = "Invalid email.";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      simulateLogin(formData);
    }
  };

  const simulateLogin = (credentials) => {
    setLoading(true);
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (user) =>
          user.email === credentials.email &&
          user.password === credentials.password
      );

      if (user) {
        // Generate a simple token (replace with actual token generation in production)
        const token = `token-${new Date().getTime()}`;
        localStorage.setItem("authToken", token); // Store the token
        setNotification("Login successful!");
        setTimeout(() => {
          navigate("/"); // Redirect to dashboard after successful login
          window.location.reload()
        }, 1000);
      } else {
        setNotification("Invalid email or password.");
      }
      setLoading(false);
    }, 1000); // Simulate a delay
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
      <h2 className="text-center mb-4 text-[2rem]">Login</h2>

      {notification && (
        <Alert
          variant={notification === "Login successful!" ? "success" : "danger"}
          onClose={() => setNotification("")}
          dismissible
        >
          {notification}
        </Alert>
      )}

      {loading && <div className="text-center mb-3">Loading...</div>}

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
      <Link to={AuthRoutes.REGISTER}>SignUp</Link>
    </Form>
  );
};

export default LoginForm;
