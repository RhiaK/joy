import React, { Component } from 'react';
import { database } from '../firebase/firebase';
import _ from 'lodash';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import renderHTML from 'react-render-html'; 
import './App.css';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: '', 
      posts: {}, 
      authUser: false
    };

    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
  }

  componentDidMount() {
    database.on('value', snapshot => {
      this.setState({
        posts: snapshot.val()
      });
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
          <h2>{post.title}</h2>
          <p>{renderHTML(post.body)}</p>
        </div>
      )
    });
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
    database.push(post);
    this.setState ({
      title: '',
      body: ''
    });
  }

  render() {
    return (
      <div className="container">
        {this.props.authUser
           ? (
            <form
              onSubmit={this.onHandleSubmit}>
                <div className="form-group">
                <input
                  value={this.state.title}
                  className="form-control" 
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
                <button className="btn btn-success">Post</button>
            </form>
          )
        : null
        }
        <div>
          {this.renderPosts()}
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