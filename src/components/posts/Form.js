import React from 'react';
import { Button, Form as ReactStrapForm } from 'reactstrap';

import InputField from '../ui/InputField';

const Form = ({ onSubmit, id }) => (
  <ReactStrapForm onSubmit={onSubmit}>
    <InputField id={`${id}-nick`} name="nick" label="Nickname" required />
    <InputField id={`${id}-content`} name="content" label="Content" type="textarea" required />
    <Button size="lg">Ok</Button>
  </ReactStrapForm>
);

export default Form;
