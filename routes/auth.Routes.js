import express from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import User from "../models/User.js";
import UserSchema from '../schemas/UserShema.js';
import { authenticateJWT } from "../middleware/jwtMiddleware.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password, first_name, last_name } = req.body;

  
  try {
    UserSchema.parse(req.body);
  } catch (error) {
    res.status(401).json({ message: "credenciales invalidas como tu"})
  }
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "El usuario ya está registrado." });
    }

    const newUser = await User.create({
      username,
      email,
      password,
      first_name,
      last_name,
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor." });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Credenciales inválidas' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ userId: user.user_id, email: user.email }, '12345', { expiresIn: '1h' });

    // Configurar la cookie
    res.cookie("token", token, { httpOnly: true });

    // Enviar la respuesta JSON con el token y otros datos
    res.json({  message: "Login exitoso", userId: user.user_id, username: user.username });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

router.get('/logout',authenticateJWT, (req, res) => {
  try {
    // Limpiar la cookie del token
    res.clearCookie('token');

    // Opcional: También puedes limpiar cualquier información de sesión adicional que manejes en tu aplicación
    req.session.destroy();

    res.json({ message: 'Logout exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

export default router;
