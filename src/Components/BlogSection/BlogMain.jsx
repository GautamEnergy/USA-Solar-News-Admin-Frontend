// import React, { useState } from "react";
// import TextEditor from "./Editor/TextEditor";

// const BlogMain = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [title, setTitle] = useState(""); // State for title
//   const [description, setDescription] = useState("");
//   const [header, setHeader] = useState("");

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const file = event.dataTransfer.files[0];
//     setSelectedFile(file);
//   };

//   const handleSubmit = async () => {
//     if (!title || !description || !selectedFile || !header) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("BlogDescription", description);
//     formData.append("header", header);
//     formData.append("productimage", selectedFile);

//     try {
//       const response = await fetch("https://your-api-endpoint.com", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await response.json();
//       console.log(data);
//       alert("News created successfully.");
//       // Clear form fields after successful submission
//       setSelectedFile(null);
//       setTitle("");
//       setDescription("");
//       setHeader("");
//     } catch (error) {
//       console.error("Error:", error);
//       alert("An error occurred while creating the news.");
//     }
//   };

//   const handleCancel = () => {
//     setSelectedFile(null);
//     setTitle("");
//     setDescription("");
//     setHeader("");
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h2>Upload Blog</h2>

//       <div
//         onDragOver={handleDragOver}
//         onDrop={handleDrop}
//         style={{
//           border: "2px dashed #cccccc",
//           borderRadius: "5px",
//           padding: "20px",
//           textAlign: "center",
//           marginBottom: "20px",
//         }}
//       >
//         {selectedFile ? (
//           <p style={{ fontWeight: "bold", fontSize: "large" }}>
//             {selectedFile.name}
//           </p>
//         ) : (
//           <>
//             Drag & Drop{" "}
//             <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
//               <u>click to select</u>
//             </label>
//             <input
//               type="file"
//               id="fileInput"
//               accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//               style={{ display: "none" }}
//               onChange={handleFileChange}
//             />
//           </>
//         )}
//       </div>
//       <label htmlFor="header" style={{ marginRight: "10px" }}>
//         Header:
//       </label>
//       <input
//         type="text"
//         id="header"
//         value={header}
//         onChange={(e) => setHeader(e.target.value)}
//         style={{
//           marginBottom: "10px",
//           padding: "8px", // Adjust padding for size
//           border: "1px solid #ccc", // Add border style
//           borderRadius: "5px", // Add border radius for rounded corners
//           width: "100%", // Make the input full width
//           fontSize: "16px", // Adjust font size
//         }}
//       />

//       <div style={{ marginTop: "15px" }}>
//         {/* <TextEditor /> */}
//       </div>
//     </div>
//   );
// };

// export default BlogMain;
