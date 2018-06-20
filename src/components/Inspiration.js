import React, { Component } from 'react';
import { firebase } from '../firebase/firebase';
import ReactQuill from 'react-quill';
import _ from 'lodash';
import 'react-quill/dist/quill.snow.css';
import renderHTML from 'react-render-html';
import './App.css';


class Inspiration extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      title: '',
      body: '',
      iposts: [], 
    };

    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
  }

  componentDidMount(){
    /* Create reference to messages in Firebase Database */
    let Ref = firebase.database().ref('iposts').orderByKey().limitToLast(100);
    Ref.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let ipost = { text: snapshot.val(), id: snapshot.key };
      this.setState({ iposts: [ipost].concat(this.state.iposts) });
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
    const ipost = {
      title: this.state.title,
      body: this.state.body
    };
    firebase.database().ref('iposts').push(ipost);
    this.setState ({
      title: '',
      body: ''
    });
  }
  //render posts from firebase
  renderiPosts(){
    return _.map(this.state.iposts, (ipost, key) => {
      return (
        <div 
          className="posts"
          key={key}
          >
          <h4>{ipost.text.title}</h4>
          <p>{renderHTML(ipost.text.body)}</p>
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
                  modules={Inspiration.modules}
                  formats = {Inspiration.formats}
                  value={this.state.body} 
                  placeholder="Body"
                  onChange={this.onHandleChange} 
                />
                </div>
                <button className="btn btn-success quillbut">Post</button>
            </form>
            <div>
              {this.renderiPosts()}
            </div>
            </div>
      </div> 
           


    );
  }
}

Inspiration.modules= {
  toolbar: [
    [{'header':'1'}, {'header':'2'}, {'font': []}],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    ['link', 'image', 'video'],
    ['clean'],
  ]
}

Inspiration.formats= [
  'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'link', 'image', 'video'
]


export default Inspiration;