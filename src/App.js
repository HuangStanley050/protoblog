import React, { Component } from 'react';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
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
      </div>
    );
  }
}

export default App;
