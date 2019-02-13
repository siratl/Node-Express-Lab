import React, { Component } from 'react';
import './App.css';
import Posts from './components/Posts';
import axios from 'axios';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      title: '',
      contents: '',
    };
  }

  componentDidMount = () => {
    axios
      .get('http://localhost:3333/api/posts')
      .then(res => {
        this.setState({ posts: res.data.posts });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = ev => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  };

  // addPost = event=> {
  //   this.setState({
  //     title: '',
  //     contents: ''
  //   })
  // };

  addPost = ev => {
    //ev.preventDefault()
    axios
    .post('http://localhost:3333/api/posts', {
      title: this.state.title,
      contents: this.state.contents})
    .then(res => {
      console.log(res)
      this.setState({ posts: res.data.posts })})
    .catch(err => {console.log(err)})
  };

  render() {
    console.log(this.state.posts)
    return (
      <div className="App">
        <Form
          onSubmit={this.addPost}
          style={{
            border: '1px solid grey',
            width: '500px',
            margin: '0 auto',
            padding: '20px 50px 0 50px',
          }}
        >
          <FormGroup row>
            <Label for="title" sm={2}>
              Title
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="title"
                placeholder="add a title"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="content" sm={2}>
              Content
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="contents"
                placeholder="add content"
                value={this.state.contents}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup style={{textAlign: 'center'}}>
            <Button type="submit">Add Post</Button>
          </FormGroup>
        </Form>

        <Posts posts={this.state.posts} />
      </div>
    );
  }
}

export default App;
