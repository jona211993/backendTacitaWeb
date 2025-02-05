import { getConnection } from "../database/connection.js";
import sql from "mssql";
import dayjs from "dayjs";

// Para las Busquedas en modulo CLiente
export const getClienteByCodigoIDC = async (req, res) => {
  let pool;

  const { documento } = req.params;
  console.log(documento);
  try {
    let sql = `app.usp_consultarDeudorXDocumento '${documento}'`;
    pool = await getConnection();
    const result = await pool.request().query(sql);
    const data = result.recordset;
    console.log(data);
    if (result.recordset && result.recordset.length > 0) {
      return res.status(200).json({
        data,
      });
    } else {
      return res
        .status(404)
        .json({
          message: "No se pudo obtener los datos del cliente por su IDC",
        });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message); // Agrega esta línea para obtener información detallada del error
    return res
      .status(400)
      .json({ message: "Error al querer obtener info del cliente" });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

export const getClienteByTelefono = async (req, res) => {
  let pool;

  const { telefono } = req.params;
  console.log(telefono);
  try {
    let sql = `app.usp_consultarDeudorXTelefono ${telefono}`;
    pool = await getConnection();
    const result = await pool.request().query(sql);
    const data = result.recordset;
    console.log(data);
    if (result.recordset && result.recordset.length > 0) {
      return res.status(200).json({
        data,
      });
    } else {
      return res
        .status(404)
        .json({
          message: "No se pudo obtener los datos del cliente por su telefono",
        });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message); // Agrega esta línea para obtener información detallada del error
    return res
      .status(400)
      .json({
        message: "Error al querer obtener info del cliente por telefono",
      });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

export const getClienteByNombres_Apellidos = async (req, res) => {
  let pool;

  const { nombres, apellidos } = req.query;
  console.log(nombres, apellidos);
  try {
    let sql = `execute app.usp_consultarDeudorXNombreApellido '${nombres}' , '${apellidos}'`;
    pool = await getConnection();
    const result = await pool.request().query(sql);
    const data = result.recordset;
    console.log(data);
    if (result.recordset && result.recordset.length > 0) {
      return res.status(200).json({
        data,
      });
    } else {
      return res
        .status(404)
        .json({
          message:
            "No se pudo obtener los datos del cliente por su nombreApellido",
        });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message); // Agrega esta línea para obtener información detallada del error
    return res
      .status(400)
      .json({
        message: "Error al querer obtener info del cliente por nombreApellido",
      });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

// ======  VER MENSAJE ======
export const getMensaje = async (req, res) => {
  let pool;
  const { idDeudor, idEntidad } = req.body;

  try {
    let sql = `execute app.usp_verMensaje ${idDeudor} , ${idEntidad}`;
    pool = await getConnection();
    const result = await pool.request().query(sql);
    const data = result.recordset;
    console.log("se obtuvo: ", result);
    if (result.recordset && result.recordset.length > 0) {
      return res.status(200).json({
        data,
      });
    } else {
      return res
        .status(404)
        .json({ message: "No se pudo obtener la informacion del mensaje" });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message); // Agrega esta línea para obtener información detallada del error
    return res
      .status(400)
      .json({ message: "Error al querer obtener info del mensaje" });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

// Para Obtener el detalle del Cliente
//1.Obteniendo Datos del -tiular Por idDeudor:
export const getDatosTitularPorIDdeudor = async (req, res) => {
  let pool;

  const { idDeudor } = req.params;
  console.log(idDeudor);
  try {
    let sql = `app.usp_consultarDireccionXDocumento ${idDeudor}`;
    pool = await getConnection();
    const result = await pool.request().query(sql);
    const data = result.recordset;
    console.log(data);
    if (result.recordset && result.recordset.length > 0) {
      return res.status(200).json({
        data,
      });
    } else {
      return res
        .status(404)
        .json({
          message: "No se pudo obtener los datos del cliente por su ID Deudor",
        });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message); // Agrega esta línea para obtener información detallada del error
    return res
      .status(400)
      .json({ message: "Error al querer obtener info del cliente" });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
//2.Obteniendo Datos de Productos Por idDeudor y por IDENtidad:
export const getDatosProductosPorIDdeudorAndEntidad = async (req, res) => {
  let pool;
  const { idDeudor, idEntidad } = req.body;
  console.log(idDeudor);
  console.log(idEntidad);
  try {
    let sql = `execute app.usp_consultarDescuentoXDocumento ${idDeudor} , ${idEntidad}`;
    pool = await getConnection();
    const result = await pool.request().query(sql);
    const data = result.recordset;
    console.log(data);
    if (result.recordset && result.recordset.length > 0) {
      return res.status(200).json({
        data,
      });
    } else {
      return res
        .status(404)
        .json({
          message: "No se pudo obtener los datos de los productos del cliente",
        });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message); // Agrega esta línea para obtener información detallada del error
    return res
      .status(400)
      .json({
        message: "Error al querer obtener info de los productos del cliente",
      });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
//3.Obteniendo Datos de Pagos Por idDeudor y por IDENtidad:
export const getPagosPorIDdeudorAndEntidad = async (req, res) => {
  let pool;
  const { idDeudor, idEntidad } = req.body;
  console.log(idDeudor);
  console.log(idEntidad);
  try {
    let sql = `execute app.usp_consultarPagoXDocumento ${idDeudor} , ${idEntidad}`;
    pool = await getConnection();
    const result = await pool.request().query(sql);
    const data = result.recordset;
    console.log(data);
    if (result.recordset && result.recordset.length > 0) {
      return res.status(200).json({
        data,
      });
    } else {
      return res
        .status(404)
        .json({ message: "No se pudo obtener los pagos del cliente" });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message); // Agrega esta línea para obtener información detallada del error
    return res
      .status(400)
      .json({
        message: "Error al querer obtener info de los pagos del cliente",
      });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
//4.Obteniendo Datos de Gestiones Por Documento y Por Cartera:
export const getGestionesPorDocumentoAndCartera = async (req, res) => {
  let pool;
  const { documento, cartera } = req.body;
  console.log(documento);
  console.log(cartera);
  try {
    let sql = `execute app.usp_consultarGestionesHumanas '${documento}' , '${cartera}'`;
    pool = await getConnection();
    const result = await pool.request().query(sql);
    const data = result.recordset;
    console.log(data);
    if (result.recordset && result.recordset.length > 0) {
      return res.status(200).json({
        data,
      });
    } else {
      return res
        .status(404)
        .json({ message: "No se pudo obtener las gestiones del cliente" });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message); // Agrega esta línea para obtener información detallada del error
    return res
      .status(400)
      .json({
        message: "Error al querer obtener info de las gestiones del cliente",
      });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
//5.Obteniendo Datos de Exepciones Por idDeudor y por IDENtidad:
export const getExcepcionesPorIDdeudorAndEntidad = async (req, res) => {
  let pool;
  const { idDeudor, idEntidad } = req.body;
  console.log(idDeudor);
  console.log(idEntidad);
  try {
    let sql = `execute app.usp_consultarExcepcion ${idDeudor} , ${idEntidad}`;
    pool = await getConnection();
    const result = await pool.request().query(sql);
    const data = result.recordset;
    console.log(data);
    if (result.recordset && result.recordset.length > 0) {
      return res.status(200).json({
        data,
      });
    } else {
      return res
        .status(404)
        .json({ message: "No se pudo obtener las Excepciones del cliente" });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message); // Agrega esta línea para obtener información detallada del error
    return res
      .status(400)
      .json({
        message: "Error al querer obtener info de las Excepciones del cliente",
      });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

//Para INSERTAR GESTION
// OBTENIENDO nivel3 y nivel4 :
export const getListaNivel3 = async (req, res) => {
  let pool;
  const { nivel2 } = req.body;
  console.log(nivel2);

  try {
    let sql = `execute app.usp_listaNvl3 ${nivel2}`;
    pool = await getConnection();
    const result = await pool.request().query(sql);
    const data = result.recordset;
    console.log(data);
    if (result.recordset && result.recordset.length > 0) {
      return res.status(200).json({
        data,
      });
    } else {
      return res
        .status(404)
        .json({ message: "No se pudo obtener la lista del nivel3" });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message); // Agrega esta línea para obtener información detallada del error
    return res
      .status(400)
      .json({ message: "Error al querer obtener info de la lista del nivel3" });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
export const getListaNivel4 = async (req, res) => {
  let pool;
  const { nivel3 } = req.body;
  console.log(nivel3);

  try {
    let sql = `execute app.usp_listaNvl4 '${nivel3}'`;
    pool = await getConnection();
    const result = await pool.request().query(sql);
    const data = result.recordset;
    console.log("n4 ....", data);
    if (result.recordset && result.recordset.length > 0) {
      return res.status(200).json({
        data,
      });
    } else {
      return res
        .status(404)
        .json({ message: "No se pudo obtener la lista del nivel4" });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message); // Agrega esta línea para obtener información detallada del error
    return res
      .status(400)
      .json({ message: "Error al querer obtener info de la lista del nivel4" });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

// ======  INSERTANDO GESTIONES ======
// Controlador para insertar una nueva gestión PDP
export const insertarGestionPDP = async (req, res) => {
  try {
    // Desestructuramos los parámetros enviados desde el frontend
    const {
      idDeudor = null,
      idGestor,
      documento,
      cartera,
      gestor,
      numero,
      nvl2,
      fec_compromiso,
      cuotas,
      hora_inicio,
      hora_fin,
      monto_mes,
      monto_total,
      observacion,
      tipo_llamada,
      tipo_inbound,
      nvl1,
      idRelacionDeudor,
      fec_adelanto,
      mto_adelanto,
    } = req.body;

    // Conexión a la base de datos
    const pool = await getConnection();

    console.log("observacion", observacion);
    // Ejecutamos el procedimiento almacenado con los parámetros correspondientes
    const result = await pool
      .request()
      .input("idDeudor", sql.Int, idDeudor)
      .input("idGestor", sql.Int, idGestor)
      .input("documento", sql.VarChar(20), documento)
      .input("cartera", sql.VarChar(20), cartera)
      .input("gestor", sql.VarChar(50), gestor)
      .input("numero", sql.VarChar(15), numero)
      .input("nvl2", sql.VarChar(10), nvl2)
      .input("fec_compromiso", sql.Date, fec_compromiso)
      .input("cuotas", sql.Int, cuotas)
      .input("hora_inicio", sql.VarChar, hora_inicio)
      .input("hora_fin", sql.VarChar, hora_fin)
      .input("monto_mes", sql.Decimal(18, 6), monto_mes)
      .input("monto_total", sql.Decimal(18, 6), monto_total)
      .input("observacion", sql.VarChar(2000), observacion)
      .input("tipo_llamada", sql.VarChar(1), tipo_llamada)
      .input("tipo_inbound", sql.VarChar(20), tipo_inbound)
      .input("nvl1", sql.VarChar(20), nvl1)
      .input("idRelacionDeudor", sql.Int, idRelacionDeudor)
      .input("fec_adelanto", sql.Date, fec_adelanto)
      .input("mto_adelanto", sql.Decimal(18, 6), mto_adelanto)
      .execute("app.usp_insertarGestionPDP");

    // Enviamos la respuesta de éxito
    res.status(200).json({
      message: "Gestión PDP insertada exitosamente",
      data: result.recordset,
    });
  } catch (error) {
    console.error("Error al insertar la gestión PDP:", error);
    res.status(500).json({ message: "Error al insertar la gestión PDP" });
  }
};
// Controlador para insertar una nueva gestión NO PDP
export const insertarGestionNoSonPDP = async (req, res) => {
  try {
    // Desestructuramos los parámetros enviados desde el frontend
    const {
      idDeudor = null,
      idGestor,
      documento,
      cartera,
      gestor,
      numero,
      nvl2,
      fec_compromiso,
      cuotas,
      hora_inicio,
      hora_fin,
      monto_mes,
      monto_total,
      observacion,
      tipo_llamada,
      tipo_inbound,
      nvl1,
      idRelacionDeudor,
      fec_adelanto,
      mto_adelanto,
    } = req.body;

    // Conexión a la base de datos
    const pool = await getConnection();

    console.log(
      "yo recibo del front esto : ",
      fec_adelanto,
      "-- monto adel---",
      mto_adelanto
    );
    // Ejecutamos el procedimiento almacenado con los parámetros correspondientes
    const result = await pool
      .request()
      .input("idDeudor", sql.Int, idDeudor)
      .input("idGestor", sql.Int, idGestor)
      .input("documento", sql.VarChar(20), documento)
      .input("cartera", sql.VarChar(20), cartera)
      .input("gestor", sql.VarChar(50), gestor)
      .input("numero", sql.VarChar(15), numero)
      .input("nvl2", sql.VarChar(10), nvl2)
      .input("fec_compromiso", sql.Date, fec_compromiso)
      .input("cuotas", sql.Int, cuotas)
      .input("hora_inicio", sql.VarChar, hora_inicio)
      .input("hora_fin", sql.VarChar, hora_fin)
      .input("monto_mes", sql.Decimal(18, 6), monto_mes)
      .input("monto_total", sql.Decimal(18, 6), monto_total)
      .input("observacion", sql.VarChar(1000), observacion)
      .input("tipo_llamada", sql.VarChar(1), tipo_llamada)
      .input("tipo_inbound", sql.VarChar(20), tipo_inbound)
      .input("nvl1", sql.VarChar(20), nvl1)
      .input("idRelacionDeudor", sql.Int, idRelacionDeudor)
      .input("fec_adelanto", sql.Date, fec_adelanto)
      .input("mto_adelanto", sql.Decimal(18, 6), mto_adelanto)
      .execute("app.usp_insertarGestionNoPDP");

    // Enviamos la respuesta de éxito
    res.status(200).json({
      message: "Gestión PDP insertada exitosamente",
      data: result.recordset,
    });
  } catch (error) {
    console.error("Error al insertar la gestión PDP:", error);
    res.status(500).json({ message: "Error al insertar la gestión PDP" });
  }
};

// ======  DETALLE CUENTAS ======
export const getDetallesCuentas = async (req, res) => {
  let pool;
  const { documento, cartera } = req.body;
  console.log(documento, cartera);

  try {
    let sql = `execute app.usp_DetalleCuenta '${documento}' , '${cartera}'`;
    pool = await getConnection();
    const result = await pool.request().query(sql);
    const data = result.recordset;
    console.log(data);
    if (result.recordset && result.recordset.length > 0) {
      return res.status(200).json({
        data,
      });
    } else {
      return res
        .status(404)
        .json({ message: "No se pudo obtener las cuentas con sus detalles" });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message); // Agrega esta línea para obtener información detallada del error
    return res
      .status(400)
      .json({
        message: "Error al querer obtener info de los detalle de cuentas",
      });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

// ======  INSERTATR MENSAJE ======
// Es mas un update que otra cosa
export const insertarMensaje = async (req, res) => {
  let pool;
  const { id_deudor, id_entidad, alerta, descripcion, gestor } = req.body;
  console.log(
    "recibiendo: ",
    id_deudor,
    id_entidad,
    alerta,
    descripcion,
    gestor
  );

  try {
    let sql = `execute app.usp_insertarMensaje ${id_deudor} , ${id_entidad}, '${alerta}' , '${descripcion}', '${gestor}'`;
    pool = await getConnection();
    const result = await pool.request().query(sql);
    const data = result;
    console.log("resultado: ", result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        data,
      });
    } else {
      return res
        .status(404)
        .json({ message: "No se pudo insertar el mensaje" });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message); // Agrega esta línea para obtener información detallada del error
    return res
      .status(400)
      .json({ message: "Error al querer insertar un mensaje" });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

// ======  SOLICITAR EXCEPCION ======
export const registrarExepcion = async (req, res) => {
  let pool;
  const {
    idDeudor,
    idEntidadBancaria,
    idgestor,
    fecha_pago,
    monto_pago,
    cuota,
    observacion,
    gestor,
  } = req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidadBancaria,
    idgestor,
    fecha_pago,
    monto_pago,
    cuota,
    observacion,
    gestor
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidadBancaria", idEntidadBancaria)
      .input("idgestor", idgestor)
      .input("fecha_pago", fecha_pago) // Asume que `fecha_pago` está en el formato correcto
      .input("monto_pago", monto_pago)
      .input("cuota", cuota)
      .input("observacion", observacion)
      .input("gestor", gestor)
      .execute("app.usp_insertarExcepcion"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Solicitud de excepción registrada correctamente",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar la solicitud de excepción",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar una solicitud de excepción",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

// ======  SOLICITAR DOCUMENTO ======
// ======  CARTA DE NO ADEUDO ======
// Para el Validar Carta
export const getValidarCartaNA = async (req, res) => {
  let pool;
  const { idDeudor, idEntidad } = req.body;
  console.log(idDeudor, idEntidad);

  try {
    const sql = `execute app.usp_validacionCarta ${idDeudor}, ${idEntidad}`;
    pool = await getConnection();
    const result = await pool.request().query(sql);
    const data = result.recordset;

    if (data && data.length > 0) {
      // Si hay resultados, los devolvemos
      return res.status(200).json({ data });
    } else {
      // Si no hay resultados, devolvemos un objeto con campos `null`
      return res.status(200).json({
        data: [
          {
            MONTO_PAGADO: null,
            MIN1: null,
            MONTO_EXCEPCION: null,
            COD_MES: null,
            // Agrega aquí todos los campos esperados con valor `null`
          },
        ],
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res
      .status(400)
      .json({ message: "Error al querer obtener la info del validar carta" });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
// ======  1.  CARTA DE NO ADEUDO DE TIPO CORREO ======
export const registrarCDNATipoCorreo = async (req, res) => {
  let pool;
  const { idDeudor, idEntidad, idGestor, texto, descripcion, gestor } =
    req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    descripcion,
    gestor
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("texto", texto)
      .input("descripcion", descripcion)
      .input("gestor", gestor)
      .input("numope", "")
      .execute("app.usp_registrarCartaNoDeudoXCorreo"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de CDNA por tpo correo exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar la CDNA",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar una CDNA por tipo correo",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

// ======  2.  CARTA DE NO ADEUDO DE TIPO WSP ======
export const registrarCDNATipoWsp = async (req, res) => {
  let pool;
  const { idDeudor, idEntidad, idGestor, texto, descripcion, gestor } =
    req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    descripcion,
    gestor
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("texto", texto)
      .input("descripcion", descripcion)
      .input("gestor", gestor)
      .input("numope", "")
      .execute("app.usp_registrarCartaNoDeudoXTelefono"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de CDNA por tpo WSP exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar la CDNA",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar una CDNA por tipo WSP",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

// ======  3.  CARTA DE NO ADEUDO DE TIPO WSP ======
export const registrarCDNATipoOficina = async (req, res) => {
  let pool;
  const { idDeudor, idEntidad, idGestor, texto, descripcion, gestor } =
    req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    descripcion,
    gestor
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("descripcion", descripcion)
      .input("gestor", gestor)
      .input("numope", "")
      .execute("app.usp_registrarCartaNoDeudoXPresencial"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de CDNA por tipo oficina exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar la CDNA",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar una CDNA por tipo Oficina",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

// ======  4.  CARTA DE NO ADEUDO DE TIPO COURRIER ======
export const registrarCDNATipoCourier = async (req, res) => {
  let pool;
  const {
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    descripcion,
    gestor,
    distrito,
    provincia,
    departamento,
  } = req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    descripcion,
    gestor,
    distrito,
    provincia,
    departamento
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("texto", texto)
      .input("descripcion", descripcion)
      .input("gestor", gestor)
      .input("distrito", distrito)
      .input("provincia", provincia)
      .input("departamento", departamento)
      .input("numope", "")
      .execute("app.usp_registrarCartaNoDeudoXCourier"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de notificacion por tpo Courier exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar la CDNA",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar una CDNA por tipo Courier",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

// ===== Validacion 2da CDNA
export const getValidarSegundaCDNA = async (req, res) => {
  let pool;
  const { idDeudor, idEntidad } = req.body;
  console.log(idDeudor, idEntidad);

  try {
    const sql = `execute app.usp_validar2daCDNA ${idDeudor}, ${idEntidad}`;
    pool = await getConnection();
    const result = await pool.request().query(sql);
    const data = result.recordset;
    console.log(result);
    if (data && data.length > 0) {
      // Si hay resultados, los devolvemos
      return res.status(200).json({ data, status: 200 });
    } else {
      return res
        .status(404)
        .json({ status: 404, message: "No se obtuvieron respuestas" });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res
      .status(400)
      .json({ message: "Error al querer obtener la info del validar carta" });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

// ======  CARTA DE NOTIFICACION ======
// Para el NUM SOLICITUDES TOTALES
export const getNumSolicitudesTotales = async (req, res) => {
  let pool;
  const { idDeudor, idEntidad, tipo } = req.body;
  console.log(idDeudor, idEntidad, tipo);

  try {
    let sql = `execute app.usp_contarDocumento ${idDeudor} , ${idEntidad} , '${tipo}'`;
    pool = await getConnection();
    const result = await pool.request().query(sql);
    const data = result.recordset;
    console.log(data);
    if (result.recordset && result.recordset.length > 0) {
      return res.status(200).json({
        data,
      });
    } else {
      return res
        .status(404)
        .json({ message: "No se pudo obtener el num de solicitudes totales" });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message); // Agrega esta línea para obtener información detallada del error
    return res
      .status(400)
      .json({
        message: "Error al querer obtener el num de solicitudes totales",
      });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
// Para consultarDireccionCarta
export const getDireccionCarta = async (req, res) => {
  let pool;
  const { idDeudor, idEntidad } = req.body;
  console.log(idDeudor, idEntidad);

  try {
    let sql = `execute app.usp_consultarDireccionCarta ${idDeudor} , ${idEntidad}`;
    pool = await getConnection();
    const result = await pool.request().query(sql);
    const data = result.recordset;
    console.log(data);
    if (result.recordset && result.recordset.length > 0) {
      return res.status(200).json({
        data,
      });
    } else {
      return res
        .status(404)
        .json({ message: "No se pudo obtener la direccion para carta" });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message); // Agrega esta línea para obtener información detallada del error
    return res
      .status(400)
      .json({ message: "Error al querer obtener la direccion para carta" });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
// ======  1.  CARTA DE NOTIFICACION DE TIPO CORREO ======
export const registrarCartaNotificacionTipoCorreo = async (req, res) => {
  let pool;
  const { idDeudor, idEntidad, idGestor, texto, observacion, gestor } =
    req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("texto", texto)
      .input("observacion", observacion)
      .input("gestor", gestor)
      .execute("app.usp_registrarNotificacionXCorreo"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de notificacion por tpo correo exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar la notificacion",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar una notificacion por tipo correo",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
// ======  2.  CARTA DE NOTIFICACION DE TIPO WSP ======
export const registrarCartaNotificacionTipoWsp = async (req, res) => {
  let pool;
  const { idDeudor, idEntidad, idGestor, texto, observacion, gestor } =
    req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("texto", texto)
      .input("observacion", observacion)
      .input("gestor", gestor)
      .execute("app.usp_registrarNotificacionXTelefono"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de notificacion por tpo wsp exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar la notificacion",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar una notificacion por tipo wsp",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

// ======  3.  CARTA DE NOTIFICACION DE TIPO OFICINA ======
export const registrarCartaNotificacionTipoOficina = async (req, res) => {
  let pool;
  const { idDeudor, idEntidad, idGestor, descripcion, gestor } = req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    descripcion,
    gestor
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("descripcion", descripcion)
      .input("gestor", gestor)
      .execute("app.usp_registrarNotificacionXPresencial"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de notificacion por tpo oficina exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar la notificacion",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar una notificacion por tipo oficina",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

// ======  4.  CARTA DE NOTIFICACION DE TIPO COURIER ======
export const registrarCartaNotificacionTipoCourier = async (req, res) => {
  let pool;
  const {
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    distrito,
    provincia,
    departamento,
  } = req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    distrito,
    provincia,
    departamento
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("texto", texto)
      .input("observacion", observacion)
      .input("gestor", gestor)
      .input("distrito", distrito)
      .input("provincia", provincia)
      .input("departamento", departamento)
      .execute("app.usp_registrarNotificacionXCourier"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de notificacion por tpo Courier exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar la notificacion",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar una notificacion por tipo Courier",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

// ======  COMPROMISO DE PAGO ======
// Boton de validar
export const getDatosValidacion = async (req, res) => {
  let pool;
  const { idDeudor, idEntidad } = req.body;
  console.log(idDeudor, idEntidad);

  try {
    let sql = `execute app.usp_validacionCarta2 ${idDeudor} , ${idEntidad} `;
    pool = await getConnection();
    const result = await pool.request().query(sql);
    const data = result.recordset;
    console.log(data);
    if (result.recordset && result.recordset.length > 0) {
      return res.status(200).json({
        data,
      });
    } else {
      return res
        .status(404)
        .json({
          message: "No se pudo obtener los datos para hacer la validacion",
        });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message); // Agrega esta línea para obtener información detallada del error
    return res
      .status(400)
      .json({ message: "Error al querer obtener datos de validacion" });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
// ======  1.  COMPROMISO DE TIPO CORREO ======
export const registrarCompromisoTipoCorreo = async (req, res) => {
  let pool;
  const {
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    fecCompromiso,
    monto,
  } = req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    fecCompromiso,
    monto
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("texto", texto)
      .input("observacion", observacion)
      .input("gestor", gestor)
      .input("fecCompromiso", fecCompromiso)
      .input("monto", monto)
      .execute("app.usp_registrarCompromisoXCorreo"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de compromiso por tpo correo exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar el compromiso de pago",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message:
        "Error al intentar insertar un comnpromiso de pago por tipo correo",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
// ======  2.  COMPROMISO DE DE TIPO WSP ======
export const registrarCompromisoTipoWsp = async (req, res) => {
  let pool;
  const {
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    fecCompromiso,
    monto,
  } = req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    fecCompromiso,
    monto
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("texto", texto)
      .input("observacion", observacion)
      .input("gestor", gestor)
      .input("fecCompromiso", fecCompromiso)
      .input("monto", monto)
      .execute("app.usp_registrarCompromisoXTelefono"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de compromiso por tpo wsp exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar el compromiso por wsp",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar un compromiso por tipo wsp",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
// ======  3.  COMPROMISO DE TIPO OFICINA ======
export const registrarCompromisoTipoOficina = async (req, res) => {
  let pool;
  const {
    idDeudor,
    idEntidad,
    idGestor,
    descripcion,
    gestor,
    fecCompromiso,
    monto,
  } = req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    descripcion,
    gestor,
    fecCompromiso,
    monto
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("descripcion", descripcion)
      .input("gestor", gestor)
      .input("fecCompromiso", fecCompromiso)
      .input("monto", monto)
      .execute("app.usp_registrarCompromisoXPresencial"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de compromiso por tpo oficina exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar el compromiso por tipo oficina",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar un compromiso por tipo oficina",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
// ======  4.  COMPROMISO DE TIPO COURIER ======
export const registrarCompromisoTipoCourier = async (req, res) => {
  let pool;
  const {
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    distrito,
    provincia,
    departamento,
    fecCompromiso,
    monto,
  } = req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    distrito,
    provincia,
    departamento,
    fecCompromiso,
    monto
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("texto", texto)
      .input("observacion", observacion)
      .input("gestor", gestor)
      .input("distrito", distrito)
      .input("provincia", provincia)
      .input("departamento", departamento)
      .input("fecCompromiso", fecCompromiso)
      .input("monto", monto)
      .execute("app.usp_registrarCompromisoXCourier"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de compromiso por tpo Courier exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar el compromiso por courier",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar un compromiso por tipo Courier",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

// ======  CRONOGRAMA  DE PAGO ======
// Boton validar
export const getDatosValidacionCronograma = async (req, res) => {
  let pool;
  const { idDeudor, idEntidad, cuota } = req.body;
  console.log(idDeudor, idEntidad, cuota);

  try {
    let sql = `execute app.usp_validacionCarta3 ${idDeudor} , ${idEntidad}, ${cuota} `;
    pool = await getConnection();
    const result = await pool.request().query(sql);
    const data = result.recordset;
    console.log(data);
    if (result.recordset && result.recordset.length > 0) {
      return res.status(200).json({
        data,
      });
    } else {
      return res
        .status(404)
        .json({
          message:
            "No se pudo obtener los datos para hacer la validacion de cronograma",
        });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message); // Agrega esta línea para obtener información detallada del error
    return res
      .status(400)
      .json({
        message: "Error al querer obtener datos de validacion de cronograma",
      });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
// ======  1.  CRONOGRAMA DE TIPO CORREO ======
export const registrarCronogramaTipoCorreo = async (req, res) => {
  let pool;
  const {
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    fecCompromiso,
    monto,
    cuota,
    cuota_diferente,
    monto_inicial,
  } = req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    fecCompromiso,
    monto
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("texto", texto)
      .input("observacion", observacion)
      .input("gestor", gestor)
      .input("fecCompromiso", fecCompromiso)
      .input("monto", monto)
      .input("cuota", cuota)
      .input("cuota_diferente", cuota_diferente)
      .input("monto_inicial", monto_inicial)
      .execute("app.usp_registrarCronogramaXCorreo"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de cronograma por tpo correo exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar el cronograma de pago",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message:
        "Error al intentar insertar un cronograma de pago por tipo correo",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
// ======  2.  CRONOGRAMA DE DE TIPO WSP ======
export const registrarCronogramaTipoWsp = async (req, res) => {
  let pool;
  const {
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    fecCompromiso,
    monto,
    cuota,
    cuota_diferente,
    monto_inicial,
  } = req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    fecCompromiso,
    monto,
    cuota,
    cuota_diferente,
    monto_inicial
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("texto", texto)
      .input("observacion", observacion)
      .input("gestor", gestor)
      .input("fecCompromiso", fecCompromiso)
      .input("monto", monto)
      .input("cuota", cuota)
      .input("cuota_diferente", cuota_diferente)
      .input("monto_inicial", monto_inicial)
      .execute("app.usp_registrarCronogramaXTelefono"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de cronograma por tpo wsp exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar el cronograma por wsp",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar un cronograma por tipo wsp",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
// ======  3.  CRONOGRAMA DE TIPO OFICINA ======
export const registrarCronogramaTipoOficina = async (req, res) => {
  let pool;
  const {
    idDeudor,
    idEntidad,
    idGestor,
    descripcion,
    gestor,
    fecCompromiso,
    monto,
    cuota,
    cuota_diferente,
    monto_inicial,
  } = req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    descripcion,
    gestor,
    fecCompromiso,
    monto,
    cuota,
    cuota_diferente,
    monto_inicial
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("descripcion", descripcion)
      .input("gestor", gestor)
      .input("fecCompromiso", fecCompromiso)
      .input("monto", monto)
      .input("cuota", cuota)
      .input("cuota_diferente", cuota_diferente)
      .input("monto_inicial", monto_inicial)
      .execute("app.usp_registrarCronogramaXPresencial"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de cronograma por tpo oficina exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar el cronograma por tipo oficina",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar un cronograma por tipo oficina",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
// ======  4.  CRONOGRAMA DE TIPO COURIER ======
export const registrarCronogramaTipoCourier = async (req, res) => {
  let pool;
  const {
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    distrito,
    provincia,
    departamento,
    fecCompromiso,
    monto,
    cuota,
    cuota_diferente,
    monto_inicial,
  } = req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    distrito,
    provincia,
    departamento,
    fecCompromiso,
    monto,
    cuota,
    cuota_diferente,
    monto_inicial
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("texto", texto)
      .input("observacion", observacion)
      .input("gestor", gestor)
      .input("distrito", distrito)
      .input("provincia", provincia)
      .input("departamento", departamento)
      .input("fecCompromiso", fecCompromiso)
      .input("monto", monto)
      .input("cuota", cuota)
      .input("cuota_diferente", cuota_diferente)
      .input("monto_inicial", monto_inicial)
      .execute("app.usp_registrarCronogramaXCourier"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de cronograma por tpo Courier exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar el cronograma por courier",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar un cronograma por tipo Courier",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

// ====== ESTADO DE CUENTA  ======
// ======  1. EECC DE TIPO CORREO ======
export const registrarEstadoCuentaTipoCorreo = async (req, res) => {
  let pool;
  const { idDeudor, idEntidad, idGestor, texto, observacion, gestor } =
    req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("texto", texto)
      .input("observacion", observacion)
      .input("gestor", gestor)
      .execute("app.usp_registrarEECCXCorreo"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de EECC por tpo correo exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar el EECC",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar un EECCC por tipo correo",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
// ======  2.  EECC DE DE TIPO WSP ======
export const registrarEstadoCuentaTipoWsp = async (req, res) => {
  let pool;
  const { idDeudor, idEntidad, idGestor, texto, observacion, gestor } =
    req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("texto", texto)
      .input("observacion", observacion)
      .input("gestor", gestor)
      .execute("app.usp_registrarEECCXTelefono"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de EECC por tpo wsp exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar el EECC por wsp",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar un EECC por tipo wsp",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
// ======  3.  EECCDE TIPO OFICINA ======
export const registrarEstadoCuentaTipoOficina = async (req, res) => {
  let pool;
  const { idDeudor, idEntidad, idGestor, descripcion, gestor } = req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    descripcion,
    gestor
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("descripcion", descripcion)
      .input("gestor", gestor)
      .execute("app.usp_registrarEECCXPresencial"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de EECC por tpo oficina exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar el  EECC por tipo oficina",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar un EECC por tipo oficina",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
// ======  4.  EECC DE TIPO COURIER ======
export const registrarEstadoCuentaTipoCourier = async (req, res) => {
  let pool;
  const {
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    distrito,
    provincia,
    departamento,
  } = req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    distrito,
    provincia,
    departamento
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("texto", texto)
      .input("observacion", observacion)
      .input("gestor", gestor)
      .input("distrito", distrito)
      .input("provincia", provincia)
      .input("departamento", departamento)
      .execute("app.usp_registrarEECCXCourier"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de EECC por tpo Courier exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar el EECC por courier",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar un EECC por tipo Courier",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

// ====== CARTA CAMPAÑA ========
// ======  1. DE TIPO CORREO ======
export const registrarCCampanaTipoCorreo = async (req, res) => {
  let pool;
  const {
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    tipificacion,
    monto1,
    monto2,
    monto3,
  } = req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    tipificacion,
    monto1,
    monto2,
    monto3
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("texto", texto)
      .input("observacion", observacion)
      .input("gestor", gestor)
      .input("tipificacion", tipificacion)
      .input("monto1", monto1)
      .input("monto2", monto2)
      .input("monto3", monto3)
      .execute("app.usp_registrarCampañaXCorreo"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de CCampaña por tipo correo exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar la CCampaña",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar la CCampaña por tipo correo",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
// ======  2.  DE DE TIPO WSP ======
export const registrarCCampanaTipoWsp = async (req, res) => {
  let pool;
  const {
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    tipificacion,
    monto1,
    monto2,
    monto3,
  } = req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    tipificacion,
    monto1,
    monto2,
    monto3
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("texto", texto)
      .input("observacion", observacion)
      .input("gestor", gestor)
      .input("tipificacion", tipificacion)
      .input("monto1", monto1)
      .input("monto2", monto2)
      .input("monto3", monto3)
      .execute("app.usp_registrarCampañaXTelefono"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de CCampaña por tpo wsp exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar CCampaña por wsp",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar un CCampaña por tipo wsp",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
// ======  3. DE TIPO OFICINA ======
export const registrarCCampanaTipoOficina = async (req, res) => {
  let pool;
  const {
    idDeudor,
    idEntidad,
    idGestor,
    descripcion,
    gestor,
    tipificacion,
    monto1,
    monto2,
    monto3,
  } = req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    descripcion,
    gestor,
    tipificacion,
    monto1,
    monto2,
    monto3
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("descripcion", descripcion)
      .input("gestor", gestor)
      .input("tipificacion", tipificacion)
      .input("monto1", monto1)
      .input("monto2", monto2)
      .input("monto3", monto3)
      .execute("app.usp_registrarCampañaXPresencial"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro CCampaña por tpo oficina exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar la CCampaña por tipo oficina",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar un CCampaña por tipo oficina",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
// ======  4. DE TIPO COURIER ======
export const registrarCCampanaTipoCourier = async (req, res) => {
  let pool;
  const {
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    distrito,
    provincia,
    departamento,
    tipificacion,
    monto1,
    monto2,
    monto3,
  } = req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    distrito,
    provincia,
    departamento,
    tipificacion,
    monto1,
    monto2,
    monto3
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("texto", texto)
      .input("observacion", observacion)
      .input("gestor", gestor)
      .input("distrito", distrito)
      .input("provincia", provincia)
      .input("departamento", departamento)
      .input("tipificacion", tipificacion)
      .input("monto1", monto1)
      .input("monto2", monto2)
      .input("monto3", monto3)
      .execute("app.usp_registrarCampañaXCourier"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de CCampaña por tipo Courier exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar el CCampaña por courier",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar un CCampaña por tipo Courier",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

// ====== CARTA PLANILLA ========
// Consulta para validacion de carta Planilla usa un procedure con nombreAgresiva es normal
// antes pertencecia a Agresiva la carta Planilla
export const consultaCartaPlanilla = async (req, res) => {
  let pool;
  const { idDeudor, idEntidad } = req.body;
  console.log("recibiendo: ", idDeudor, idEntidad);

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidadBancaria", idEntidad)
      .input("tipo", "PLANILLA")
      .execute("app.usp_consultarCartaAgresiva"); // Llamada segura al procedimiento almacenado

    console.log(result.recordset[0]);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Se obtuvo la validacion correctamente de carta planilla",
        status: 200,
        data: result.recordset,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo validar la carta planilla",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message:
        "Error al intentar intentar obtener info de la validacion carta planilla",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

// ======  1. DE TIPO CORREO ======
export const registrarCPlanillaTipoCorreo = async (req, res) => {
  let pool;
  const { idDeudor, idEntidad, idGestor, texto, observacion, gestor } =
    req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("texto", texto)
      .input("observacion", observacion)
      .input("gestor", gestor)
      .execute("app.usp_registrarCartaPlanillaXCorreo"); // Llamada segura al procedimiento almacenado
    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de CPlanilla por tipo correo exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar la CPlanilla",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar la CPlanilla por tipo correo",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
// ======  2.  DE DE TIPO WSP ======
export const registrarCPlanillaTipoWsp = async (req, res) => {
  let pool;
  const { idDeudor, idEntidad, idGestor, texto, observacion, gestor } =
    req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("texto", texto)
      .input("observacion", observacion)
      .input("gestor", gestor)
      .execute("app.usp_registrarCartaPlanillaXTelefono"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de CPlanilla por tpo wsp exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar CPlanilla por wsp",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar un CPlanilla por tipo wsp",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
// ======  3. DE TIPO OFICINA ======
export const registrarCPlanillaTipoOficina = async (req, res) => {
  let pool;
  const { idDeudor, idEntidad, idGestor, descripcion, gestor } = req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    descripcion,
    gestor
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("descripcion", descripcion)
      .input("gestor", gestor)
      .execute("app.usp_registrarCartaPlanillaXPresencial"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro CPlanilla por tpo oficina exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar la CPlanilla por tipo oficina",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar un CPlanilla por tipo oficina",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
// ======  4. DE TIPO COURIER ======
export const registrarCPlanillaTipoCourier = async (req, res) => {
  let pool;
  const {
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    distrito,
    provincia,
    departamento,
  } = req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    distrito,
    provincia,
    departamento
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("texto", texto)
      .input("observacion", observacion)
      .input("gestor", gestor)
      .input("distrito", distrito)
      .input("provincia", provincia)
      .input("departamento", departamento)
      .execute("app.usp_registrarCartaPlanillaXCourier"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de CPlanilla por tipo Courier exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar el CPlanilla por courier",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar un CPlanilla por tipo Courier",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

// ====== CARTA AGRESIVA ========
// Consulta para validacion de carta Agresiva usa un procedure
export const consultaCartaAgresiva = async (req, res) => {
  let pool;
  const { idDeudor, idEntidadBancaria } = req.body;
  console.log("recibiendo: ", idDeudor, idEntidadBancaria);

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidadBancaria", idEntidadBancaria)
      .input("tipo", "AGRESIVA")
      .execute("app.usp_consultarCartaAgresiva"); // Llamada segura al procedimiento almacenado

    console.log(result.recordset[0]);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Se obtuvo la validacion correctamente de carta agresiva",
        status: 200,
        data: result.recordset,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo validar la carta planilla",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message:
        "Error al intentar intentar obtener info de la validacion carta agresiva",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

// ======  1. DE TIPO CORREO ======
export const registrarCAgresivaTipoCorreo = async (req, res) => {
  let pool;
  const {
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    numCarta,
  } = req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    numCarta
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("texto", texto)
      .input("observacion", observacion)
      .input("gestor", gestor)
      .input("numCarta", numCarta)
      .execute("app.usp_registrarCartaAgresivaXCorreo"); // Llamada segura al procedimiento almacenado
    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de CAgresiva por tipo correo exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar la CAgresiva",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar la CAgresiva por tipo correo",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
// ======  2.  DE DE TIPO WSP ======
export const registrarCAgresivaTipoWsp = async (req, res) => {
  let pool;
  const {
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    numCarta,
  } = req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    numCarta
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("texto", texto)
      .input("observacion", observacion)
      .input("gestor", gestor)
      .input("numCarta", numCarta)
      .execute("app.usp_registrarCartaAgresivaXTelefono"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de CAgresiva por tpo wsp exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar CAgresiva por wsp",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar un CAgresiva por tipo wsp",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
// ======  3. DE TIPO OFICINA ======
export const registrarCAgresivaTipoOficina = async (req, res) => {
  let pool;
  const { idDeudor, idEntidad, idGestor, descripcion, gestor, numCarta } =
    req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    descripcion,
    gestor,
    numCarta
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("descripcion", descripcion)
      .input("gestor", gestor)
      .input("numCarta", numCarta)
      .execute("app.usp_registrarCartaAgresivaXPresencial"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro CAgresivaa por tpo oficina exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar la CAgresiva por tipo oficina",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar un CPlanilla por tipo oficina",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
// ======  4. DE TIPO COURIER ======
export const registrarCAgresivaTipoCourier = async (req, res) => {
  let pool;
  const {
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    distrito,
    provincia,
    departamento,
    numCarta,
  } = req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    texto,
    observacion,
    gestor,
    distrito,
    provincia,
    departamento,
    numCarta
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("texto", texto)
      .input("observacion", observacion)
      .input("gestor", gestor)
      .input("distrito", distrito)
      .input("provincia", provincia)
      .input("departamento", departamento)
      .input("numCarta", numCarta)
      .execute("app.usp_registrarCartaAgresivaXCourier"); // Llamada segura al procedimiento almacenado

    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de CAgresiva por tipo Courier exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar el CAgresiva por courier",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar un CAgresiva por tipo Courier",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

// ====== MODULO AGENDAR ========
export const registrarAgendamiento = async (req, res) => {
  let pool;
  const {
    idDeudor,
    idEntidad,
    idGestor,
    fecAgenda,
    horaAgenda,
    texto,
    gestor,
  } = req.body;
  console.log(
    "recibiendo: ",
    idDeudor,
    idEntidad,
    idGestor,
    fecAgenda,
    horaAgenda,
    texto,
    gestor
  );

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("idDeudor", idDeudor)
      .input("idEntidad", idEntidad)
      .input("idGestor", idGestor)
      .input("fecAgenda", fecAgenda)
      .input("horaAgenda", horaAgenda)
      .input("texto", texto)
      .input("gestor", gestor)
      .execute("app.usp_registrarAgendamiento"); // Llamada segura al procedimiento almacenado
    console.log(result);
    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Registro de Agendamiento exitoso",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo insertar el agendamiento",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar insertar el agendamiento",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

// ============ MODULO MODIFICAR GESTION ================

export const modificarGestion = async (req, res) => {
  let pool;
  const {
    documento,
    cartera,
    asesor,
    fechaLlamada,
    horaLlamada,
    nivel2,
    n_fechaLlamada,
    n_fechaCompromiso,
    n_monto,
    n_nivel1,
    n_nivel2,
    motivo,
    tipLlamada,
    tipInbound,
    usuario
  } = req.body;

  console.log(
    "recibiendo: ",
    documento,
    cartera,
    asesor,
    fechaLlamada,
    horaLlamada,
    nivel2,
    n_fechaLlamada,
    n_fechaCompromiso,
    n_monto,
    n_nivel1,
    n_nivel2,
    motivo,
    tipLlamada,
    tipInbound,
    usuario
  );

   let tipoLlamada
   if(tipLlamada==="OUTBOUND"){
     tipoLlamada="O"
   }else{
    tipoLlamada="I"
   }


   let newNivel1
   if(n_nivel1==="CONTACTO_EFECTIVO"){
     newNivel1="CONTACTO EFECTIVO"
   }else if (n_nivel1==="CONTACTO_NO_EFECTIVO"){
    newNivel1="CONTACTO NO EFECTIVO"
   }
   else{
      newNivel1="NO CONTACTO"
   }



   console.log(
    "enviando 2: ",
    documento,
    cartera,
    asesor,
    fechaLlamada,
    horaLlamada,   
    nivel2,
    n_fechaLlamada,
    n_fechaCompromiso,
    n_monto,
    newNivel1,
    n_nivel2,
    motivo,
    tipoLlamada,
    tipInbound,
    usuario
  );


 console.log("tipo llamada:", tipoLlamada);
 console.log("VA APARA N_NIVEL1 :", newNivel1);
  // console.log("Longitud de documento:", gestionElegida.documento.length);
  // console.log("Longitud de documento:", gestionElegida.documento.length);

  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("documento", documento)
      .input("cartera", cartera)
      .input("asesor", asesor)
      .input("fechaLlamada", fechaLlamada)
      .input("horaLlamada", horaLlamada)
      .input("nivel2", nivel2)
      .input("n_fechaLlamada", n_fechaLlamada)
      .input("n_fechaCompromiso", n_fechaCompromiso)
      .input("n_monto", n_monto)
      .input("n_nivel1", newNivel1)
      .input("n_nivel2", n_nivel2)
      .input("motivo", motivo)
      .input("tipLlamada", tipoLlamada)
      .input("tipInbound", tipInbound)
      .input("usuario", usuario)
      .execute("app.usp_modificarGestion"); // Llamada segura al procedimiento almacenado
    console.log(result);

    if (result.rowsAffected.length > 0) {
      return res.status(200).json({
        message: "Modificacion de gestion exitosa",
        status: 200,
      });
    } else {
      return res.status(404).json({
        message: "No se pudo modificar la gestion",
      });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({
      message: "Error al intentar hacer la modificacion de la gestion",
    });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
