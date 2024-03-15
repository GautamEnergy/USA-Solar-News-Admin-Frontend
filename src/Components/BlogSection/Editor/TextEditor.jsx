import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function TextEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [header, setHeader] = useState(""); 

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handlePublish = () => {
    const contentHtml = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );

    console.log("Header:", header);
    console.log("Content HTML:", contentHtml);
    if (selectedFile) {
      console.log("Selected file:", selectedFile.name);
    }
  };
  

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Upload Blog</h2>

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          border: "2px dashed #cccccc",
          borderRadius: "5px",
          padding: "20px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        {selectedFile ? (
          <p style={{ fontWeight: "bold", fontSize: "large" }}>
            {selectedFile.name}
          </p>
        ) : (
          <>
            Drag & Drop{" "}
            <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
              <u>click to select</u>
            </label>
            <input
              type="file"
              id="fileInput"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </>
        )}
      </div>
      <label htmlFor="header" style={{ marginRight: "10px" }}>
        Header:
      </label>
      <input
        type="text"
        id="header"
        value={header}
        onChange={(e) => setHeader(e.target.value)}
        style={{
          marginBottom: "10px",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          width: "100%",
          fontSize: "16px",
        }}
      />

      <div style={{ marginTop: "15px" }}>
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
          wrapperStyle={{
            border: "2px solid black",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            width: "100%",
            minHeight: "400px",
          }}
          editorStyle={{
            height: "calc(100% - 40px)",
            padding: "8px",
            overflow: "auto",
            maxHeight: "calc(100% - 40px)",
          }}
        />
      </div>

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
