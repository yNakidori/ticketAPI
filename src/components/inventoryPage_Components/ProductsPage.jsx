// ProductsPage.jsx
import React, { useState, useEffect } from "react";
import { Table, Tag, Space } from "antd";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import "./ProductsPage.scss";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
      } catch (error) {
        console.error("Erro ao carregar os produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  const columns = [
    {
      title: "Nome do Produto",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Quantidade",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Preço",
      dataIndex: "price",
      key: "price",
      render: (price) => `R$ ${price.toFixed(2)}`,
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ações",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <a>Editar</a>
          <a>Excluir</a>
        </Space>
      ),
    },
  ];

  return (
    <div className="products-page-container">
      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ProductsPage;
