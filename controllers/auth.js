const { request, response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");
const logger = require("../helpers/winston");
const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  // Verificar si el email existe
  try {
    const user = await User.findOne({ email });
    if (!user) {
      logger.error("Error al verificar si el email existe");
      return res.status(400).json({ msg: "User not registered" });
    }
    
    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      logger.error("Error al validar la contraseña");
      return res.status(400).json({
        msg: "Password incorrect",
      });
    }

    // Generar el JWT
    const token = await generateJWT(user.id);

    res.json({ user, token });
  } catch (error) {
    logger.error(error.toString());
    res.status(500).json({ msg: "Hable con el administrador" });
  }
};

module.exports = { login };
