import { getConnection } from "../database/connection.js";
import nodemailer from "nodemailer"; // ✅ Forma correcta

import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com", // Cambia esto si tu proveedor es otro
  port: 587, // 587 para TLS, 465 para SSL
  secure: false, // true para puerto 465, false para 587
  auth: {
    user: process.env.SMTP_USER, // Tu correo
    pass: process.env.SMTP_PASS, // Puede ser una contraseña de aplicación
  },
});

export const getTipos = async (req, res) => {
  let pool;
  try {
    const sql = `EXEC app.usp_mostrarTipoIncidencia`;
    pool = await getConnection();
    const result = await pool.request().query(sql);

    const tipos = result.recordsets.length; // ✅ Corrección de "length"

    console.log("Resultado:", result.recordsets);

    if (tipos > 0) {
      pool.close();
      return res.status(200).json({ status: 200, data: result.recordsets[0] });
    } else {
      pool.close();
      return res.status(404).json({
        status: 400,
        error: "No se encontraron los tipos paera el usuario.",
      });
    }
  } catch (error) {
    console.error("Error en agendados :", error);
    return res
      .status(500)
      .json({ error: "Error interno del servidor: " + error.message });
  } finally {
    if (pool) {
      pool.close();
    }
  }
};

export const getSubTipo = async (req, res) => {
  let pool;
  try {
    const { tipo } = req.body; // ⚠️ Si es GET, usa req.query en su lugar
    console.log("DESDE EL BODY RECIBES: ", tipo);

    const sql = `EXECUTE app.usp_mostrarSubTipoIncidencia  '${tipo}' `;
    pool = await getConnection();
    const result = await pool.request().query(sql);

    const subtipo = result.recordsets.length;

    console.log("Resultado:", result.recordsets);

    if (subtipo > 0) {
      pool.close();
      return res.status(200).json({ status: 200, data: result.recordsets[0] });
    } else {
      pool.close();
      return res
        .status(404)
        .json({ status: 400, error: "No se encontraron los subtipos." });
    }
  } catch (error) {
    console.error("Error en agendados :", error);
    return res
      .status(500)
      .json({ error: "Error interno del servidor: " + error.message });
  } finally {
    if (pool) {
      pool.close();
    }
  }
};

export const getListaIncidencias = async (req, res) => {
  let pool;
  try {
    const { usuario, estadoInc, numIncidencia } = req.body; // ⚠️ Si es GET, usa req.query en su lugar
    console.log("DESDE EL BODY RECIBES: ", usuario, estadoInc, numIncidencia);

    const sql = `EXECUTE app.usp_mostrarIncidencia '${usuario}' , '${estadoInc}' , ${numIncidencia}`;
    pool = await getConnection();
    const result = await pool.request().query(sql);

    const listaIncidencias = result.recordsets.length;

    console.log("Resultado:", result.recordsets);

    if (listaIncidencias > 0) {
      pool.close();
      return res.status(200).json({ status: 200, data: result.recordsets[0] });
    } else {
      pool.close();
      return res.status(404).json({
        status: 400,
        error: "No se encontraron las incidencias para el usuario.",
      });
    }
  } catch (error) {
    console.error("Error en agendados :", error);
    return res
      .status(500)
      .json({ error: "Error interno del servidor: " + error.message });
  } finally {
    if (pool) {
      pool.close();
    }
  }
};

// Para enviar correo de registro de una incidencia
export const enviarCorreo = async (req, res) => {
  const { asunto, tipoIncidencia, subtipoIncidencia, prioridad , observacion, usuario, asesor } = req.body;

  try {
    const info = await transporter.sendMail({
      from: '"Soporte" <Jonatan.Pacora@goexpertis.com>', // Cambia esto
      to: ["jose.ramos@goexpertis.com", "roberto.inzua@goexpertis.com", "jonatan.pacora@goexpertis.com", "jose.purca@goexpertis.com"],// Correo del destinatario
      subject: asunto,      
      html: `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; border: 1px solid #ddd;">
        <h2 style="color:rgb(11, 45, 80);">📢  Registro de Nueva Incidencia</h2>
        <p><strong>Tipo: </strong> <span style="color:rgb(32, 30, 30);">${tipoIncidencia}</span></p>
         <p><strong>Sub-tipo: </strong> <span style="color:rgb(32, 30, 30);">${subtipoIncidencia}</span></p>
         <p><strong>Registrado por: </strong> <span style="color: rgb(32, 30, 30);">${usuario}</span></p>     
        <p><strong>Usuario: </strong> <span style="color: rgb(32, 30, 30);">${asesor}</span></p>        
        <p><strong>Fecha: </strong> <span style="color:rgb(9, 14, 32);">${new Date().toLocaleDateString()}</span></p>
        <h3 style="color:rgb(18, 26, 63);">Detalles de la incidencia</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Prioridad</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${prioridad}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;  font-weight: bold;">Estado</td>
            <td style="border: 1px solid #ddd; padding: 8px;">Pendiente ⏳</td>
          </tr>
           <tr>
            <td style="border: 1px solid #ddd; padding: 8px;  font-weight: bold;">Observación</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${observacion}</td>
          </tr>
        </table>
        <p>📌 <strong>Nota:</strong> Recuerda revisar esta incidencia en el sistema.</p>   
        <p style="font-size: 12px; color: #777;">Este es un mensaje automático, por favor no responder.</p>
      </div>
    `,
    });

    console.log("Correo enviado: " + info.response);
    res.json({ success: true, message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("Error al enviar correo: ", error);
    res.status(500).json({ success: false, message: "Error al enviar correo" });
  }
};
//Para realizar el insert de una Incidencia

export const registrarIncidencia = async (req, res) => {
  let pool;
  try {
    const { idgestor, subtipo, asesor, prioridad, observacion, supervisor } = req.body;

    if (!idgestor || !subtipo || !asesor || !prioridad || !observacion || !supervisor) {
      return res.status(400).json({ success: false, message: "Todos los campos son obligatorios" });
    }
    const sql = `
      EXEC app.usp_ingresarIncidencia 
      @idgestor = ${idgestor},
      @subtipo = '${subtipo}',
      @asesor = '${asesor}',
      @prioridad = '${prioridad}',
      @observacion = '${observacion}',
      @supervisor = '${supervisor}'
    `;
    pool = await getConnection();
    const result = await pool.request().query(sql);

    res.json({ success: true, message: "Incidencia registrada correctamente", data: result.recordset });
  } catch (error) {
    console.error("Error al ejecutar el procedimiento almacenado:", error);
    res.status(500).json({ success: false, message: "Error al registrar incidencia" });
  }
} 
