import { response } from "express";
import jwt from "jsonwebtoken";

export const validarJwt = (req, res = response, next) => {
  const token = req.header("x-token");
  //console.log(token);

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "error en el token",
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.uid = uid;
    req.name = name;
  } catch (err) {
    return res.status(401).json({
      ok: false,
      msg: "error en el token",
    });
  }

  next();
};
