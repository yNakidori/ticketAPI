import React, { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./ProductForm.scss";

const { Option } = Select;

const ProductForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await addDoc(collection(db, "products"), {
        ...values,
        data: new Date().toISOString(),
      });
      message.success("Produto adicionado com sucesso!");
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
            <Option value="Entrada">Entrada</Option>
            <Option value="Saída">Saída</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Produto"
          name="produto"
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
          label="Solicitante"
          name="solicitante"
          rules={[
            {
              required: true,
              message: "Por favor, insira o nome do solicitante!",
            },
          ]}
        >
          <Input placeholder="Nome do solicitante" />
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
