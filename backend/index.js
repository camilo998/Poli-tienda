const express = require('express');
const path = require('path');
const app = express();
const router = require('./router/router');

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use('/api', router);

// Servir archivos estáticos desde la carpeta frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Ruta raíz - servir productos.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/productos.html'));
});

// Ruta de fallback para SPA - debe ir al final
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/productos.html'));
});

app.listen(3000, () => {
    console.log('✓ Servidor corriendo en http://localhost:3000');
});
