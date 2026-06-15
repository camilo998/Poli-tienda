const UsuarioModel = require('../models/usuarios.model');

class UsuariosController {

    static async registrar(req, res) {
        const { nombre, email, password } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({ error: 'Faltan datos obligatorios' });
        }

        try {
            const existente = await UsuarioModel.buscarPorEmail(email);
            if (existente) {
                return res.status(400).json({ error: 'Este email ya esta registrado' });
            }

            await UsuarioModel.crearUsuario(nombre, email, password);
            res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).json({ error: 'No se pudo registrar el usuario', details: error.message });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
        }

        try {
            const usuario = await UsuarioModel.buscarPorEmail(email);

            if (!usuario || usuario.Password !== password) {
                return res.status(401).json({ error: 'Email o contraseña incorrectos' });
            }

            res.json({
                mensaje: 'Inicio de sesion exitoso',
                usuario: {
                    id: usuario.Id,
                    nombre: usuario.Nombre,
                    email: usuario.Email
                }
            });
        } catch (error) {
            console.error('Error al iniciar sesion:', error);
            res.status(500).json({ error: 'No se pudo iniciar sesion', details: error.message });
        }
    }
}

module.exports = UsuariosController;
