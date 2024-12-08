import React, { useEffect, useState } from "react";
import { Table, Spin } from "antd";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./ProductsPage.scss";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const columns = [
    { title: "Nome", dataIndex: "nome", key: "nome" },
    { title: "Tipo", dataIndex: "tipo", key: "tipo" },
    { title: "Quantidade", dataIndex: "quantidade", key: "quantidade" },
    { title: "Setor/Unidade", dataIndex: "setor", key: "setor" },
    { title: "Fornecedor", dataIndex: "fornecedor", key: "fornecedor" },
    { title: "Preço (R$)", dataIndex: "preco", key: "preco" },
    { title: "Descrição", dataIndex: "descricao", key: "descricao" },
  ];

  return (
    <div className="products-page">
      <h1>Produtos Cadastrados</h1>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          dataSource={products.map((product) => ({
            ...product,
            id: product.id || `temp-${Math.random()}`,
          }))}
          columns={columns}
          rowKey="id"
          bordered
        />
      )}
    </div>
  );
};

export default ProductsPage;
