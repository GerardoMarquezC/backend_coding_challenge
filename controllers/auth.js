const { request, response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");
const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  // Verificar si el email existe
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not registered" });
    }
    // Si el usuario esta activo
    if (!user.state) {
      return res.status(400).json({ msg: "User not registered" });
    }
    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Password incorrect",
      });
    }

    // Generar el JWT
    const token = await generateJWT(user.id);

    res.json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hable con el administrador" });
  }
};

module.exports = { login };
