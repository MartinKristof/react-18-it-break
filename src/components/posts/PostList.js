import React from 'react';
import { List } from 'reactstrap';

import Post from './Post';

const PostList = ({ items }) => (
  <List type="unstyled">
    {items.map(item => (
      <li key={`${item.nickName}-${item.createdAt.toString()}`}>
        <Post {...item} />
      </li>
    ))}
  </List>
);

export default PostList;
