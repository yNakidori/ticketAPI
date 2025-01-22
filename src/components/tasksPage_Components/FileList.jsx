import React, { useEffect, useState } from "react";
import { ref, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    setLoading(true);
    const storageRef = ref(storage, "uploads/");
    try {
      const result = await listAll(storageRef);
      const fileList = await Promise.all(
        result.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { name: itemRef.name, url, ref: itemRef };
        })
      );
      setFiles(fileList);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (fileRef) => {
    try {
      await deleteObject(fileRef);
      setFiles(files.filter((file) => file.ref !== fileRef));
      console.log("File deleted successfully.");
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <Typography variant="h6" gutterBottom>
        Lista de Arquivos
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : files.length > 0 ? (
        <List>
          {files.map((file) => (
            <ListItem key={file.name}>
              <ListItemText primary={file.name} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="download"
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DownloadIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(file.ref)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">Nenhum arquivo disponível.</Typography>
      )}
    </div>
  );
};

export default FileList;
