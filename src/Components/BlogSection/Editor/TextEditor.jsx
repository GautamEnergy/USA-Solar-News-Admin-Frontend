import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import { useToast } from '@chakra-ui/react';
import draftToHtml from "draftjs-to-html";
import {  ContentState } from 'draft-js';
import { convertFromHTML } from 'draft-js';
import { Parser } from 'html-to-react';
import axios from "axios";
import { ContextAPI } from '../../../ContextAPI/Context.API'

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Tags from "../../Tags/Tags";
import { Token } from "@mui/icons-material";
import { useLocation } from "react-router-dom"; 


function TextEditor() {

  const location = useLocation();
  const { id } = location.state || {};
  
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  // const [contentHtml, setcontentHtml] = useState('');
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [header, setHeader] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const toast = useToast();
  const { tags, setTags } = ContextAPI();
 
  const Token1 = localStorage.getItem('token'); 

  useEffect(() => {
    if (id) {
      // Define an async function within useEffect
      const fetchData = async () => {
        try {
          const response = await axios.post(`https://gautamsolar.us/admin/news/edit`, { uuid: id });
          const { Header, Description, Body, ImageURL, Tags } = response.data.data;
  
          setHeader(Header);
          setDescription(Description);
  
          // Fetch the existing image from URL and set it as binary in selectedFile
          try {
            const imageResponse = await fetch(ImageURL);
            const imageBlob = await imageResponse.blob();
            setSelectedFile(imageBlob); // Store binary data for submission
            setImagePreview(ImageURL); // Show image preview
          } catch (error) {
            console.error("Error fetching image as binary:", error);
          }
  
          // Parse and format tags
          let parsedTagsArray = [];
          try {
            parsedTagsArray = Tags && Tags !== "[]" ? JSON.parse(Tags) : [];
          } catch (error) {
            console.error("Error parsing tags:", error);
          }
  
          const formattedTags = parsedTagsArray.map(tag => ({
            tag: tag.tag?.trim() || "",
            link: tag.link || ""
          }));
  
          setSelectedTags(formattedTags);
          setTags(formattedTags); 
  
          // Set editor content from Body HTML
          const editorContent = Body 
            ? EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(Body)))
            : EditorState.createEmpty(); // Empty editor if Body is empty
  
          setEditorState(editorContent);
        } catch (error) {
          console.error("Error fetching blog data:", error);
        }
      };
  
      // Call the async function
      fetchData();
    }
  }, [id]);

  // useEffect(() => {
  //   const Token1 = localStorage.getItem('token'); // Example of getting token from localStorage

  // }, [tags])

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
    setSelectedFile(file);  // Update selectedFile
    setImagePreview(URL.createObjectURL(file));  // Update image preview
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };




 
const publishBlog = async () => {
  const contentHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  const formData = new FormData();

  // Check if a new image has been selected or fetch the existing image as binary
  

  formData.append("Header", header);
  formData.append("Description", description);
  formData.append("Body", contentHtml);
  formData.append("UUID", id || ""); // Use UUID if updating or create new entry
  formData.append('tags', JSON.stringify(tags));
  formData.append("BlogImage", selectedFile);


  try {
    await axios.post("https://gautamsolar.us/admin/createNews", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${Token1}`
      },
    });

    toast({
      title: '',
      description: `Blog ${id ? "Updated" : "Created"} Successfully`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top'
    });

    // Reset form after submission
    setSelectedFile(null);
    setHeader("");
    setDescription("");
    setEditorState(EditorState.createEmpty());

  } catch (error) {
    console.error("Error publishing blog:", error.message);
    toast({
      title: 'Error',
      description: "An error occurred while publishing the blog.",
      status: 'error',
      duration: 3000,
      isClosable: true,
      position: 'top'
    });
  }
};

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Upload Blog</h2>

      {/* <div
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
              accept="*"
              style={{ display: "none" }}
              onChange={handleFileChange}

            />
          </>
        )}
      </div> */}
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
        {imagePreview ? (
          <>
            <img
              src={imagePreview}
              alt="Blog Preview"
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
           <p style={{ fontWeight: "bold", fontSize: "large" }}>
  {selectedFile ? selectedFile.name : "No file selected"}
</p>
          </>
        ) : (
          <p>No image selected</p>
        )}
        <input
          type="file"
          id="fileInput"
          accept="*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
          <u>{imagePreview ? "Change Image" : "Click to Select Image"}</u>
        </label>
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
       <label htmlFor="description" style={{ marginRight: "10px" }}>
        Description:
      </label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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

      <Tags />

      <div style={{ marginTop: "8px" }}>
        <button
          onClick={publishBlog}
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
