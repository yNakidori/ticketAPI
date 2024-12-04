import React, { useState } from "react";
import { Form, Input, Button, Select, message, InputNumber } from "antd";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./ProductForm.scss";

const { Option } = Select;

const ProductForm = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const dataToSave = {
        ...values,
        nome: values.nome.toUpperCase(), // Convertendo o nome para maiúsculas
        data: new Date().toISOString(),
      };
      await addDoc(collection(db, "products"), dataToSave);
      message.success("Produto adicionado com sucesso!");
      onSuccess();
    } catch (error) {
      console.log("Erro ao adicionar produto", error);
      message.error("Erro ao adicionar produto!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form-container">
      <h1>Cadastrar Produto</h1>
      <Form layout="vertical" onFinish={onFinish} className="product-form">
        <Form.Item
          label="Tipo"
          name="tipo"
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
          </Select>
        </Form.Item>
        <Form.Item
          label="Nome do Produto"
          name="nome"
          rules={[
            { required: true, message: "Por favor, insira o nome do produto!" },
          ]}
        >
          <Input placeholder="Nome do produto" />
        </Form.Item>
        <Form.Item
          label="Quantidade"
          name="quantidade"
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
          name="descricao"
          rules={[
            { required: true, message: "Por favor, insira a descrição!" },
          ]}
        >
          <Input.TextArea rows={3} placeholder="Descrição do produto" />
        </Form.Item>
        <Form.Item
          label="Setor/Unidade"
          name="setor"
          rules={[
            { required: true, message: "Por favor, insira o setor/unidade!" },
          ]}
        >
          <Input placeholder="Setor ou unidade responsável" />
        </Form.Item>
        <Form.Item
          label="Fornecedor"
          name="fornecedor"
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
          name="preco"
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
