-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:33065
-- Tiempo de generación: 30-11-2022 a las 04:14:38
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `farmacia_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `customer`
--

CREATE TABLE `customer` (
  `id` varchar(36) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `firstname` varchar(500) NOT NULL,
  `lastname` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `age` int(11) NOT NULL,
  `dni` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `customer`
--

INSERT INTO `customer` (`id`, `created_at`, `updated_at`, `firstname`, `lastname`, `email`, `age`, `dni`) VALUES
('fca3601d-107d-11ed-91ac-e0d55eb315bd', '2022-07-31 13:08:09.000000', '2022-07-31 13:08:09.000000', 'Marco', 'Amasifuen', 'marco@gmail.com', 24, '12345678');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `employee`
--

CREATE TABLE `employee` (
  `id` varchar(36) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `firstname` varchar(500) NOT NULL,
  `lastname` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `age` int(11) NOT NULL,
  `dni` varchar(8) NOT NULL,
  `username` varchar(500) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','SELLER','CASHIER') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `employee`
--

INSERT INTO `employee` (`id`, `created_at`, `updated_at`, `firstname`, `lastname`, `email`, `age`, `dni`, `username`, `password`, `role`) VALUES
('86ba988e-5b92-4808-9c65-db13aaf999e9', '2022-07-24 10:17:35.027332', '2022-07-24 10:17:35.027332', 'Thom Maurick', 'Roman Aguilar', 'thomtwd@gmail.com', 24, '72847964', 'thomtwd', '$2b$10$YV7QjCvui7uFpEyo.FaFB.skiBVpDL6dxohZXOe7mvsoQsYJ8lwg.', 'ADMIN');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `laboratory`
--

CREATE TABLE `laboratory` (
  `id` varchar(36) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `address` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lng` varchar(255) NOT NULL,
  `lat` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `laboratory`
--

INSERT INTO `laboratory` (`id`, `created_at`, `updated_at`, `address`, `description`, `name`, `lng`, `lat`) VALUES
('abc16638-f775-4ceb-a40d-0b889666b9c2', '2022-07-24 11:54:56.632518', '2022-07-24 11:54:56.632518', 'Lima Peru', 'Laboratorio Muerte description', 'Laboratorio Muerte', '-73.990593', '40.740121'),
('b003453e-0fb7-11ed-91ed-e0d55eb315bd', '2022-07-30 13:27:36.000000', '2022-07-30 13:27:36.000000', 'Argentina, Buenos Aires', 'Laboratorio en Argentina', 'ArgentinaLab', '-77.02053535953974', '-11.942631145218613');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(11) NOT NULL,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `timestamp`, `name`) VALUES
(1, 1669308798624, 'initDB1669308798624');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `id` varchar(36) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `name` varchar(255) NOT NULL,
  `therapeutic_description` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `expiration_date` datetime NOT NULL,
  `laboratory_id` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`id`, `created_at`, `updated_at`, `name`, `therapeutic_description`, `price`, `stock`, `expiration_date`, `laboratory_id`) VALUES
('4e247dd3-e03e-4278-a76c-fa4adbc1c88e', '2022-07-31 11:40:27.335890', '2022-11-30 03:13:06.000000', 'Vendas', 'Para Heridas', 20, 649, '2050-07-30 20:40:01', 'b003453e-0fb7-11ed-91ed-e0d55eb315bd'),
('4feac5fb-2dbb-4547-b512-98e8bccee7b9', '2022-07-31 12:21:41.317017', '2022-11-30 03:13:06.000000', 'Aspirinas', 'Desc. Aspirinas', 11, 90, '2022-07-30 21:21:30', 'b003453e-0fb7-11ed-91ed-e0d55eb315bd'),
('749e64e3-0fb0-11ed-91ed-e0d55eb315bd', '2022-07-30 12:37:51.000000', '2022-08-01 05:01:03.000000', 'Producto #2', 'Description', 50, 95, '2029-12-27 21:35:37', 'abc16638-f775-4ceb-a40d-0b889666b9c2'),
('7e9cba54-0fb6-11ed-91ed-e0d55eb315bd', '2022-07-30 13:19:27.000000', '2022-07-30 13:19:27.000000', 'Producto #4', 'Producto #4', 65, 120, '2029-07-26 22:19:27', 'abc16638-f775-4ceb-a40d-0b889666b9c2'),
('a51de88a-0fb6-11ed-91ed-e0d55eb315bd', '2022-07-30 13:20:36.000000', '2022-08-01 05:01:03.000000', 'Producto #5', 'Producto #5', 65, 79, '2027-07-30 22:20:36', 'abc16638-f775-4ceb-a40d-0b889666b9c2'),
('bafe5938-0fb6-11ed-91ed-e0d55eb315bd', '2022-07-30 13:21:16.000000', '2022-08-01 00:03:19.000000', 'Producto #66', 'Producto #6', 98, 654, '2026-07-31 22:21:16', 'abc16638-f775-4ceb-a40d-0b889666b9c2'),
('c162b83f-34d1-404d-ba14-21fc831bb8df', '2022-07-24 11:58:32.740272', '2022-08-01 05:01:03.000000', 'Pastillas', 'Producto para mayores de edad', 60, 45, '2022-07-29 21:00:00', 'abc16638-f775-4ceb-a40d-0b889666b9c2'),
('c7ec99f1-0fb7-11ed-91ed-e0d55eb315bd', '2022-07-30 13:28:39.000000', '2022-07-30 13:28:39.000000', 'Producto #7', 'Producto #7', 96, 65, '2029-07-26 22:28:39', 'abc16638-f775-4ceb-a40d-0b889666b9c2'),
('eb2fe44e-0fb0-11ed-91ed-e0d55eb315bd', '2022-07-30 12:39:22.000000', '2022-07-30 13:29:35.646100', 'Producto #3', 'Producto #3', 150, 60, '2030-07-17 21:39:22', 'b003453e-0fb7-11ed-91ed-e0d55eb315bd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchase`
--

CREATE TABLE `purchase` (
  `id` varchar(36) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `description` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `customer_id` varchar(36) DEFAULT NULL,
  `employee_id` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `purchase`
--

INSERT INTO `purchase` (`id`, `created_at`, `updated_at`, `description`, `amount`, `payment_method`, `customer_id`, `employee_id`) VALUES
('27d4e7a8-e5c6-45fb-8caf-f597d62d8133', '2022-11-30 03:13:06.840983', '2022-11-30 03:13:06.840983', 'ventas #66', 4270, 'Efectivo', 'fca3601d-107d-11ed-91ac-e0d55eb315bd', '86ba988e-5b92-4808-9c65-db13aaf999e9'),
('3fc24c39-1091-11ed-91ac-e0d55eb315bd', '2022-07-31 15:24:36.000000', '2022-08-01 02:10:22.391609', 'Compras para el un accidente', 51, 'Efectivo', 'fca3601d-107d-11ed-91ac-e0d55eb315bd', '86ba988e-5b92-4808-9c65-db13aaf999e9'),
('48d9e5e1-1111-11ed-8987-e0d55eb315bd', '2023-07-20 01:41:18.000000', '2022-08-01 02:10:31.154140', 'Por si las moscas', 20, 'Efectivo', 'fca3601d-107d-11ed-91ac-e0d55eb315bd', '86ba988e-5b92-4808-9c65-db13aaf999e9'),
('4e21be64-17a9-49b0-8a64-a0ecfbff8376', '2022-08-01 05:01:02.979002', '2022-08-01 05:01:02.979002', 'ventas #34', 1640, 'Efectivo', 'fca3601d-107d-11ed-91ac-e0d55eb315bd', '86ba988e-5b92-4808-9c65-db13aaf999e9'),
('99336b20-1114-11ed-8987-e0d55eb315bd', '2022-08-01 02:02:56.000000', '2022-08-01 02:09:11.398271', 'Para mi', 300, 'Efectivo', 'fca3601d-107d-11ed-91ac-e0d55eb315bd', '86ba988e-5b92-4808-9c65-db13aaf999e9');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchase_detail`
--

CREATE TABLE `purchase_detail` (
  `id` varchar(36) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `quantity_product` int(11) NOT NULL,
  `total_price` int(11) NOT NULL,
  `purchase_id` varchar(36) DEFAULT NULL,
  `product_id` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `purchase_detail`
--

INSERT INTO `purchase_detail` (`id`, `created_at`, `updated_at`, `quantity_product`, `total_price`, `purchase_id`, `product_id`) VALUES
('2de2ee70-3840-4881-85ff-cf5dfef8ea9c', '2022-08-01 05:01:02.999866', '2022-08-01 05:01:02.999866', 10, 890, '4e21be64-17a9-49b0-8a64-a0ecfbff8376', 'a51de88a-0fb6-11ed-91ed-e0d55eb315bd'),
('68313f43-4474-4a3a-83a8-7f70c050029f', '2022-11-30 03:13:06.851563', '2022-11-30 03:13:06.851563', 5, 3270, '27d4e7a8-e5c6-45fb-8caf-f597d62d8133', '4e247dd3-e03e-4278-a76c-fa4adbc1c88e'),
('6ab43d52-9c3e-461d-8f34-74c799745948', '2022-08-01 05:01:02.997728', '2022-08-01 05:01:02.997728', 5, 500, '4e21be64-17a9-49b0-8a64-a0ecfbff8376', '749e64e3-0fb0-11ed-91ed-e0d55eb315bd'),
('6e473cce-1091-11ed-91ac-e0d55eb315bd', '2022-07-31 15:26:12.000000', '2022-08-01 02:08:33.645593', 2, 40, '3fc24c39-1091-11ed-91ac-e0d55eb315bd', '4e247dd3-e03e-4278-a76c-fa4adbc1c88e'),
('72e2a213-1111-11ed-8987-e0d55eb315bd', '2023-07-20 01:41:18.000000', '2022-08-01 02:08:29.687460', 1, 20, '48d9e5e1-1111-11ed-8987-e0d55eb315bd', '4e247dd3-e03e-4278-a76c-fa4adbc1c88e'),
('81c5088a-1091-11ed-91ac-e0d55eb315bd', '2022-07-31 15:27:20.000000', '2022-08-01 01:39:36.363300', 1, 11, '3fc24c39-1091-11ed-91ac-e0d55eb315bd', '4feac5fb-2dbb-4547-b512-98e8bccee7b9'),
('b76d1193-2643-4995-b7d1-ed0e45284b12', '2022-08-01 05:01:02.998605', '2022-08-01 05:01:02.998605', 5, 250, '4e21be64-17a9-49b0-8a64-a0ecfbff8376', 'c162b83f-34d1-404d-ba14-21fc831bb8df'),
('c6ab46d9-1114-11ed-8987-e0d55eb315bd', '2022-08-01 02:06:34.000000', '2022-08-01 02:09:01.508170', 2, 300, '99336b20-1114-11ed-8987-e0d55eb315bd', 'eb2fe44e-0fb0-11ed-91ed-e0d55eb315bd'),
('d87c6f61-bbbe-4853-a2ad-0eefc7336726', '2022-11-30 03:13:06.852018', '2022-11-30 03:13:06.852018', 10, 1000, '27d4e7a8-e5c6-45fb-8caf-f597d62d8133', '4feac5fb-2dbb-4547-b512-98e8bccee7b9');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_82c2d0dca0a87300c738be9a88` (`email`,`dni`);

--
-- Indices de la tabla `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_b97823bf100e01f4325ed7c1c3` (`username`,`email`,`dni`) USING HASH;

--
-- Indices de la tabla `laboratory`
--
ALTER TABLE `laboratory`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_0d8f3e07f3eba9e858c3081587` (`name`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_22cc43e9a74d7498546e9a63e7` (`name`),
  ADD KEY `FK_76c3ee596f4a0b49af493d22cbe` (`laboratory_id`);

--
-- Indices de la tabla `purchase`
--
ALTER TABLE `purchase`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_2248a331258d17d204ccfe9497c` (`customer_id`),
  ADD KEY `FK_a243212193f01678bce0b29507e` (`employee_id`);

--
-- Indices de la tabla `purchase_detail`
--
ALTER TABLE `purchase_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_28f8b3d42bcff4501d7a60c61d8` (`purchase_id`),
  ADD KEY `FK_4c0d5cb87dca1bc0bd0267e1d80` (`product_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK_76c3ee596f4a0b49af493d22cbe` FOREIGN KEY (`laboratory_id`) REFERENCES `laboratory` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `purchase`
--
ALTER TABLE `purchase`
  ADD CONSTRAINT `FK_2248a331258d17d204ccfe9497c` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_a243212193f01678bce0b29507e` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `purchase_detail`
--
ALTER TABLE `purchase_detail`
  ADD CONSTRAINT `FK_28f8b3d42bcff4501d7a60c61d8` FOREIGN KEY (`purchase_id`) REFERENCES `purchase` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_4c0d5cb87dca1bc0bd0267e1d80` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
