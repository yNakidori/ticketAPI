import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Select, InputNumber } from "antd";
import { db, auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import "./ProductForm.scss";

const { Option } = Select;

const ProductForm = ({ onSave }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [userCity, setUserCity] = useState("");

  useEffect(() => {
    const fetchUserCity = async () => {
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserCity(userData.city || "");
          } else {
            console.log("Não foi possível carregar os dados do usuário.");
          }
        }
      });
    };

    fetchUserCity();
  }, []);

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const { name, quantity, description, supplier, price, type } = values;

      // Salvando no Firebase
      await addDoc(collection(db, "products"), {
        name,
        quantity: parseInt(quantity, 10),
        description,
        supplier,
        price,
        type,
        sector: userCity, // Cidade do usuário como setor/unidade
        createdAt: new Date(),
      });

      message.success("Produto cadastrado com sucesso!");
      form.resetFields();
      onSave && onSave();
    } catch (error) {
      message.error("Erro ao cadastrar produto!");
      console.error("Erro ao cadastrar o produto:", error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <div className="product-form-container">
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFormSubmit}
        className="product-form"
      >
        <Form.Item
          label="Tipo"
          name="type"
          rules={[{ required: true, message: "Por favor, selecione o tipo!" }]}
        >
          <Select placeholder="Selecione o tipo">
            <Option value="Papel">Papeis A4, A3</Option>
            <Option value="Caderno">Caderno/Agenda</Option>
            <Option value="Caneta">Caneta</Option>
            <Option value="Clips">Clips</Option>
            <Option value="Grampos">Grampos</Option>
            <Option value="Percevejos">Percevejos</Option>
            <Option value="Pasta">Pasta</Option>
            <Option value="Envelope">Envelope</Option>
            <Option value="Adesivos">Adesivos</Option>
            <Option value="Etiquetas">Etiquetas</Option>
            <Option value="Tesouras">Tesouras</Option>
            <Option value="Estiletes">Estiletes</Option>
            <Option value="Fitas">Fitas</Option>
            <Option value="Colas">Colas</Option>
            <Option value="Calculadora">Calculadora</Option>
            <Option value="Grampeador">Grampeador</Option>
            <Option value="Impressoras">Impressoras</Option>
            <Option value="Cartuchos">Cartuchos</Option>
            <Option value="Toners">Toners</Option>
            <Option value="Ribbon">Ribbon</Option>
            <Option value="Suporte para monitor">Suporte para monitor</Option>
            <Option value="Desktops">Desktops</Option>
            <Option value="Notebooks">Notebooks</Option>
            <Option value="Tablets">Tablets</Option>
            <Option value="Monitores">Monitores</Option>
            <Option value="Projetores">Projetores</Option>
            <Option value="Perifericos">Periféricos</Option>
            <Option value="Cabos">Cabos</Option>
            <Option value="Fones de ouvido">Fones de ouvido</Option>
            <Option values="Armazenamento">Armazenamento</Option>
            <Option value="Outros">Outros</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Nome do Produto"
          name="name"
          rules={[
            { required: true, message: "Por favor, insira o nome do produto!" },
          ]}
        >
          <Input placeholder="Nome do produto" />
        </Form.Item>
        <Form.Item
          label="Quantidade"
          name="quantity"
          rules={[
            { required: true, message: "Por favor, insira a quantidade!" },
          ]}
        >
          <InputNumber
            min={1}
            placeholder="Quantidade"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          label="Descrição"
          name="description"
          rules={[
            { required: true, message: "Por favor, insira a descrição!" },
          ]}
        >
          <Input.TextArea rows={3} placeholder="Descrição do produto" />
        </Form.Item>
        <Form.Item label="Setor/Unidade">
          <Input
            value={userCity}
            disabled
            placeholder="Setor ou unidade responsável"
            style={{ backgroundColor: "#f5f5f5" }}
          />
        </Form.Item>
        <Form.Item
          label="Fornecedor"
          name="supplier"
          rules={[
            {
              required: true,
              message: "Por favor, insira o nome do fornecedor!",
            },
          ]}
        >
          <Input placeholder="Nome do fornecedor" />
        </Form.Item>
        <Form.Item
          label="Último Preço de Compra"
          name="price"
          rules={[
            { required: true, message: "Por favor, insira o preço de compra!" },
          ]}
        >
          <InputNumber
            min={0.01}
            step={0.01}
            formatter={(value) =>
              `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/[R$\s,]/g, "")}
            placeholder="Último preço de compra"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cadastrar Produto
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductForm;
