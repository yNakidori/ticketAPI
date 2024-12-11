/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

const trasporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // Email: user: "",
    // Senha de app gerada pelo emial: pass: "",
  },
});

exports.sendEquipmentRequestEmail = functions.firestore
  .onDocumentCreated("equipmentRequests/{requestId}")
  .onCreate(async (snap, context) => {
    const requestData = snap.data();

    const mailOptions = {
      from: "seu-email@gmail.com",
      to: requestData.emailSolicitante, // Para o solicitante
      subject: "Confirmação de Solicitação de Equipamento",
      text: `Olá ${requestData.nomeSolicitante},\n\nSua solicitação de equipamento foi registrada com sucesso.\n\nDetalhes:\n- Tipo: ${requestData.tipoEquipamento}\n- Quantidade: ${requestData.quantidade}\n- Urgência: ${requestData.urgencia}\n\nObrigado!`,
    };

    try {
      await trasporter.sendMail(mailOptions);
      console.log("Confirmação enviada ao usuario com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar a configuração:", error);
    }
  });
