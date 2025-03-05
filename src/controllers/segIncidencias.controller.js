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

export const getListaSolucionSeg = async (req, res) => {
  let pool;
  try {
    const sql = `EXEC app.usp_ListaSolucionSeg`;
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
        error: "No se encontraron la lista de soluciones para el seg. Incidencia.",
      });
    }
  } catch (error) {
    console.error("Error en seg incidencia :", error);
    return res
      .status(500)
      .json({ error: "Error interno del servidor: " + error.message });
  } finally {
    if (pool) {
      pool.close();
    }
  }
};
// PARA INGRESAR UN NUEVA SOLUCION a LA LISTA
export const ingresarNuevaSolucion = async (req, res) => {
    let pool;
    try {
        const { descripcion, usuario } = req.body;

        if (!descripcion || !usuario) {
            return res.status(400).json({ 
                success: false, 
                message: "Todos los campos son obligatorios" 
            });
        }

        pool = await getConnection();
        const result = await pool.request()
            .input("descripcion", descripcion) // Se evitan inyecciones SQL
            .input("usuario", usuario)
            .execute("app.usp_ingresarSolucionSeg"); // Llamada segura al procedimiento almacenado

        res.json({ 
            success: true, 
            message: "Nueva solución registrada correctamente", 
            data: result.recordset 
        });
    } catch (error) {
        console.error("Error al ejecutar el procedimiento almacenado:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error al registrar una solución en seg. Incidencia" 
        });
    } 
  } 
  
// PARA INGRESAR EL NUEVO SEGUIMIENTO DE INCIDENCIA
export const ingresarNuevaSegmientoIncidencia = async (req, res) => {
    let pool;
    try {
        const { idgestor, num_incidencia, estado , agente, observacion, supervisor, idSolucion } = req.body;

        if (!idgestor || !num_incidencia || !estado|| !agente|| !observacion|| !supervisor|| !idSolucion) {
            return res.status(400).json({ 
                success: false, 
                message: "Todos los campos son obligatorios" 
            });
        }
        pool = await getConnection();
        const result = await pool.request()
            .input("idgestor", idgestor) // Se evitan inyecciones SQL
            .input("num_incidencia", num_incidencia)
            .input("estado", estado) // Se evitan inyecciones SQL
            .input("agente", agente)
            .input("observacion", observacion) // Se evitan inyecciones SQL
            .input("supervisor", supervisor)
            .input("idSolucion", idSolucion) // Se evitan inyecciones SQL
            .execute("app.usp_ingresarSeguimiento"); // Llamada segura al procedimiento almacenado

        res.json({ 
            success: true, 
            message: "Nuevo seguimiento incidencia registrado correctamente", 
            data: result.recordset 
        });
    } catch (error) {
        console.error("Error al ejecutar el procedimiento almacenado:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error al registrar un nuevo seg. Incidencia" 
        });
    } 
  } 

  // Para enviar correo de seg de una incidencia
  export const enviarCorreo = async (req, res) => {
    const { asunto, num, estado , agente, observacion, usuario } = req.body;
  
    try {
      const info = await transporter.sendMail({
        from: '"Soporte" <Jonatan.Pacora@goexpertis.com>', // Cambia esto
        to: ["jose.ramos@goexpertis.com", "roberto.inzua@goexpertis.com", "jonatan.pacora@goexpertis.com", "carlos.calderon@goexpertis.com", "alonso.prado@goexpertis.com"],// Correo del destinatario
        subject: asunto,      
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; border: 1px solid #ddd;">
          <h2 style="color:rgb(11, 45, 80);">📝 Seguimiento Incidencia</h2>
          <p><span style="color:rgb(32, 30, 30);">Buen día estimado</span></p>
          <p><span style="color:rgb(32, 30, 30);">Se registra un seguimiento por parte de ${usuario}.</span></p>
          <p><strong>Nº INCIDENCIA : </strong> <span style="color:rgb(32, 30, 30);">${num}</span></p>
           <p><strong>ESTADO : </strong> <span style="color:rgb(32, 30, 30);">${estado}</span></p>
           <p><strong>AGENTE : </strong> <span style="color: rgb(32, 30, 30);">${agente}</span></p>     
          <p><strong>OBSERVACIÓN : </strong> <span style="color: rgb(32, 30, 30);">${observacion}</span></p>        
          <p><strong>FECHA : </strong> <span style="color:rgb(9, 14, 32);">${new Date().toLocaleDateString()}</span></p>
          <br/>
          <br/>
          <p><span style="color:rgb(32, 30, 30);">Atentamente,</span></p>
          <p><span style="color:rgb(32, 30, 30);">José Luis</span></p>

         <br/>
          <p>📌 <strong>Nota:</strong> Recuerda revisar esta incidencia en el sistema.</p>   
          <p style="font-size: 12px; color: #777;">Este es un mensaje automático, por favor no responder.</p>
        </div>
      `,
      });
  
      console.log("Correo enviado: " + info.response);
      res.json({ success: true, message: "Correo de seguimiento enviado correctamente" });
    } catch (error) {
      console.error("Error al enviar correo de seguimiento: ", error);
      res.status(500).json({ success: false, message: "Error al enviar correo" });
    }
  };
  
