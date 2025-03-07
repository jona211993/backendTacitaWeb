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

export const buscarPorCodigoIDC = async (req, res) => {
    let pool;
    const {documento,usuario}= req.body;
    try {
      const sql = `EXEC app.usp_ListaDocumentosxCodigoIDC '${documento}' , '${usuario}'`;
      pool = await getConnection();
      const result = await pool.request().query(sql);
  
      const listaDocumentosPorCodigoIDC = result.recordsets.length; // ✅ Corrección de "length"
  
      console.log("Resultado:", result.recordsets);
  
      if (listaDocumentosPorCodigoIDC > 0) {
        pool.close();
        return res.status(200).json({ status: 200, data: result.recordsets[0] });
      } else {
        pool.close();
        return res.status(404).json({
          status: 400,
          error: "No se encontraron la lista  buscada por codigo IDC",
        });
      }
    } catch (error) {
      console.error("Error en lista de documentos buscados por codigo IDC :", error);
      return res
        .status(500)
        .json({ error: "Error interno del servidor: " + error.message });
    } finally {
      if (pool) {
        pool.close();
      }
    }
  };

// Para Lista de Detalle Documento por ID
export const getListaDetalleDocumentoPorID= async (req, res) => {
  let pool;
  const {idCarta, tipo}= req.body;
  try {
   let idCarta2 = parseInt(idCarta, 10);
 
    const sql = `EXEC app.usp_ListaDetalleDocumentoXID ${idCarta2} , '${tipo}'`;
    pool = await getConnection();
    const result = await pool.request().query(sql);

    const detalle = result.recordsets.length; // ✅ Corrección de "length"

    console.log("Resultado:", result.recordsets);

    if (detalle> 0) {
      pool.close();
      return res.status(200).json({ status: 200, data: result.recordsets[0] });
    } else {
      pool.close();
      return res.status(404).json({
        status: 400,
        error: "No se encontraron la lista detalle",
      });
    }
  } catch (error) {
    console.error("Error en listar el detalle :", error);
    return res
      .status(500)
      .json({ error: "Error interno del servidor: " + error.message });
  } finally {
    if (pool) {
      pool.close();
    }
  }
};
