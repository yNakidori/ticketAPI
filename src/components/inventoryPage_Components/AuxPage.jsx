import React, { useState, useEffect } from "react";
import { Table, Space, Modal, Form, Input, message } from "antd";
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
  const [form] = Form.useForm();

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
        console.error("Erro ao carregar os produtos:", error);
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
    form.setFieldsValue(product);
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

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setCurrentProduct(null);
  };

  const onFormValuesChange = (changedValues, allValues) => {
    const { price, quantity } = allValues;
    if (price && quantity) {
      const perunityprice = (price / quantity).toFixed(2);
      form.setFieldsValue({ perunityprice });
    }
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
      title: "Preço de nota",
      dataIndex: "price",
      key: "price",
      render: (price) => {
        const numericPrice = Number(price);
        return !isNaN(numericPrice) ? `R$ ${numericPrice.toFixed(2)}` : "—";
      },
    },
    {
      title: "Preço Unitário",
      dataIndex: "perunityprice",
      key: "perunityprice",
      render: (perunityprice) => {
        const numericPrice = Number(perunityprice);
        return !isNaN(numericPrice) ? `R$ ${numericPrice.toFixed(2)}` : "—";
      },
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
    <div>
      <h1 className="main-title">Estoque Auxiliar</h1>
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
              form={form}
              onFinish={handleModalOk}
              onValuesChange={onFormValuesChange}
              layout="vertical"
            >
              <Form.Item
                name="name"
                label="Nome do Produto"
                rules={[
                  { required: true, message: "Insira o nome do produto!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="type" label="Tipo">
                <Input />
              </Form.Item>
              <Form.Item
                name="quantity"
                label="Quantidade"
                rules={[{ required: true, message: "Insira a quantidade!" }]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                name="price"
                label="Preço"
                rules={[{ required: true, message: "Insira o preço!" }]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item name="perunityprice" label="Preço Unitário">
                <Input type="number" disabled />
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
    </div>
  );
};

export default AuxPage;
