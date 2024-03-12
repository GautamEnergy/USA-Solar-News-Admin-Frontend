// // ImagePopupModal.js
// import React, { useEffect, useState } from 'react';
// import { useToast } from '@chakra-ui/react';

// const ImagePopupModal = ({ isOpen, onClose }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [description, setDescription] = useState('');
//   const [header, setHeader] = useState('');
//   const toast = useToast();

//   useEffect(() => {
//     setSelectedFile(null);
//     setDescription('');
//     setHeader('');
//   }, [isOpen]);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//   };

//   const handleSubmit = async () => {
//     if (!description || !selectedFile || !header) {
//       toast({
//         description: 'Input is not valid',
//         status: 'info',
//         duration: 5000,
//         isClosable: true,
//         position: 'top',
//       });
//       return;
//     }

//     const formData = new FormData();
//     formData.append('Description', description);
//     formData.append('header', header);
//     formData.append('productimage', selectedFile);

//     // Here goes your upload logic
//     // Use fetch or any other method to send the data to the server

//     // After successful upload, you can close the modal
//     onClose();
//   };

//   return (
//     <div style={{ padding: '' }}>
//       <div style={{ border: '2px dashed #cccccc', borderRadius: '5px', padding: '20px', textAlign: 'center', marginBottom: '20px' }}>
//         {selectedFile ? (
//           <p style={{ fontWeight: 'bold', fontSize: 'large' }}>{selectedFile.name}</p>
//         ) : (
//           <>
//             Drag & Drop{' '}
//             <label htmlFor="fileInput">
//               <u style={{}}>click to select</u>
//             </label>
//             <input
//               type="file" 
//               id="fileInput"
//               accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//               style={{ display: 'none' }}
//               onChange={handleFileChange}
//             />
//           </>
//         )}
//       </div>
//       <button onClick={handleSubmit}>Upload</button>
//     </div>
//   );
// };

// export default ImagePopupModal;
