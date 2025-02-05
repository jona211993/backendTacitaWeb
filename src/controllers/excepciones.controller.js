import { getConnection } from "../database/connection.js";
import sql from "mssql";
import dayjs from "dayjs";
// Para Obtener las excepciones
export const getExcepciones = async (req, res) => {
  const { id_cargo, usuario } = req.body; // Campos enviados desde la solicitud
  let pool;
  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("id_cargo", id_cargo) // Agrega el primer parámetro
      .input("usuario", usuario) // Agrega el segundo parámetro
      .execute("app.usp_mostrarExcepcion"); // Llamada segura al procedimiento almacenado

    // Verificar si se obtuvieron datos
    if (result.recordsets && result.recordsets[0].length > 0) {
      const data = result.recordsets[0]; // Obtener la primera tabla de resultados

      return res.status(200).json({
        message: "Consulta Exitosa",
        status: 200,
        data: data,
      });
    } else {
      return res.status(404).json({
        message: "No se encontraron excepciones",
        status: 404,
        data: [],
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar obtener las excepciones",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

// Para Obtener las excepciones
export const getExcepcionesPorAsesor = async (req, res) => {
  const { idgestor } = req.body; // Campos enviados desde la solicitud
  let pool;
  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idgestor", idgestor) // Agrega el primer parámetro
       .execute("app.usp_mostrarExcepcionAsesor"); // Llamada segura al procedimiento almacenado

    // Verificar si se obtuvieron datos
    if (result.recordsets ) {
      const data = result.recordsets[0]; // Obtener la primera tabla de resultados

      return res.status(200).json({
        message: "Consulta Exitosa",
        status: 200,
        data: data,
      });
    } else {
      return res.status(404).json({
        message: "No se encontraron excepciones de esete asesor",
        status: 404,
        data: [],
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar obtener las excepciones de este asesor",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};


// PARA EVALUAR LA EXCEPCION
export const evaluarExcepcion = async (req, res) => {
  const { idExcepcion, idDeudor, idEntidad, idGestor, fecha_aprobacion, monto_aprobacion, cuota_aprobacion, gestor, detalle, observacion_ap } = req.body;
  console.log("Valores recibidos en el body:", req.body); 
  
  let pool;
  try {    
    // let sql = `execute app.usp_evaluarExcepcion ${idExcepcion} , ${idDeudor}, ${idEntidad}, ${idGestor}, '${fecha_aprobacion}',${monto_aprobacion} , ${cuota_aprobacion}, '${gestor}', '${detalle}', '${observacion_ap}';`;
    // console.log("query: ",sql)
    // pool = await getConnection(); 


    if (!dayjs(fecha_aprobacion, "YYYY-MM-DD", true).isValid()) {
      return res.status(400).json({
        message: "El formato de fecha_aprobacion es inválido. Use YYYY-MM-DD.",
      });
    }   

    const formattedDate = dayjs(fecha_aprobacion).format("YYYY-MM-DD"); // Asegúrate de que tenga el formato esperado por SQL Server
    const dateWithoutTimezone = new Date(fecha_aprobacion).toISOString().slice(0, 10); // "YYYY-MM-DD"
    pool = await getConnection();
    const request = pool.request();
    
    // Usar parámetros en lugar de interpolación de cadenas
    request.input('idExcepcion', sql.Int, idExcepcion);
    request.input('idDeudor', sql.Int, idDeudor);
    request.input('idEntidad', sql.Int, idEntidad);
    request.input('idGestor', sql.Int, idGestor);
    request.input('fecha_aprobacion', sql.VarChar, formattedDate); // Asegúrate de que la fecha sea correcta
    request.input('monto_aprobacion', sql.Decimal(18, 2), monto_aprobacion); 
    request.input('cuota_aprobacion', sql.Int, cuota_aprobacion);
    request.input('gestor', sql.VarChar(50), gestor);
    request.input('detalle', sql.VarChar(20), detalle);
    request.input('observacion_ap', sql.VarChar(799), observacion_ap);
       // Ejecutar el procedimiento almacenado
       const result = await request.execute("app.usp_evaluarExcepcion");
    console.log(result); 
    return res.status(200).json({
      message: "Excepción evaluada exitosamente",
      status:200,
      data: result.recordset,
    });   
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar evaluar las excepciones",
      status:400
    });    
  } finally {
    if (pool) {
      pool.close();
    }
  }
};


