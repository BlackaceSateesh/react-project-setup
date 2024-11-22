/* eslint-disable react/prop-types */
import { Form } from "react-bootstrap";

const TextInput = ({ label,min, max, type, placeholder, value, onChange, name, error }) => (
  <Form.Group controlId={name} className="mb-[1rem]">
    {label && <Form.Label className="text-[.9rem] mb-[1.2rem]" >{label}</Form.Label>}
    <Form.Control
      type={type || "text"}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      minLength={min}
      maxLength={max}
      isInvalid={!!error}className="text-[.8rem]"
    />
    <Form.Control.Feedback type="invalid" className="text-[.8rem] mt-2">{error}</Form.Control.Feedback>
  </Form.Group>
);

export default TextInput;
