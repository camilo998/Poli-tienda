const model = require('../models/productos.model');

class ProductosController {

    static async getProductos(req, res) {
        try {
            const productos = await model.obtenerProductos();
            res.json({ data: productos });
        } catch (error) {
            console.error('Error al obtener productos:', error);
            res.status(500).json({
                error: 'No se pudieron obtener los productos',
                details: error.message
            });
        }
    }
}

module.exports = ProductosController;
