const db = require('../config/database');

class UsuarioModel {

    static async crearUsuario(nombre, email, password) {
        try {
            const basedatos = await db();
            await basedatos.request()
                .input('nombre', nombre)
                .input('email', email)
                .input('password', password)
                .query(`
                    INSERT INTO USUARIOS (nombre, email, contrasena)
                    VALUES (@nombre, @email, @password)
                `);
        } catch (error) {
            console.error('Error en UsuarioModel.crearUsuario:', error);
            throw error;
        }
    }

    static async buscarPorEmail(email) {
        try {
            const basedatos = await db();
            const resultado = await basedatos.request()
                .input('email', email)
                .query(`
                    SELECT 
                        id_usuario AS Id, 
                        nombre AS Nombre, 
                        email AS Email, 
                        contrasena AS Password
                    FROM USUARIOS
                    WHERE email = @email
                `);
            return resultado.recordset[0] || null;
        } catch (error) {
            console.error('Error en UsuarioModel.buscarPorEmail:', error);
            throw error;
        }
    }
}

module.exports = UsuarioModel;
