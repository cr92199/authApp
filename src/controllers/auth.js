import { response, request } from "express";
import Usuario from "../models/usuario.js";
import bcrypt from "bcryptjs";
import { generarJWT } from "../helpers/jwt.js";

// TODO : CREAR USUARIO
export const crearusuario = async (req = request, res = response) => {
  console.log(req.body);
  const { email, name, password } = req.body;

  try {
    //console.log(email, password, name);
    const usuario = await Usuario.findOne({ email: email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "el usuario ya existe",
      });
    }

    // crear usuario con el modelo
    const dbusuario = new Usuario(req.body);

    //encriptar password
    const salt = bcrypt.genSaltSync();
    dbusuario.password = bcrypt.hashSync(password, salt);

    //generar JWT
    const token = await generarJWT(dbusuario.id, name);

    //crear usuario
    dbusuario.save();

    //generar respuesta
    return res.status(200).json({
      ok: true,
      uid: dbusuario.id,
      name: name,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      ok: false,
      msg: "Error en el servidor",
    });
  }
};

// TODO: LOGEAR USUARIO
export const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    //verificar si el email existe
    const dbUser = await Usuario.findOne({ email });

    if (!dbUser) {
      return res.status(400).json({
        ok: false,
        msg: "credenciales noo son validas",
      });
    }

    //la contraseña hace match

    const validPasword = bcrypt.compareSync(password, dbUser.password);

    if (!validPasword) {
      return res.status(400).json({
        ok: false,
        msg: "password no valido",
      });
    }

    //respuesta

    const token = await generarJWT(dbUser._id, dbUser.name);

    return res.json({
      ok: true,
      uid: dbUser._id,
      name: dbUser.name,
      email: dbUser.email,
      token: token,
    });
  } catch (error) {
    //console.log(email, password);
    return res.status(500).send({
      ok: false,
      msg: "error en el servidor",
    });
  }
};

//TODO: reautenticacion token
export const renew = async (req = require, res = response) => {
  const { uid, name } = req;

  const dbuser = await Usuario.findById(uid);
  //console.log(dbuser.email);

  // generar tokend
  const token = await generarJWT(uid, name);

  return res.send({
    ok: true,
    msg: "tokend ",
    name,
    email: dbuser.email,
    uid,
    token: token,
  });
};
