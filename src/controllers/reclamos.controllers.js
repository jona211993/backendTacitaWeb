import { getConnection } from "../database/connection.js";

// Para Obtener los reclamos
export const getReclamos = async (req, res) => {
  let pool;
  try {
    pool = await getConnection();
    const result = await pool.request().execute("app.usp_mostrarReclamo"); // Llamada segura al procedimiento almacenado

    if (result.rowsAffected.length > 0) {
      // Modificar el atributo `via` en cada objeto
      const data = result.recordsets[0].map((item) => ({
        ...item,
        // via: item.via ? item.via.slice(0, -2) : item.via, // Elimina los últimos 4 caracteres si existe
      }));

      return res.status(200).json({
        message: "Consulta Exitosa",
        status: 200,
        data: data,
      });
    } else {
      return res.status(404).json({
        message: "No se obtuvo algo al buscar reclamos",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar obtener los reclamos",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

// Para Obtener las via
export const getListaViaReclamo = async (req, res) => {
  let pool;
  try {
    pool = await getConnection();
    const result = await pool.request().execute("app.usp_mostrarViaReclamo"); // Llamada segura al procedimiento almacenado

    // console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Consulta Exitosa",
        status: 200,
        data: result.recordsets[0],
      });
    } else {
      return res.status(404).json({
        message: "No se obtuvo algo al vias reclamos",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar obtener las via reclamo",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

// Para Registrar Reclamo
export const crearReclamo = async (req, res) => {
  let pool;
  try {
    // Obtener los parámetros del cuerpo de la solicitud
    const {
      accion,
      idReclamo,
      fecReclamo,
      viaReclamo,
      escliente,
      DNI_reclamo,
      nombreReferencial,
      estadoReclamo,
      canal,
      motivo,
      usuario,
      DNI_deudor,
      fecSuceso,
      observacion,
    } = req.body;

    // Validar que todos los parámetros requeridos estén presentes
    if (!accion) {
      return res.status(400).json({
        message: "Faltan parámetros requeridos en la solicitud",
      });
    }

    // Obtener la conexión al pool
    pool = await getConnection();

    // Ejecutar el procedimiento almacenado
    const result = await pool
      .request()
      .input("accion", accion)
      .input("idReclamo", idReclamo)
      .input("fecReclamo", fecReclamo)
      .input("viaReclamo", viaReclamo)
      .input("escliente", escliente)
      .input("DNI_reclamo", DNI_reclamo)
      .input("nombreReferencial", nombreReferencial)
      .input("estadoReclamo", estadoReclamo)
      .input("canal", canal)
      .input("motivo", motivo)
      .input("usuario", usuario)
      .input("DNI_deudor", DNI_deudor)
      .input("fecSuceso", fecSuceso)
      .input("observacion", observacion)
      .execute("app.usp_crud_Reclamo"); // Cambia este nombre al de tu procedimiento almacenado

    // Respuesta exitosa
    return res.status(200).json({
      message: "Reclamo registrado exitosamente",
      status: 200,
      data: result.recordset, // Si el procedimiento devuelve un resultado
    });
  } catch (error) {
    console.error(
      "Error en la ejecución del procedimiento almacenado:",
      error.message
    );
    return res.status(500).json({
      message: "Error al intentar registrar el reclamo",
      error: error.message,
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
//Para Actualizar Reclamo

//Para Eliminar Reclamo
export const eliminarReclamo = async (req, res) => {
  let pool;
  try {
    // Obtener el parámetro del cuerpo de la solicitud
    const {
      accion,
      idReclamo,
      fecReclamo,
      viaReclamo,
      escliente,
      DNI_reclamo,
      nombreReferencial,
      estadoReclamo,
      canal,
      motivo,
      usuario,
      DNI_deudor,
      fecSuceso,
      observacion,
    } = req.body;
    // Validar que se haya proporcionado el `idReclamo`
    if (!idReclamo) {
      return res.status(400).json({
        message: "El campo 'idReclamo' es requerido",
      });
    }

    // Obtener la conexión al pool
    pool = await getConnection();

    // Ejecutar el procedimiento almacenado para eliminar el reclamo
    const result = await pool
      .request()
      .input("accion", accion)
      .input("idReclamo", idReclamo)
      .input("fecReclamo", fecReclamo)
      .input("viaReclamo", viaReclamo)
      .input("escliente", escliente)
      .input("DNI_reclamo", DNI_reclamo)
      .input("nombreReferencial", nombreReferencial)
      .input("estadoReclamo", estadoReclamo)
      .input("canal", canal)
      .input("motivo", motivo)
      .input("usuario", usuario)
      .input("DNI_deudor", DNI_deudor)
      .input("fecSuceso", fecSuceso)
      .input("observacion", observacion)
      .execute("app.usp_crud_Reclamo"); // Cambia este nombre al de tu procedimiento almacenado

    // Verificar si se afectó alguna fila (es decir, si se eliminó un reclamo)
    if (result.rowsAffected[0] > 0) {
      return res.status(200).json({
        message: "Reclamo eliminado exitosamente",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se encontró un reclamo con el ID proporcionado",
      });
    }
  } catch (error) {
    console.error(
      "Error en la ejecución del procedimiento almacenado:",
      error.message
    );
    return res.status(500).json({
      message: "Error al intentar eliminar el reclamo",
      error: error.message,
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

// Validar Documento
export const validarDocumento = async (req, res) => {
  let pool;
  try {
    const { documento } = req.body;
    pool = await getConnection();
    const result = await pool
      .request()
      .input("documento", documento)
      .execute("app.usp_validarDocumento"); // Llamada segura al procedimiento almacenado

    const data = result.recordset[0];
    console.log(data);
    if (result.rowsAffected.length > 0 && result.rowsAffected[0] > 0) {
      return res.status(200).json({
        message: "Consulta Exitosa , se obtuvo informacion",
        status: 200,
        data: data,
      });
    } else if (result.rowsAffected[0] === 0) {
      return res.status(200).json({
        message: "No se obtuvieron datos para esta persona",
        status: 200,
        data: {
          idPersona: null,
          documento: null,
          alias: null,
          nomCompleto: null,
        },
      });
    } else {
      return res.status(204).json({
        message: "No se obtuvo algo al buscar con este documento",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar validar documento",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
