const sqlserver = require('mssql');

// Conexión a SQL Server usando autenticación de SQL Server.
// Cambia el server a tu instancia activa, por ejemplo 'localhost\\DAVID' o 'localhost\\SQLEXPRESS'.
const config = {
    server: process.env.DB_SERVER || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 1433,
    user: process.env.DB_USER || 'qwerty1',
    password: process.env.DB_PASSWORD || '1234q',
    database: process.env.DB_NAME || 'tienda_gato',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

const conexion = async () => {
    try {
        const pool = await sqlserver.connect(config);
        console.log('✓ Conectado a la base de datos SQL Server');
        return pool;
    } catch (error) {
        console.error('✗ Error al conectar a la base de datos:', error.message);
        throw error;
    }
};

module.exports = conexion;

