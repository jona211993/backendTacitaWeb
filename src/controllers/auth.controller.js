import { getConnection } from "../database/connection.js";
import jwt from "jsonwebtoken";
import config from "../config.js";

export const login = async (req, res) => {
  console.log("Apuntando al backend desde el frontend de login");
  let pool;
  try {
    const { usuario, contrasenia } = req.body;
    console.log("DESDE EL BODY RECIBES:  ", usuario);
    let sql = ` execute app.usp_validarUsuario '${usuario}' , '${contrasenia}'`;
    pool = await getConnection();
    const result = await pool.request().query(sql);

    let usuarioEncontrado = result.recordset[0];
    //console.log(result.recordset[0])

    if (usuarioEncontrado) {
      let user = {
        idMovEmpleado: usuarioEncontrado.idMovEmpleado,
        id_Persona: usuarioEncontrado.id_Persona,
        alias: usuarioEncontrado.ALIAS_ASESOR,
        contrasenia: usuarioEncontrado.contrasena,
        idCargo: usuarioEncontrado.CARGO_APP
      };
      const token = jwt.sign(
        {
          idMovEmpleado: usuarioEncontrado.idMovEmpleado,
          id_Persona: usuarioEncontrado.id_Persona,
          alias: usuarioEncontrado.alias,
          contrasenia: usuarioEncontrado.contrasena,
        },
        config.SECRET,
        {
          expiresIn: 86400,
        }
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None", // Evita el envío de cookies en solicitudes cross-site maliciosas
        maxAge: 24 * 60 * 60 * 1000, // 1 día en milisegundos
      });
      console.log(res.setCookie)
      res.status(200).json({
        message: "Login correcto",
        token,
        user,
      });
    } else {
      return res.status(400).json(["Credenciales incorrectas"]);
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error interno del servidor : " + error.message });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

export const logout = (req, res) => {
  console.log("Eliminando cookie")
  res.clearCookie("token");
  return res.json({ Status: "Success" });
};

export const verificar = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
      return res.status(401).json({ message: "Token no encontrado" });
  }
  jwt.verify(token, config.SECRET, (err, decoded) => {
      if (err) {
          return res.status(403).json({ message: "Token no válido" });
      }
      res.json({ message: 'Acceso concedido'});
  });
};

// Para Mostrar Opciones de Mepleados - STAFF - CALL

export const  mostrarEmpleado= async (req, res) => {
  let pool;
  try {
    const { funcion} = req.body;
    console.log("DESDE EL BODY RECIBES:  ", funcion);
    let sql = ` execute app.usp_mostrarEmpleado  '${funcion}'`;
    pool = await getConnection();
    const result = await pool.request().query(sql);

    let listaUsuariosEncontrados = result.recordset;
    console.log(result.recordset)
    res.status(200).json({
          status: 200,
          message: "Se obtuvieron a los usaurios",
          data: listaUsuariosEncontrados
          
        });

    // if (usuarioEncontrado) {
    //   let user = {
    //     idMovEmpleado: usuarioEncontrado.idMovEmpleado,
    //     id_Persona: usuarioEncontrado.id_Persona,
    //     alias: usuarioEncontrado.ALIAS_ASESOR,
    //     contrasenia: usuarioEncontrado.contrasena,
    //     idCargo: usuarioEncontrado.CARGO_APP
    //   };
    //   const token = jwt.sign(
    //     {
    //       idMovEmpleado: usuarioEncontrado.idMovEmpleado,
    //       id_Persona: usuarioEncontrado.id_Persona,
    //       alias: usuarioEncontrado.alias,
    //       contrasenia: usuarioEncontrado.contrasena,
    //     },
    //     config.SECRET,
    //     {
    //       expiresIn: 86400,
    //     }
    //   );
    //   res.cookie("token", token, {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: "None", // Evita el envío de cookies en solicitudes cross-site maliciosas
    //     maxAge: 24 * 60 * 60 * 1000, // 1 día en milisegundos
    //   });
    //   console.log(res.setCookie)
    //   res.status(200).json({
    //     message: "Login correcto",
    //     token,
    //     user,
    //   });
    // } else {
    //   return res.status(400).json(["Credenciales incorrectas"]);
    // }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error interno del servidor : " + error.message });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};
