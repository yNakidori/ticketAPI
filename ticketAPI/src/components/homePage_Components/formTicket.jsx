import React, { useState } from 'react';
import { Form, Input, Button, Select, Radio } from 'antd';
import { SearchOutlined, SendOutlined } from '@ant-design/icons';
import axios from 'axios';
import styles from './FormTicket.module.scss';

const FormTicket = () => {
    const [form] = Form.useForm();
    const [cep, setCep] = useState('');
    const [feedback, setFeedback] = useState(null);

    const handleLoadCep = () => {
        if (cep.length === 8) {
            axios.get(`https://api.postmon.com.br/v1/cep/${cep}`)
                .then(response => {
                    const { logradouro, cidade, estado } = response.data;
                    form.setFieldsValue({
                        logradouro,
                        cidade,
                        estado
                    });
                })
                .catch(error => {
                    console.log('Erro ao obter o endereço:', error);
                });
        }
    };

    const onFinish = (values) => {
        console.log('Received values:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={styles['form-container']}>
            <Form
                form={form}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Solicitante"
                    name="solicitante"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Select />
                </Form.Item>

                <Form.Item
                    label="Assunto"
                    name="assunto"
                    rules={[{ required: true, message: 'Please input the subject!' }]}
                >
                    <Select />
                </Form.Item>

                <Form.Item
                    label="Forma de contato"
                    name='contato'
                    rules={[{ required: true, message: 'Please input the contact method!' }]}
                >
                    <Select />
                </Form.Item>

                <Form.Item
                    label="Descrição"
                    name="descricao"
                    rules={[{ required: true, message: 'Please input the description!' }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label="Feedback"
                    name="feedback"
                    rules={[{ required: true, message: 'Please input the feedback!' }]}
                >
                    <Radio.Group onChange={(e) => setFeedback(e.target.value)}>
                        <Radio value={1}>Concluído</Radio>
                        <Radio value={2}>Abertura de chamado</Radio>
                    </Radio.Group>
                </Form.Item>

                {feedback === 1 && (
                    <Form.Item
                        label="Resolução"
                        name="resolucao"
                        rules={[{ required: true, message: 'Please input the resolution!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                )}

                {feedback === 2 && (
                    <>
                        <Form.Item
                            label="Prioridade"
                            name="prioridade"
                            rules={[{ required: true, message: 'Please input the priority!' }]}
                        >
                            <Select />
                        </Form.Item>

                        <Form.Item
                            label="Responsável"
                            name="responsavel"
                            rules={[{ required: true, message: 'Please input the responsible!' }]}
                        >
                            <Select />
                        </Form.Item>

                        <Form.Item
                            label="Natureza do chamado"
                            name="natureza"
                            rules={[{ required: true, message: 'Please input the nature of the call!' }]}
                        >
                            <Select />
                        </Form.Item>

                        <Form.Item
                            label="CEP"
                            name="cep"
                            rules={[{ required: true, message: 'Please input your CEP!' }]}
                        >
                            <Input value={cep} onChange={(e) => setCep(e.target.value)} />
                        </Form.Item>

                        <Form.Item
                            label="Logradouro"
                            name="logradouro"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Cidade"
                            name="cidade"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Estado"
                            name="estado"
                        >
                            <Input />
                        </Form.Item>
                    </>
                )}

                <Form.Item className={styles['form-actions']}>
                    {feedback === 2 && (
                        <Button type="primary" className="load-address-btn" onClick={handleLoadCep} icon={<SearchOutlined />}>
                            Carregar Endereço
                        </Button>
                    )}
                    <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default FormTicket;
