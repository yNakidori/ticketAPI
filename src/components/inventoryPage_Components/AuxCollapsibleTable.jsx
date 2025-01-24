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
import { KeyboardArrowDown, KeyboardArrowUp, Build } from "@mui/icons-material";
import { db } from "../../firebase/firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
} from "firebase/firestore";

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
        <TableCell>{row.perunityprice}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            size="small"
            onClick={() => setDialogOpen(true)}
            startIcon={<Build />}
          ></Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Detalhes
              </Typography>
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
        <DialogTitle>Realizar Movimentação</DialogTitle>
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

const AuxCollapsibleTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = () => {
      const q = query(collection(db, "aux'Pproducts"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const productsData = [];
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productsData);
      });

      return () => unsubscribe(); // Cleanup function
    };

    const unsubscribeProducts = fetchProducts();
    return () => unsubscribeProducts();
  }, []);

  const handleUpdate = async (id, newQuantity, quantity, operation, reason) => {
    try {
      const productRef = doc(db, "auxProducts", id);
      await updateDoc(productRef, {
        quantity: newQuantity,
        lastChange: {
          operation,
          change: quantity,
          reason,
          updatedAt: new Date(),
        },
      });

      // Atualizar o estado local para refletir as mudanças imediatamente
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, quantity: newQuantity } : product
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
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

export default AuxCollapsibleTable;
