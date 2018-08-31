import React from "react";
import { Editor } from "draft-js";

const AppEditor = (props) => {
    return (
        <Editor 
             onChange
             editorState={props.editorState}
            />
    );
};

export default AppEditor;
