-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 01, 2024 at 12:25 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecodomestichelp`
--
-- Creación de la base de datos
CREATE DATABASE EcoDomesticHelp;

-- Uso de la base de datos
USE EcoDomesticHelp;

-- --------------------------------------------------------

--
-- Table structure for table `categoria_de_servicio`
--

CREATE TABLE `categoria_de_servicio` (
  `categoria_id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categoria_de_servicio`
--

INSERT INTO `categoria_de_servicio` (`categoria_id`, `nombre`) VALUES
(1, 'Cleaning'),
(2, 'Plumbing'),
(3, 'Car Washing');

-- --------------------------------------------------------

--
-- Table structure for table `comentario`
--

CREATE TABLE `comentario` (
  `comentario_id` int(11) NOT NULL,
  `contenido` text DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `servicio_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `profesional`
--

CREATE TABLE `profesional` (
  `profesional_id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `especialidad` varchar(255) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profesional`
--

INSERT INTO `profesional` (`profesional_id`, `nombre`, `especialidad`, `usuario_id`) VALUES
(23, 'professional1', 'Cleaning', 48),
(24, 'professional2', 'Car washing', 49),
(25, 'professional3', 'Plumbing', 50);

-- --------------------------------------------------------

--
-- Table structure for table `reserva`
--

CREATE TABLE `reserva` (
  `reserva_id` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `profesional_id` int(11) DEFAULT NULL,
  `servicio_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reserva`
--

INSERT INTO `reserva` (`reserva_id`, `fecha`, `estado`, `usuario_id`, `profesional_id`, `servicio_id`) VALUES
(12, '2024-04-30', 'pending', 47, 24, 20),
(14, '2024-04-30', 'accepted', 47, 25, 21);

-- --------------------------------------------------------

--
-- Table structure for table `servicio`
--

CREATE TABLE `servicio` (
  `servicio_id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` mediumtext DEFAULT NULL,
  `categoria_id` int(11) DEFAULT NULL,
  `profesional_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `servicio`
--

INSERT INTO `servicio` (`servicio_id`, `nombre`, `descripcion`, `precio`, `categoria_id`, `profesional_id`) VALUES
(19, 'Cleaning', 'We are the best in the town', '125', 1, 23),
(20, 'Car washing', 'We offer best service for best price', '100', 3, 24),
(21, 'Plumbing', 'Trust us ', '155', 2, 25);

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `usuario_id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `tipo` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`usuario_id`, `nombre`, `email`, `password`, `tipo`) VALUES
(46, 'Hinda', 'Hinda@gmail.com', '$2y$10$x36WJZ02PqcDunn.9Xa7QOPHbF6hEsSS8c78lufJJ1aYVGnp36PO2', 'user'),
(47, 'Jose', 'jose@gmail.com', '$2y$10$emrg6ImqzMDqYhAAM8a.xOCDcHa3DzdBvfhHpvmc13GT8I0jRuDZ.', 'user'),
(48, 'professional1', 'professional1@gmail.com', '$2y$10$JyHwpKIeAr/CKZTMrvQP9udAtieKobjrVgBOch0ZrykrXWDiERvC2', 'professional'),
(49, 'professional2', 'professional2@gmail.com', '$2y$10$Cfo.gsrDAhR1BEay.91b.Ot41OgsesXNHr4Z.B/5Il3xTuxvSztES', 'professional'),
(50, 'professional3', 'professional3@gmail.com', '$2y$10$VbmfzM5qtJqi0fpl63kE9uflixmWlAoNkfaF8IybKIwTcBsjuC6Uq', 'professional');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categoria_de_servicio`
--
ALTER TABLE `categoria_de_servicio`
  ADD PRIMARY KEY (`categoria_id`);

--
-- Indexes for table `comentario`
--
ALTER TABLE `comentario`
  ADD PRIMARY KEY (`comentario_id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `servicio_id` (`servicio_id`);

--
-- Indexes for table `profesional`
--
ALTER TABLE `profesional`
  ADD PRIMARY KEY (`profesional_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indexes for table `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`reserva_id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `profesional_id` (`profesional_id`),
  ADD KEY `servicio_id` (`servicio_id`);

--
-- Indexes for table `servicio`
--
ALTER TABLE `servicio`
  ADD PRIMARY KEY (`servicio_id`),
  ADD KEY `categoria_id` (`categoria_id`),
  ADD KEY `profesional_id` (`profesional_id`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`usuario_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categoria_de_servicio`
--
ALTER TABLE `categoria_de_servicio`
  MODIFY `categoria_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `comentario`
--
ALTER TABLE `comentario`
  MODIFY `comentario_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `profesional`
--
ALTER TABLE `profesional`
  MODIFY `profesional_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `reserva`
--
ALTER TABLE `reserva`
  MODIFY `reserva_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `servicio`
--
ALTER TABLE `servicio`
  MODIFY `servicio_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `usuario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comentario`
--
ALTER TABLE `comentario`
  ADD CONSTRAINT `comentario_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`),
  ADD CONSTRAINT `comentario_ibfk_2` FOREIGN KEY (`servicio_id`) REFERENCES `servicio` (`servicio_id`);

--
-- Constraints for table `profesional`
--
ALTER TABLE `profesional`
  ADD CONSTRAINT `profesional_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`);

--
-- Constraints for table `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`),
  ADD CONSTRAINT `reserva_ibfk_2` FOREIGN KEY (`profesional_id`) REFERENCES `profesional` (`profesional_id`),
  ADD CONSTRAINT `reserva_ibfk_3` FOREIGN KEY (`servicio_id`) REFERENCES `servicio` (`servicio_id`);

--
-- Constraints for table `servicio`
--
ALTER TABLE `servicio`
  ADD CONSTRAINT `servicio_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria_de_servicio` (`categoria_id`),
  ADD CONSTRAINT `servicio_ibfk_2` FOREIGN KEY (`profesional_id`) REFERENCES `profesional` (`profesional_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
