import React, { Component } from 'react';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import axios from "axios";
import 'draft-js/dist/Draft.css';
let URL = "https://protoblog-7431f.firebaseio.com/posts.json";

class App extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  componentDidMount() {
    const content = window.localStorage.getItem('content');
    let result;
    if (content) {
      result = EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
      this.setState({ editorState: result });
    }
    else {
      result = EditorState.createEmpty();
      this.setState({ editorState: result });
    }
  }

  handleChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    console.log('content state', convertToRaw(contentState));
    this.setState({ editorState });
  }

  saveContent = () => {
    const content = this.state.editorState.getCurrentContent();
    window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
  }

  saveToDB = () => {

    let text = this.state.editorState.getCurrentContent();
    /*let data = JSON.stringify({
      content: convertToRaw(text),
    });*/
    let id = new Date().toLocaleString();
    let exp = convertToRaw(text);
    let content = exp.blocks;
    let data = {
      id: id,
      content: content
    };
    console.log(content);
    axios.post(URL, data)
      .then(msg => console.log(msg))
      .catch(err => console.log(err));

  }

  render() {
    return (
      <div id="content">
      <div className="editor">
      <Editor
        onChange={this.handleChange}
        editorState={this.state.editorState}
      />
     
      </div>
       <button onClick={this.saveContent}>Press</button>
       <button onClick={this.saveToDB}>Save to Database</button>
      </div>
    );
  }
}

export default App;
