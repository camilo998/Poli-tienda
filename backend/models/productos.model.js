const db = require('../config/database');

class ProductoModel {

    static async obtenerProductos() {
        try {
            const basedatos = await db();
            const resultado = await basedatos.request().query(`
                SELECT
                    p.id_producto AS Id,
                    p.nombre_producto AS Nombre,
                    p.descripcion AS Descripcion,
                    p.precio AS Precio,
                    p.stock AS Stock,
                    p.imagen_url AS ImagenUrl,
                    p.id_categoria AS CategoriaId,
                    c.nombre_categoria AS Categoria,
                    p.tipo_mascota_destino AS TipoMascota
                FROM PRODUCTOS_ACCESORIOS p
                LEFT JOIN CATEGORIAS c ON p.id_categoria = c.id_categoria
            `);
            return resultado.recordset;
        } catch (error) {
            console.error('Error en ProductoModel.obtenerProductos:', error);
            throw error;
        }
    }
}

module.exports = ProductoModel;
   
