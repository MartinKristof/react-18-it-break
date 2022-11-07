import React, { useId, useState } from 'react';
import { Col, Row } from 'reactstrap';

import Form from '../components/posts/Form';
import PostList from '../components/posts/PostList';
import Suggester from '../components/posts/Suggester';

const Posts = () => {
  const [postItems, setPostItems] = useState([]);
  const id = useId();

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
      <h1>Posts</h1>
      <Row>
        <Col>
          <Suggester list={postItems} id={id} />
        </Col>
        <Col>
          <Form onSubmit={handleSubmit} id={id} />
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
