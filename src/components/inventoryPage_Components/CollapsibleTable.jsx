import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { db, auth } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function Row({ row, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [operation, setOperation] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [reason, setReason] = useState("");

  const handleUpdate = async () => {
    const newQuantity =
      operation === "entrada"
        ? row.quantity + quantity
        : row.quantity - quantity;

    await onUpdate(row.id, newQuantity, quantity, operation, reason);
    setDialogOpen(false);
    setOperation("");
    setQuantity(0);
    setReason("");
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.type}</TableCell>
        <TableCell>{row.quantity}</TableCell>
        <TableCell>{row.price}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            size="small"
            onClick={() => setDialogOpen(true)}
          >
            Atualizar
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Detalhes
              </Typography>
              <Typography>Descrição: {row.description}</Typography>
              <Typography>Fornecedor: {row.supplier}</Typography>
              <Typography>Setor/Unidade: {row.sector}</Typography>
              <Typography>
                Data de Cadastro:{" "}
                {new Date(row.createdAt.seconds * 1000).toLocaleDateString()}
              </Typography>

              {row.lastChange && (
                <>
                  <Typography variant="subtitle1" gutterBottom>
                    Última Movimentação
                  </Typography>
                  <Typography>Operação: {row.lastChange.operation}</Typography>
                  <Typography>
                    Quantidade Alterada: {row.lastChange.change}
                  </Typography>
                  <Typography>Motivo: {row.lastChange.reason}</Typography>
                  <Typography>
                    Data da Alteração:{" "}
                    {new Date(
                      row.lastChange.updatedAt.seconds * 1000
                    ).toLocaleDateString()}
                  </Typography>
                </>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Atualizar Produto</DialogTitle>
        <DialogContent>
          <Typography>Operação:</Typography>
          <Box display="flex" gap={1} marginY={1}>
            <Button
              variant={operation === "entrada" ? "contained" : "outlined"}
              onClick={() => setOperation("entrada")}
            >
              Entrada
            </Button>
            <Button
              variant={operation === "saida" ? "contained" : "outlined"}
              onClick={() => setOperation("saida")}
            >
              Saída
            </Button>
          </Box>

          <TextField
            style={{ backgroundColor: "white" }}
            margin="dense"
            label="Quantidade"
            type="number"
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          {operation === "saida" && (
            <TextField
              style={{ backgroundColor: "white" }}
              margin="dense"
              label="Motivo/Destinatário"
              fullWidth
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleUpdate} disabled={!operation || quantity <= 0}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const CollapsibleTable = () => {
  const [products, setProducts] = useState([]);
  const [userCity, setUserCity] = useState("");

  useEffect(() => {
    const fetchUserCity = () => {
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          const userDoc = await getDocs(
            query(collection(db, "users"), where("uid", "==", currentUser.uid))
          );
          const userData = userDoc.docs[0]?.data();
          setUserCity(userData?.city || "");
        }
      });
    };

    const fetchProducts = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, "products"), where("sector", "==", userCity))
      );
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    };

    if (userCity) fetchProducts();
    else fetchUserCity();
  }, [userCity]);

  const handleUpdate = async (id, newQuantity, change, operation, reason) => {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, {
      quantity: newQuantity,
      lastChange: {
        operation,
        change,
        reason,
        updatedAt: new Date(),
      },
    });

    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nome</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Quantidade</TableCell>
            <TableCell>Preço</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <Row key={product.id} row={product} onUpdate={handleUpdate} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleTable;
