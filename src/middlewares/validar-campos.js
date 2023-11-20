import { response } from "express";
import { validationResult } from "express-validator";

export const validarCampos = (req, res = response, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(404).json({
      ok: false,
      error: error.mapped(),
    });
  }

  next();
};
