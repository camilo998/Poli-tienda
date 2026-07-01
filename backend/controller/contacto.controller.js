const ContactoModel = require('../models/contactos.model');

class ContactoController {
    static async crearContacto(req, res) {
        const { nombre, email, mensaje } = req.body;

        if (!nombre || !email || !mensaje) {
            return res.status(400).json({ error: 'Faltan datos obligatorios' });
        }

        try {
            const nuevoContacto = await ContactoModel.crearContacto(nombre, email, mensaje);
            res.status(201).json({ mensaje: 'Contacto guardado', contactoId: nuevoContacto.Id });
        } catch (error) {
            console.error('Error al guardar contacto:', error);
            res.status(500).json({ error: 'No se pudo guardar el contacto', details: error.message });
        }
    }

    static async obtenerContactos(req, res) {
        try {
            const contactos = await ContactoModel.obtenerContactos();
            res.json({ data: contactos });
        } catch (error) {
            console.error('Error al obtener contactos:', error);
            res.status(500).json({ error: 'No se pudo obtener los contactos', details: error.message });
        }
    }
}

module.exports = ContactoController;
