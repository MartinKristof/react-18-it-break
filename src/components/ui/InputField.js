import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

const InputField = ({ inputRef, id, name, label, required, placeholder, value, onChange, type = 'email' }) => (
  <FormGroup>
    <Label for={id}>{label}</Label>
    <Input
      innerRef={inputRef}
      id={id}
      name={name}
      placeholder={placeholder}
      type={type}
      required={required}
      value={value}
      onChange={onChange}
    />
  </FormGroup>
);

export default InputField;
