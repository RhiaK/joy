import React, { Component } from 'react';
import { firebase } from '../firebase/firebase';
import ReactQuill from 'react-quill';
import _ from 'lodash';
import 'react-quill/dist/quill.snow.css';
import renderHTML from 'react-render-html';
import './App.css';


class Freebies extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      title: '',
      body: '',
      fposts: [], 
    };

    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
  }

  componentDidMount(){
    /* Create reference to messages in Firebase Database */
    let Ref = firebase.database().ref('fposts').orderByKey().limitToLast(100);
    Ref.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let fpost = { text: snapshot.val(), id: snapshot.key };
      this.setState({ fposts: [fpost].concat(this.state.fposts) });
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
    const fpost = {
      title: this.state.title,
      body: this.state.body
    };
    firebase.database().ref('fposts').push(fpost);
    this.setState ({
      title: '',
      body: ''
    });
  }
  //render posts from firebase
  renderfPosts(){
    return _.map(this.state.fposts, (fpost, key) => {
      return (
        <div 
          className="posts"
          key={key}
          >
          <h4>{fpost.text.title}</h4>
          <p>{renderHTML(fpost.text.body)}</p>
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
                  modules={Freebies.modules}
                  formats = {Freebies.formats}
                  value={this.state.body} 
                  placeholder="Body"
                  onChange={this.onHandleChange} 
                />
                </div>
                <button className="btn btn-success quillbut">Post</button>
            </form>
            <div>
              {this.renderfPosts()}
            </div>
            </div>
      </div> 
           


    );
  }
}

Freebies.modules= {
  toolbar: [
    [{'header':'1'}, {'header':'2'}, {'font': []}],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    ['link', 'image', 'video'],
    ['clean'],
  ]
}

Freebies.formats= [
  'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'link', 'image', 'video'
]


export default Freebies;