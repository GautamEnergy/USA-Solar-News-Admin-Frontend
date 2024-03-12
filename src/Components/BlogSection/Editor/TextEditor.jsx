import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function TextEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const uploadImageCallBack = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve({ data: { link: reader.result } });
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handlePublish = () => {
    const contentHtml = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    // Here you can perform any action related to publishing the content
    console.log("Publishing content:", contentHtml);
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName" 
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          image: {
            uploadCallback: uploadImageCallBack,
            alt: { present: true, mandatory: true },
          },
        }}
        // Apply custom style to the Editor component
        wrapperStyle={{
          border: "2px solid black",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          width: "100%",
          minHeight: "400px", // Adjust the minimum height as per your requirement
        }}
        editorStyle={{ 
          height: "calc(100% - 40px)", // Subtracting the height of the button
          padding: "8px", 
          overflow: "auto",
          maxHeight: "calc(100% - 40px)" // Adjust the maximum height as per your requirement
        }} 
      />
    

      <div style={{ marginTop: "8px" }}>
        <button
          onClick={handlePublish}
          style={{
            cursor: "pointer",
            background: "#A20000",
            color: "#fff",
            borderRadius: "5px",
            padding: "8px 16px",
            border: "none",
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#FF6347")}
          onMouseLeave={(e) => (e.target.style.background = "#5DADE2")}
        >
          Publish
        </button>
      </div>
    </div>
  );
}

export default TextEditor;

// **********************************************************

