import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { db, storage, auth } from "../../firebase/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

const { TextArea } = Input;

const FormTicket = () => {
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState(null);
  const [groups, setGroups] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Obter dados do usuário logado
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userQuery = query(
          collection(db, "users"),
          where("email", "==", user.email)
        );
        onSnapshot(userQuery, (snapshot) => {
          if (!snapshot.empty) {
            const userData = snapshot.docs[0].data();
            setUserInfo({
              name: userData.name,
              email: userData.email,
              group: userData.group || null, // Assumindo que o grupo está no Firestore
            });
            form.setFieldsValue({
              creatorName: userData.name,
              creatorEmail: userData.email,
              group: userData.group,
            });
          }
        });
      }
    });

    const unsubscribeGroups = onSnapshot(
      collection(db, "groups"),
      (snapshot) => {
        const groupsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setGroups(groupsData);
      }
    );

    return () => {
      unsubscribeAuth();
    };
  }, [form]);

  // Lógica para envio do formulário
  const onFinish = async (values) => {
    setUploading(true);
    try {
      // Upload de anexos ao Firebase Storage
      const attachmentUrls = await Promise.all(
        (values.attachments?.fileList || []).map(async (file) => {
          const storageRef = ref(storage, `tickets/${file.name}`);
          const uploadTask = uploadBytesResumable(
            storageRef,
            file.originFileObj
          );
          await new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              null,
              (error) => reject(error),
              () => resolve()
            );
          });
          return await getDownloadURL(storageRef);
        })
      );

      // Salvar o ticket no Firestore
      await addDoc(collection(db, "tickets"), {
        creatorName: values.creatorName,
        creatorEmail: values.creatorEmail,
        group: values.group,
        description: values.description,
        attachments: attachmentUrls,
        createdAt: new Date(),
      });

      message.success("Ticket criado com sucesso!");
      form.resetFields();
    } catch (error) {
      console.error("Erro ao criar o ticket:", error);
      message.error("Falha ao criar o ticket.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item label="Nome do Criador" name="creatorName">
        <Input readOnly placeholder="Nome do usuário logado" />
      </Form.Item>

      <Form.Item label="E-mail do Criador" name="creatorEmail">
        <Input readOnly placeholder="E-mail do usuário logado" />
      </Form.Item>

      <Form.Item
        label="Grupo"
        name="group"
        rules={[{ required: true, message: "Selecione o grupo!" }]}
      >
        <Select placeholder="Selecione o grupo" disabled={!!userInfo?.group}>
          {groups.map((group) => (
            <Select.Option key={group.id} value={group.name}>
              {group.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Descrição do Problema"
        name="description"
        rules={[{ required: true, message: "Descreva o problema!" }]}
      >
        <TextArea rows={4} placeholder="Detalhe o problema" />
      </Form.Item>

      <Form.Item label="Anexos" name="attachments">
        <Upload multiple listType="picture" beforeUpload={() => false}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={uploading}>
          Criar Ticket
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormTicket;
