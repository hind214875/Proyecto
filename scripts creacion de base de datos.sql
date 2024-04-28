-- Creación de la base de datos
CREATE DATABASE EcoDomesticHelp;

-- Uso de la base de datos
USE EcoDomesticHelp;

-- Creación de la tabla USUARIO
CREATE TABLE USUARIO (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    email VARCHAR(255),
    password varchar(255),
    tipo ENUM('Cliente', 'Profesional', 'Ambos')
);

ALTER TABLE usuario MODIFY COLUMN tipo TEXT;


-- Creación de la tabla PROFESIONAL
CREATE TABLE PROFESIONAL (
    profesional_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    especialidad VARCHAR(255),
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES USUARIO(usuario_id)
);

-- Creación de la tabla CATEGORIA-DE-SERVICIO
CREATE TABLE CATEGORIA_DE_SERVICIO (
    categoria_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255)
);

-- Creación de la tabla SERVICIO
CREATE TABLE SERVICIO (
    servicio_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    descripcion TEXT,
    precio Long,
    categoria_id INT,
    profesional_id INT,
    FOREIGN KEY (categoria_id) REFERENCES CATEGORIA_DE_SERVICIO(categoria_id),
    FOREIGN KEY (profesional_id) REFERENCES PROFESIONAL(profesional_id)
);

-- Creación de la tabla RESERVA
CREATE TABLE RESERVA (
    reserva_id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE,
    estado VARCHAR(255),
    usuario_id INT,
    profesional_id INT,
    servicio_id INT,
    FOREIGN KEY (usuario_id) REFERENCES USUARIO(usuario_id),
    FOREIGN KEY (profesional_id) REFERENCES PROFESIONAL(profesional_id),
    FOREIGN KEY (servicio_id) REFERENCES SERVICIO(servicio_id)
);

-- Creación de la tabla COMENTARIO
CREATE TABLE COMENTARIO (
    comentario_id INT AUTO_INCREMENT PRIMARY KEY,
    contenido TEXT,
    fecha DATE,
    usuario_id INT,
    servicio_id INT,
    FOREIGN KEY (usuario_id) REFERENCES USUARIO(usuario_id),
    FOREIGN KEY (servicio_id) REFERENCES SERVICIO(servicio_id)
);

-- insert Data
INSERT INTO `servicio`(`servicio_id`, `nombre`, `descripcion`, `precio`, `categoria_id`, `profesional_id`) VALUES ('','Cleaning','Cleaning houses','145','1','3'); 
INSERT INTO `servicio`(`servicio_id`, `nombre`, `descripcion`, `precio`, `categoria_id`, `profesional_id`) VALUES ('','Car Washing','best car washing','100','1','2'); 
INSERT INTO `servicio`(`servicio_id`, `nombre`, `descripcion`, `precio`, `categoria_id`, `profesional_id`) VALUES ('','Car Washing','best car washing','100','1','2'); 