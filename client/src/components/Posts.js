import React, { Component } from 'react';
import Post from './Post';

class Posts extends Component {
  render() { 
      console.log(this.props)
    return (
      <div>
        <h2 style={{textAlign: 'center', margin: '10px 0'}}>Welcome to Posts</h2>
        {this.props.posts === undefined ? <p>Loading</p> : this.props.posts.map(post => {
          return <Post key={post.id} post={post}/>;
        })}
        
      </div>
    );
  }
}

export default Posts;
