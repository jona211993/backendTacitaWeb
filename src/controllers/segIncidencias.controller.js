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
  
