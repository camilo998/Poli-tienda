const express = require('express');
const router = express.Router();
const ProductosController = require('../controller/productos.controler');
const UsuariosController = require('../controller/usuarios.controller');
const ContactoController = require('../controller/contacto.controller');

router.get('/productos', ProductosController.getProductos);
router.post('/usuarios/registro', UsuariosController.registrar);
router.post('/usuarios/login', UsuariosController.login);
router.post('/contacto', ContactoController.crearContacto);
router.get('/contactos', ContactoController.obtenerContactos);

module.exports = router;
