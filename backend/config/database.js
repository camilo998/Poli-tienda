const sqlserver = require('mssql');

// Conexión a SQL Server usando autenticación de Windows
const config = {
    server: 'localhost',
    user: 'qwerty',
    password: '1234q',
    database: 'tienda_gato',
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

