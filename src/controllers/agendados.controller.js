
import { getConnection } from "../database/connection.js";

export const getAgendadosSupervisor = async (req, res) => {
  let pool;
  try {
    const {ID_GESTOR } = req.body; // ⚠️ Si es GET, usa req.query en su lugar
    console.log("DESDE EL BODY RECIBES: ", ID_GESTOR);

    if (!ID_GESTOR) {
      return res.status(400).json({ error: "El idGestor es obligatorio." });
    }
  
    const sql = `EXEC app.usp_mostrarAgendamientoSup '${ID_GESTOR}'`;
    pool = await getConnection();
    const result = await pool.request().query(sql);

    const agendados = result.recordsets.length; // ✅ Corrección de "length"

    console.log("Resultado:", result.recordsets);

    if (agendados > 0) {
        pool.close();
      return res.status(200).json({ status: 200, data: result.recordsets });
      
    } else {
        pool.close();
      return res.status(404).json({ status: 400 , error: "No se encontraron los agendados paera el usuario." });
    }
  } catch (error) {
    console.error("Error en agendados :", error);
    return res.status(500).json({ error: "Error interno del servidor: " + error.message });
  } finally {
    if (pool) {
      pool.close();
    }
  }
};

export const getAgendados = async (req, res) => {
    let pool;
    try {
      const {idGestor } = req.body; // ⚠️ Si es GET, usa req.query en su lugar
      console.log("DESDE EL BODY RECIBES: ", idGestor);
  
      if (!idGestor) {
        return res.status(400).json({ error: "El idGestor es obligatorio." });
      }
    
      const sql = `EXEC app.usp_mostrarAgendamiento '${idGestor}'`;
      pool = await getConnection();
      const result = await pool.request().query(sql);
  
      const agendados = result.recordsets.length; // ✅ Corrección de "length"
  
      console.log("Resultado:", result.recordsets);
  
      if (agendados > 0) {
          pool.close();
        return res.status(200).json({ status: 200, data: result.recordsets });
        
      } else {
          pool.close();
        return res.status(404).json({ status: 400 , error: "No se encontraron los agendados paera el usuario." });
      }
    } catch (error) {
      console.error("Error en agendados :", error);
      return res.status(500).json({ error: "Error interno del servidor: " + error.message });
    } finally {
      if (pool) {
        pool.close();
      }
    }
  };



