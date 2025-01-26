import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Modal, Form, Input, message } from "antd";
import { db } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import "./ProductsPage.scss";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [form] = Form.useForm();

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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
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
      const updatedValues = {
        ...values,
        price: Number(values.price), // Garante que price é um número
        perunityprice: Number(values.perunityprice), // Garante que perunityprice é um número
        quantity: Number(values.quantity), // Também converte quantity se necessário
      };

      const productRef = doc(db, "products", currentProduct.id);
      await updateDoc(productRef, updatedValues);

      setProducts((prev) =>
        prev.map((product) =>
          product.id === currentProduct.id
            ? { ...product, ...updatedValues }
            : product
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

  const onFormValuesChange = (changedValues, allValues) => {
    const { price, quantity } = allValues;
    if (price && quantity) {
      const perunityprice = (price / quantity).toFixed(2);
      form.setFieldsValue({ perunityprice });
    }
  };

  const handleModalCancel = () => {
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
      <h1 className="main-title">Estoque Principal</h1>
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
              initialValues={currentProduct}
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

export default ProductsPage;
