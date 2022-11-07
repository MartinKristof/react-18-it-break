import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

const InputField = ({ inputRef, id, label, required, placeholder, type = 'email' }) => (
  <FormGroup>
    <Label for={id}>{label}</Label>
    <Input innerRef={inputRef} id={id} name={id} placeholder={placeholder} type={type} required={required} />
  </FormGroup>
);

export default InputField;
