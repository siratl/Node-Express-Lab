import React from 'react';

const Post = props => {
  return (
    <div style={{ border: '1px solid grey', width: '400px', margin: '0 auto', borderRadius: '5px', marginBottom: '15px' }}>
      <ul>
        <li>
          <h6>{props.post.title}</h6>
        </li>
        <li>
          <p style={{}}>{props.post.contents}</p>
        </li>
      </ul>
      <p style={{ fontSize: '12px', margin: '0', textAlign: 'center'}}>{props.post.created_at}</p>
    </div>
  );
};

export default Post;
