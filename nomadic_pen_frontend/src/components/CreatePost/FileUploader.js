/* Author: Meet Sinojia */

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@mui/material";

const FileUploader = ({ onFileChange, selectedFile }) => {
  const [fileError, setFileError] = useState("");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    disabled: !!selectedFile, // Disable dropzone when a file is already selected
    onDropAccepted: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result;
        setFileError("");
        onFileChange(base64String);
      };

      reader.onerror = () => {
        setFileError("Error occurred while reading the file.");
      };

      reader.readAsDataURL(file);
    },
    onDropRejected: () => {
      onFileChange(null);
      setFileError("Invalid file type. Please select an image.");
    },
  });

  return (
    <div>
      <div
        {...getRootProps()}
        style={{ marginBottom: "1rem", textAlign: "center" }}
      >
        <input {...getInputProps()} />
        {!selectedFile && (
          <>
            {isDragActive ? (
              <p>Drop the image here...</p>
            ) : (
              <p>Drag and drop an image here or click to browse</p>
            )}
            <Button variant="contained">Browse</Button>
          </>
        )}
      </div>
      {selectedFile && selectedFile.startsWith("data:image/") && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <img
              src={selectedFile}
              alt="Selected"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          </div>
          <Button
            variant="contained"
            style={{ marginTop: "1rem" }}
            onClick={() => onFileChange(null)}
          >
            Remove
          </Button>
        </div>
      )}
      {fileError && <p style={{ color: "red" }}>{fileError}</p>}
    </div>
  );
};

export default FileUploader;
