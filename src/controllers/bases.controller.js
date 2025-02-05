
import { getConnection } from "../database/connection.js";

export const getBasesManuales = async (req, res) => {
  let pool;
  try {
    const { idGestor } = req.body; // ⚠️ Si es GET, usa req.query en su lugar
    console.log("DESDE EL BODY RECIBES: ", idGestor);

    if (!idGestor) {
      return res.status(400).json({ error: "El idGestor es obligatorio." });
    }
  
    const sql = `EXEC app.usp_consultarBaseManual '${idGestor}'`;
    pool = await getConnection();
    const result = await pool.request().query(sql);

    const basesManuales = result.recordsets.length; // ✅ Corrección de "length"

    console.log("Resultado:", result.recordsets);

    if (basesManuales > 0) {
        pool.close();
      return res.status(200).json({ status: 200, data: result.recordsets });
      
    } else {
        pool.close();
      return res.status(404).json({ status: 400 , error: "No se encontraron bases manuales." });
    }
  } catch (error) {
    console.error("Error en getBasesManuales:", error);
    return res.status(500).json({ error: "Error interno del servidor: " + error.message });
  } finally {
    if (pool) {
      pool.close();
    }
  }
};


export const getSeguimientoPDP = async (req, res) => {
    let pool;
    try {
      const { ASESOR } = req.body; // ⚠️ Si es GET, usa req.query en su lugar
      console.log("DESDE EL BODY RECIBES: ", ASESOR);
  
      if (!ASESOR) {
        return res.status(400).json({ error: "El ASESOR es obligatorio." });
      }
  
      const sql = ` EXECUTE app.usp_consultarSeguimientoPDP '${ASESOR}';`;
      pool = await getConnection();
      const result = await pool.request().query(sql);  
      console.log("Resultado:", result);
  
      // Acceder correctamente a los datos devueltos
      const segPDPs = result.recordset; // Aquí se encuentran las filas de la consulta
  
      if (segPDPs.length > 0) {
        return res.status(200).json({ data: segPDPs });
      } else {
        return res.status(404).json({ error: "No se encontraron seguimientos PDP." });
      }
    } catch (error) {
      console.error("Error en getSeguimientoPDP:", error);
      return res.status(500).json({ error: "Error interno del servidor: " + error.message });
    } finally {
      if (pool) {
        await pool.close();
      }
    }
  };

  export const getSeguimientoVLL = async (req, res) => {
    let pool;
    try {
      const { ASESOR } = req.body; // ⚠️ Si es GET, usa req.query en su lugar
      console.log("DESDE EL BODY RECIBES: ", ASESOR);
  
      if (!ASESOR) {
        return res.status(400).json({ error: "El ASESOR es obligatorio." });
      }
  
      const sql = ` EXECUTE app.usp_consultarSeguimientoVLL '${ASESOR}';`;
      pool = await getConnection();
      const result = await pool.request().query(sql);  
      console.log("Resultado:", result);
  
      // Acceder correctamente a los datos devueltos
      const segPDPs = result.recordset; // Aquí se encuentran las filas de la consulta
  
      if (segPDPs.length > 0) {
        return res.status(200).json({ data: segPDPs });
      } else {
        return res.status(404).json({ error: "No se encontraron seguimientos VLL." });
      }
    } catch (error) {
      console.error("Error en getSeguimientoVLL:", error);
      return res.status(500).json({ error: "Error interno del servidor: " + error.message });
    } finally {
      if (pool) {
        await pool.close();
      }
    }
  };