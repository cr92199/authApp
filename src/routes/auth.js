import { Router } from "express";
import { crearusuario, login, renew } from "../controllers/auth.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJwt } from "../middlewares/validar-jwt.js";

const router = Router();

// crear usuario
router.post(
  "/new",
  [
    check("name", "el nombre es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").isEmail(),
    check("password", "el password es obligatorio").isLength({ min: 6 }),
    validarCampos,
  ],
  crearusuario
);

//login usuario
router.post(
  "/",
  [
    check("email", "el email es obligatorio").isEmail(),
    check("password", "el password es obligatorio").isLength({ min: 6 }),
    validarCampos,
  ],
  login
);

//validar y revalidar token
router.get("/renew", [validarJwt], renew);

export default router;
