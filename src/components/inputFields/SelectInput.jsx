/* eslint-disable react/prop-types */
import { Form } from "react-bootstrap";

const SelectInput = ({ label, options, value, onChange, name, error }) => (
  <Form.Group controlId={name} className="mb-[1rem]">
    {label && <Form.Label className="text-[.9rem] mb-[1.2rem]" >{label}</Form.Label>}
    <Form.Select className="text-[.8rem]" value={value} onChange={onChange} name={name} isInvalid={!!error}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Select>
    <Form.Control.Feedback type="invalid" className="text-[.8rem] mt-2">{error}</Form.Control.Feedback>
  </Form.Group>
);

export default SelectInput;
