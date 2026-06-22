
IF EXISTS (SELECT * FROM sys.databases WHERE name = 'tienda_gatos')
BEGIN
    ALTER DATABASE tienda_gato SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE tienda_gato;
END
GO

-- Crear la base de datos
CREATE DATABASE tienda_gato;
GO

USE tienda_gatos;
GO

-- ============================================
-- TABLAS INDEPENDIENTES
-- ============================================

CREATE TABLE CATEGORIAS (
    id_categoria INT IDENTITY(1,1) PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL
);
GO

CREATE TABLE USUARIOS (
    id_usuario INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    direccion VARCHAR(255)
);
GO

CREATE TABLE VETERINARIOS (
    id_veterinario INT IDENTITY(1,1) PRIMARY KEY,
    nombre_medico VARCHAR(150) NOT NULL,
    especialidad VARCHAR(100),
    telefono VARCHAR(20)
);
GO

-- ============================================
-- TABLAS CON DEPENDENCIAS DE PRIMER NIVEL
-- ============================================

CREATE TABLE PRODUCTOS_ACCESORIOS (
    id_producto INT IDENTITY(1,1) PRIMARY KEY,
    id_categoria INT NOT NULL,
    nombre_producto VARCHAR(150) NOT NULL,
    descripcion VARCHAR(MAX),
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    tipo_mascota_destino VARCHAR(50),
    imagen_url VARCHAR(255),
    CONSTRAINT FK_PRODUCTOS_CATEGORIAS FOREIGN KEY (id_categoria)
        REFERENCES CATEGORIAS(id_categoria)
);
GO

CREATE TABLE PEDIDOS (
    id_pedido INT IDENTITY(1,1) PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha_compra DATETIME DEFAULT GETDATE(),
    estado_pedido VARCHAR(50) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    CONSTRAINT FK_PEDIDOS_USUARIOS FOREIGN KEY (id_usuario)
        REFERENCES USUARIOS(id_usuario)
);
GO

CREATE TABLE MASCOTAS (
    id_mascota INT IDENTITY(1,1) PRIMARY KEY,
    id_usuario INT NOT NULL,
    nombre_mascota VARCHAR(100) NOT NULL,
    tipo_animal VARCHAR(50) NOT NULL,
    raza VARCHAR(50),
    edad INT,
    CONSTRAINT FK_MASCOTAS_USUARIOS FOREIGN KEY (id_usuario)
        REFERENCES USUARIOS(id_usuario)
);
GO

-- ============================================
-- TABLAS CON DEPENDENCIAS DE SEGUNDO NIVEL
-- ============================================

CREATE TABLE DETALLES_PEDIDO (
    id_detalle INT IDENTITY(1,1) PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    CONSTRAINT FK_DETALLES_PEDIDOS FOREIGN KEY (id_pedido)
        REFERENCES PEDIDOS(id_pedido),
    CONSTRAINT FK_DETALLES_PRODUCTOS FOREIGN KEY (id_producto)
        REFERENCES PRODUCTOS_ACCESORIOS(id_producto)
);
GO

CREATE TABLE CITAS_VETERINARIA (
    id_cita INT IDENTITY(1,1) PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_mascota INT NOT NULL,
    id_veterinario INT NOT NULL,
    fecha_hora DATETIME NOT NULL,
    motivo_consulta VARCHAR(MAX),
    estado_cita VARCHAR(50) NOT NULL,
    costo_servicio DECIMAL(10,2) NOT NULL,
    CONSTRAINT FK_CITAS_USUARIOS FOREIGN KEY (id_usuario)
        REFERENCES USUARIOS(id_usuario),
    CONSTRAINT FK_CITAS_MASCOTAS FOREIGN KEY (id_mascota)
        REFERENCES MASCOTAS(id_mascota),
    CONSTRAINT FK_CITAS_VETERINARIOS FOREIGN KEY (id_veterinario)
        REFERENCES VETERINARIOS(id_veterinario)
);
GO

-- ============================================
-- TABLA CON DEPENDENCIA DE TERCER NIVEL
-- ============================================

CREATE TABLE HISTORIALES_MEDICOS (
    id_historial INT IDENTITY(1,1) PRIMARY KEY,
    id_cita INT NOT NULL,
    diagnostico VARCHAR(MAX) NOT NULL,
    tratamiento VARCHAR(MAX),
    medicamentos_recetados VARCHAR(MAX),
    CONSTRAINT FK_HISTORIALES_CITAS FOREIGN KEY (id_cita)
        REFERENCES CITAS_VETERINARIA(id_cita)
);
GO

-- ============================================
-- DATOS DE PRUEBA
-- ============================================

-- Categorías
INSERT INTO CATEGORIAS (nombre_categoria) VALUES
('Fotos de Gatos'),
('Accesorios Felinos');
GO

-- Usuarios
INSERT INTO USUARIOS (nombre, email, contrasena, telefono, direccion) VALUES
('Carlos Mendoza', 'carlos.mendoza@email.com', 'password123', '555-0192', 'Calle Flores 123'),
('Ana Gomez', 'ana.gomez@email.com', 'password456', '555-0143', 'Av. Central 456'),
('Luis Martinez', 'luis.mtz@email.com', 'password789', '555-0177', 'Pasaje Los Pinos 78');
GO

-- Veterinarios
INSERT INTO VETERINARIOS (nombre_medico, especialidad, telefono) VALUES
('Dra. Elena Rostova', 'Cirugía General', '555-9001'),
('Dr. Arturo Vidal', 'Cardiología Veterinaria', '555-9002'),
('Dra. Laura Camila', 'Dermatología', '555-9003');
GO

-- Productos
INSERT INTO PRODUCTOS_ACCESORIOS (id_categoria, nombre_producto, descripcion, precio, stock, tipo_mascota_destino, imagen_url) VALUES
(1, 'Gato negrito sorprendido', 'Foto divertida de un gato negro con cara de sorpresa', 10.00, 5, 'Gato', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP9kjGoUyCullSB0hdGnAsNA_B3191jwv_DA&s'),
(1, 'Gato blanco con manchas', 'Foto tierna de un gato blanco con manchas oscuras', 12.00, 5, 'Gato', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6-A50gwQdbkC0eYpfvInN7F1H7jo4CixfGw&s'),
(1, 'Gato pepinillo divertido', 'Imagen graciosa estilo meme de un gato convertido en pepinillo', 8.00, 5, 'Gato', 'https://i.pinimg.com/236x/94/39/7c/94397c2c4e0489b53b67e2f014449935.jpg'),
(2, 'Collar reflejante para gatos', 'Collar ajustable reflejante para gatos', 15.00, 10, 'Gato', 'https://i.pinimg.com/236x/7d/3a/2f/7d3a2f4f6c2a4a9b7f6c9a9f6a7a9a9f.jpg');
GO

PRINT '✓ Base de datos creada y configurada correctamente';
