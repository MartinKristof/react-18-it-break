import React from 'react';
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';

const Post = ({ createdAt, nickName, content }) => (
  <Card>
    <CardBody>
      <CardTitle>{nickName}</CardTitle>
      <CardSubtitle>{new Date(createdAt).toLocaleDateString()}</CardSubtitle>
      <CardText>{content}</CardText>
    </CardBody>
  </Card>
);

export default Post;
