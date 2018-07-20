import React, { Component } from 'react';
import { firebase } from '../firebase/firebase';
import ReactQuill from 'react-quill';
import _ from 'lodash';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'react-quill/dist/quill.snow.css';
import renderHTML from 'react-render-html';
import './App.css';


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      title: '',
      body: '',
      posts: [],
      modal: false 
    };

    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  // componentDidMount() {
  //   firebase.on('value', snapshot => {
  //     this.setState({
  //       posts: snapshot.val()
  //     });
  //   });
  // }

  componentDidMount(){
    /* Create reference to messages in Firebase Database */
    let Ref = firebase.database().ref('posts').orderByKey().limitToLast(100);
    Ref.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let post = { text: snapshot.val(), id: snapshot.key };
      this.setState({ posts: [post].concat(this.state.posts) });
    })
    this._isMounted = true;
  }

  onHandleChange(e) {
    this.setState({ 
      body: e 
    });
  }

  onHandleSubmit(e) {
    e.preventDefault();
    const post = {
      title: this.state.title,
      body: this.state.body
    };
    firebase.database().ref('posts').push(post);
    this.setState ({
      title: '',
      body: ''
    });
  }


  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  //render posts from firebase
  renderPosts(){
    return _.map(this.state.posts, (post, key) => {
      return (
        <div 
          className="posts"
          key={key}
          >
          <h4>{post.text.title}</h4>
          <p>{renderHTML(post.text.body)}</p>
          <Button className= "changebut" color="warning" onClick={this.toggle}>Update</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
              <ModalBody>
              <form
              onSubmit={this.onHandleSubmit}
              >
                <div className="form-group">
                <input
                  value={this.state.title}
                  className="form-control titlef" 
                  type="text" 
                  name="title" 
                  placeholder="Title"
                  ref="title" 
                  onChange={(e) => {this.setState({title: e.target.value});
                  }} 
                />
                </div>
                <div className="form-group">
                <ReactQuill
                  modules={Home.modules}
                  formats = {Home.formats}
                  value={this.state.body} 
                  placeholder="Body"
                  onChange={this.onHandleChange} 
                />
                </div>
            </form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggle}>Update</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          <button className="btn btn-danger changebut">Delete</button>
        </div>
      )
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="container">
            <div>
            <form
              className="sm-10 quillc"
              onSubmit={this.onHandleSubmit}
            >
                <div className="form-group">
                <input
                  value={this.state.title}
                  className="form-control titlef" 
                  type="text" 
                  name="title" 
                  placeholder="Title"
                  ref="title" 
                  onChange={(e) => {this.setState({title: e.target.value});
                  }} 
                />
                </div>
                <div className="form-group">
                <ReactQuill
                  modules={Home.modules}
                  formats = {Home.formats}
                  value={this.state.body} 
                  placeholder="Body"
                  onChange={this.onHandleChange} 
                />
                </div>
                <button className="btn btn-success quillbut">Post</button>
            </form>
            <div>
              {this.renderPosts()}
            </div>
            </div>
      </div> 
           


    );
  }
}

Home.modules= {
  toolbar: [
    [{'header':'1'}, {'header':'2'}, {'font': []}],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    ['link', 'image', 'video'],
    ['clean'],
  ]
}

Home.formats= [
  'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'link', 'image', 'video'
]


export default Home;