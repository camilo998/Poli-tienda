const db = require('../config/database');

class ContactoModel {
    static async crearContacto(nombre, email, mensaje) {
        try {
            const basedatos = await db();
            const resultado = await basedatos.request()
                .input('nombre', nombre)
                .input('email', email)
                .input('mensaje', mensaje)
                .query(`
                    INSERT INTO CONTACTOS (nombre, email, mensaje)
                    VALUES (@nombre, @email, @mensaje);
                    SELECT SCOPE_IDENTITY() AS Id;
                `);
            return resultado.recordset[0];
        } catch (error) {
            console.error('Error en ContactoModel.crearContacto:', error);
            throw error;
        }
    }

    static async obtenerContactos() {
        try {
            const basedatos = await db();
            const resultado = await basedatos.request().query(`
                SELECT id_contacto AS Id, nombre AS Nombre, email AS Email, mensaje AS Mensaje, fecha AS Fecha
                FROM CONTACTOS
                ORDER BY fecha DESC
            `);
            return resultado.recordset;
        } catch (error) {
            console.error('Error en ContactoModel.obtenerContactos:', error);
            throw error;
        }
    }
}

module.exports = ContactoModel;
