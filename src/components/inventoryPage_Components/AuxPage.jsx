import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Modal, Form, Input, message } from "antd";
import { db } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import "./AuxPage.scss";

const AuxPage = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "auxProducts");
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
      } catch (error) {
        console.errror("Erro ao carregar os produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "auxProducts", id));
      setProducts((prev) => prev.filter((product) => product.id !== id));
      message.success("Produto excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o produto:", error);
      message.error("Erro ao excluir o produto. Tente novamente.");
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsModalVisible(true);
  };

  const handleModalOk = async (values) => {
    try {
      const productRef = doc(db, "auxProducts", currentProduct.id);
      await updateDoc(productRef, values);
      setProducts((prev) =>
        prev.map((product) =>
          product.id === currentProduct.id ? { ...product, ...values } : product
        )
      );
      message.success("Produto atualizado com sucesso!");
      setIsModalVisible(false);
      setCurrentProduct(null);
    } catch (error) {
      console.error("Erro ao atualizar o produto:", error);
      message.error("Erro ao atualizar o produto. Tente novamente.");
    }
  };

  const handlemodalCancel = () => {
    setIsModalVisible(false);
    setCurrentProduct(null);
  };

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
      title: "Ações",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>Editar</a>
          <a onClick={() => handleDelete(record.id)}>Excluir</a>
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
      <Modal
        title="Editar Produto"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        {currentProduct && (
          <Form
            initialValues={currentProduct}
            onFinish={handleModalOk}
            layout="vertical"
          >
            <Form.Item
              name="name"
              label="Nome do Produto"
              rules={[{ required: true, message: "Insira o nome do produto!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="type" label="Tipo">
              <Input />
            </Form.Item>
            <Form.Item name="quantity" label="Quantidade">
              <Input type="number" />
            </Form.Item>
            <Form.Item name="price" label="Preço">
              <Input type="number" />
            </Form.Item>
            <Form.Item name="description" label="Descrição">
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Space>
                <button type="submit" className="btn btn-primary">
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={handleModalCancel}
                  className="btn btn-secondary"
                >
                  Cancelar
                </button>
              </Space>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default AuxPage;
