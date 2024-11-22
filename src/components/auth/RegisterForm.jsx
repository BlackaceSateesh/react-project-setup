import { useState } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import {
  emailValidator,
  mobileNumberValidator,
  passwordValidator,
} from "../../utils/inputValidator";
import TextInput from "../inputFields/TextInput";
import SelectInput from "../inputFields/SelectInput";
import { createUser, verifyOtp } from "../../api/auth/auth"; // Assume `verifyOtp` exists
import PageLoader from "../PageLoader";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    sponsoremail: "admin@gmail.com",
    name: "Rajat Pradhan",
    country: "india",
    phone: "9666452435",
    position: "left",
    email: "test@gmail.com",
    password: "Test@123",
    confirmPassword: "Test@123",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [notification, setNotification] = useState("");
  const [alertVariant, setAlertVariant] = useState("info"); // Alert variant

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    newErrors.sponsoremail = emailValidator(formData.sponsoremail);
    if (!formData.name) newErrors.name = "Name can't be empty.";
    if (!formData.country) newErrors.country = "Please select a country.";
    newErrors.phone = mobileNumberValidator(formData.phone);
    if (!formData.position) newErrors.position = "Please select a position.";
    newErrors.email = emailValidator(formData.email);
    newErrors.password = passwordValidator(formData.password);
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const payload = { ...formData };
      await createUserHandler(payload);
    }
  };

  const createUserHandler = async (payload) => {
    setLoading(true);
    setNotification("");
    try {
      const response = await createUser(payload);
      if (response.success) {
        setNotification("OTP sent successfully.");
        setAlertVariant("success"); // Green alert for success
        setShowOtpModal(true);
      } else {
        setNotification("Failed to send OTP. Try again.");
        setAlertVariant("danger"); // Red alert for failure
      }
    } catch (error) {
      console.error(error);
      setNotification("An error occurred. Please try again.");
      setAlertVariant("danger"); // Red alert for errors
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    setLoading(true);
    try {
      const response = await verifyOtp({ email: formData.email, otp });
      if (response.success) {
        setNotification("Registration successful!");
        setAlertVariant("success"); // Green alert for success
        setShowOtpModal(false);
      } else {
        setNotification("OTP does not match. Please try again.");
        setAlertVariant("danger"); // Red alert for failure
      }
    } catch (error) {
      console.error(error);
      setNotification("An error occurred while verifying OTP.");
      setAlertVariant("danger"); // Red alert for errors
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
        <h2 className="text-center mb-4 text-[2rem]">Register</h2>
        {notification && (
          <Alert
            variant={alertVariant}
            onClose={() => setNotification("")}
            dismissible
            style={{
              position: "fixed",
              bottom: "5rem",
              right: "1rem",
              zIndex: 1050,
              width: "300px",
              fontSize: ".8rem",
            }}
          >
            {notification}
          </Alert>
        )}
        {loading && <PageLoader isLoading={loading} />}
        <TextInput
          label="Sponsor E-mail"
          type="email"
          placeholder="Sponsor E-mail"
          value={formData.sponsoremail}
          onChange={handleChange}
          name="sponsoremail"
          error={errors.sponsoremail}
        />

        <TextInput
          label="Name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          name="name"
          error={errors.name}
        />

        <SelectInput
          label="Select Country"
          options={[
            { value: "india", label: "India" },
            { value: "usa", label: "United States" },
            { value: "germany", label: "Germany" },
          ]}
          value={formData.country}
          onChange={handleChange}
          name="country"
          error={errors.country}
        />

        <TextInput
          label="Mobile"
          placeholder="Mobile"
          value={formData.phone}
          onChange={handleChange}
          name="phone"
          min={10}
          max={10}
          error={errors.phone}
        />

        <SelectInput
          label="Select Position"
          options={[
            { value: "left", label: "Left" },
            { value: "right", label: "Right" },
          ]}
          value={formData.position}
          onChange={handleChange}
          name="position"
          error={errors.position}
        />

        <TextInput
          label="Email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          name="email"
          error={errors.email}
        />

        <TextInput
          label="Password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          name="password"
          error={errors.password}
        />
        <TextInput
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          error={errors.confirmPassword}
        />

        <Button variant="primary" type="submit" className="w-100 text-[.9rem]">
          Get OTP
        </Button>
      </Form>

      {/* OTP Modal */}
      <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextInput
            label="OTP"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            name="otp"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowOtpModal(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleOtpSubmit}
            disabled={loading}
          >
            Verify OTP
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegisterForm;
