import React from 'react';
import { Button, Form as ReactStrapForm } from 'reactstrap';

import InputField from '../ui/InputField';

const Form = ({ onSubmit }) => (
  <ReactStrapForm onSubmit={onSubmit}>
    <InputField id="nick" label="Nickname" required />
    <InputField id="content" label="Content" type="textarea" required />
    <Button size="lg">Ok</Button>
  </ReactStrapForm>
);

export default Form;
