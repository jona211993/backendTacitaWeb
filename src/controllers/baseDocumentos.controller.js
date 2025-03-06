import { getConnection } from "../database/connection.js";

import dotenv from "dotenv";

dotenv.config();

export const getListaDocumentosPendientes = async (req, res) => {
  let pool;
  const {usuario}= req.body;
  try {
    const sql = `EXEC app.usp_ListaDocumentosPendientes '${usuario}'`;
    pool = await getConnection();
    const result = await pool.request().query(sql);

    const listaPendientes = result.recordsets.length; // ✅ Corrección de "length"

    console.log("Resultado:", result.recordsets);

    if (listaPendientes > 0) {
      pool.close();
      return res.status(200).json({ status: 200, data: result.recordsets[0] });
    } else {
      pool.close();
      return res.status(404).json({
        status: 400,
        error: "No se encontraron la lista documentos pendientes",
      });
    }
  } catch (error) {
    console.error("Error en lista de documentos pendientes :", error);
    return res
      .status(500)
      .json({ error: "Error interno del servidor: " + error.message });
  } finally {
    if (pool) {
      pool.close();
    }
  }
};

export const getListaDocumentosGenerados = async (req, res) => {
    let pool;
    const {usuario}= req.body;
    try {
      const sql = `EXEC app.usp_ListaDocumentosGenerados '${usuario}'`;
      pool = await getConnection();
      const result = await pool.request().query(sql);
  
      const listaGenerados = result.recordsets.length; // ✅ Corrección de "length"
  
      console.log("Resultado:", result.recordsets);
  
      if (listaGenerados > 0) {
        pool.close();
        return res.status(200).json({ status: 200, data: result.recordsets[0] });
      } else {
        pool.close();
        return res.status(404).json({
          status: 400,
          error: "No se encontraron la lista documentos generados",
        });
      }
    } catch (error) {
      console.error("Error en lista de documentos generados :", error);
      return res
        .status(500)
        .json({ error: "Error interno del servidor: " + error.message });
    } finally {
      if (pool) {
        pool.close();
      }
    }
  };