import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import styles from "./FileUploader.module.scss";
import { Button, Typography, CircularProgress } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setIsUploading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDownloadURL(url);
          setIsUploading(false);
        });
      }
    );
  };

  return (
    <div className={styles["file-upload"]}>
      <Typography variant="h6" gutterBottom>
        Upload de Arquivo
      </Typography>
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="file-input"
      />
      <label htmlFor="file-input">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<UploadIcon />}
        >
          Selecionar Arquivo
        </Button>
      </label>
      {file && (
        <Typography variant="body2">
          Arquivo selecionado: {file.name}
        </Typography>
      )}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleUpload}
        disabled={!file || isUploading}
      >
        {isUploading ? "Enviando..." : "Enviar Arquivo"}
      </Button>
      {isUploading && (
        <Box sx={{ width: "100%", mt: 2 }}>
          <CircularProgress variant="determinate" value={progress} />
          <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
            Progresso: {Math.round(progress)}%
          </Typography>
        </Box>
      )}
      {downloadURL && (
        <Typography variant="body2">
          Upload concluído!{" "}
          <a
            href={downloadURL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles["download-link"]}
          >
            Baixar arquivo
          </a>
        </Typography>
      )}
    </div>
  );
};

export default FileUpload;
