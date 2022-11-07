import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import Form from '../components/posts/Form';
import PostList from '../components/posts/PostList';

const Posts = () => {
  const [postItems, setPostItems] = useState([]);

  const handleSubmit = event => {
    event.preventDefault();

    const newPost = {
      createdAt: Date.now(),
      nickName: event.currentTarget.elements.nick.value,
      content: event.currentTarget.elements.content.value,
    };

    setPostItems(oldItems => [...oldItems, newPost]);

    event.currentTarget.reset();
  };

  return (
    <>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit} />
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <PostList items={postItems} />
        </Col>
      </Row>
    </>
  );
};

export default Posts;
