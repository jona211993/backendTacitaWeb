import { getConnection } from "../database/connection.js";
import sql from "mssql";

// Para PAgos NOR y REC
export const getBusquedaNOR = async (req, res) => {
    let pool;
  
    const { tipo, fec_inicio, fec_fin, documento, usuario } = req.body;
    
    try {
        pool = await getConnection();
        const result = await pool
          .request()
          .input("tipo", tipo)
          .input("fec_inicio", fec_inicio)
          .input("fec_fin", fec_fin)
          .input("documento", documento)
          .input("usuario", usuario)
          .execute("app.usp_mostrarPagosNOR"); // Llamada segura al procedimiento almacenado
    
        // console.log(result);
        if (result.rowsAffected.length > 0) {
          return res.status(200).json({
            message: "Consulta Exitosa",
            status: 200,
            data: result.recordsets[0]
          });
        } else {
          return res.status(404).json({
            message: "No al buscar pagos",
          });
        }
      } catch (error) {
        console.error("Error en la consulta SQL:", error.message);
        return res.status(400).json({
          message: "Error al intentar obtener los pagos NOR",
        });
      } finally {
        if (pool) {
          pool.close(); // Cerrar la conexión
        }
      }
  };

  export const getBusquedaREC = async (req, res) => {
    let pool;  
    const { tipo, fec_inicio, fec_fin, canal ,documento, TIPO_A, USUARIO } = req.body;
    
    try {
        pool = await getConnection();
        const result = await pool
          .request()
          .input("tipo", tipo)
          .input("fec_inicio", fec_inicio)
          .input("fec_fin", fec_fin)
          .input("canal", canal)
          .input("documento", documento)
          .input("TIPO_A", TIPO_A)
          .input("USUARIO", USUARIO)
          .execute("app.usp_mostrarPagosRECGen"); // Llamada segura al procedimiento almacenado
    
        // console.log(result);
        if (result.rowsAffected.length > 0) {
          return res.status(200).json({
            message: "Consulta Exitosa",
            status: 200,
            data: result.recordsets[0]
          });
        } else {
          return res.status(404).json({
            message: "ERROR al buscar pagos REC",
          });
        }
      } catch (error) {
        console.error("Error en la consulta SQL:", error.message);
        return res.status(400).json({
          message: "Error al intentar obtener los pagos REC",
        });
      } finally {
        if (pool) {
          pool.close(); // Cerrar la conexión
        }
      }
  };

// Para la lista de canales:
export const getCanales = async (req, res) => {
  let pool;  
 
  
  try {
      pool = await getConnection();
      const result = await pool
        .request()       
        .execute("app.usp_listaCanal"); // Llamada segura al procedimiento almacenado
  
      // console.log(result);
      if (result.rowsAffected.length > 0) {
        return res.status(200).json({
          message: "Consulta Exitosa",
          status: 200,
          data: result.recordsets[0]
        });
      } else {
        return res.status(404).json({
          message: "ERROR al buscar canales",
        });
      }
    } catch (error) {
      console.error("Error en la consulta SQL:", error.message);
      return res.status(400).json({
        message: "Error al intentar obtener los canales",
      });
    } finally {
      if (pool) {
        pool.close(); // Cerrar la conexión
      }
    }
};

// Para la lista de canales:
export const getCarteras = async (req, res) => {
  let pool;  
  const { documento } = req.body;
  
  try {
      pool = await getConnection();
      const result = await pool
        .request()
        .input("documento", documento)
        .execute("app.usp_listaCartera_Pago"); // Llamada segura al procedimiento almacenado
  
       console.log(result);
      if (result.recordsets[0].length > 0) {
        return res.status(200).json({
          message: "Consulta Exitosa",
          status: 200,
          data: result.recordsets[0]
        });
      } else {
        return res.status(404).json({
          status: 404,
          message: "ERROR al buscar carteras de ese documento",
        });
      }
    } catch (error) {
      console.error("Error en la consulta SQL:", error.message);
      return res.status(400).json({
        message: "Error al intentar obtener las carteras",
      });
    } finally {
      if (pool) {
        pool.close(); // Cerrar la conexión
      }
    }
};

//Controlador para Reconocer Concepto

export const reconocerConceptoPago = async (req, res) => {
  let pool;
  const {
    idPago,
    idConceptoPago,
    monto,
    usuario    
  } = req.body;
  console.log(
    "recibiendo: ",
    idPago,
    idConceptoPago,
    monto,
    usuario 
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idPago", idPago)
      .input("idConceptoPago", idConceptoPago)
      .input("monto", monto)
      .input("usuario", usuario)
      .execute("app.usp_reconocerConceptoPago"); // Llamada segura al procedimiento almacenado
    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de Reconocimiento de concepto Pago exitoso",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar el reconocimiento de concepto de pago",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar un reconocimiento concepto de pago",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};


// Controlador para Reconocer Pago

export const reconocerPago = async (req, res) => {
  let pool;
  const {
    idPago,
    idDeuda,
    usuario,
    numop

  } = req.body;
  console.log(
    "recibiendo: ",
    idPago,
    idDeuda,
    usuario ,
    numop
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idPago", idPago)
      .input("idDeuda", idDeuda)      
      .input("usuario", usuario)
      .input("numop", numop)
      .execute("app.usp_reconocerPago"); // Llamada segura al procedimiento almacenado
    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de Reconocimiento de Pago exitoso",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar el reconocimiento de pago",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar un reconocimiento de pago",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

