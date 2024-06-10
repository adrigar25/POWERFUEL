-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.36 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para database_web
DROP DATABASE IF EXISTS `database_web`;
CREATE DATABASE IF NOT EXISTS `database_web` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `database_web`;

-- Volcando estructura para tabla database_web.brands
DROP TABLE IF EXISTS `brands`;
CREATE TABLE IF NOT EXISTS `brands` (
  `id_brand` int NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_brand`),
  UNIQUE KEY `brand_name` (`brand_name`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.brands: ~1 rows (aproximadamente)
DELETE FROM `brands`;
INSERT INTO `brands` (`id_brand`, `brand_name`) VALUES
	(1, 'Prozis');

-- Volcando estructura para tabla database_web.categories
DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `parent_category_id` int DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_name` (`category_name`),
  KEY `parent_category_id` (`parent_category_id`),
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_category_id`) REFERENCES `categories` (`category_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.categories: ~27 rows (aproximadamente)
DELETE FROM `categories`;
INSERT INTO `categories` (`category_id`, `category_name`, `parent_category_id`) VALUES
	(75, 'Alimentación Saludable', NULL),
	(76, 'Barritas y Snacks', 75),
	(77, 'Barritas', 76),
	(78, 'Galletas y Cereales', 76),
	(79, 'Muffins', 76),
	(80, 'Gofres y Tartas', 76),
	(81, 'Snacks Salados', 76),
	(82, 'Snacks Crudos', 76),
	(83, 'Frutos Secos y Fruta', 76),
	(84, 'Bebidas', 75),
	(85, 'Bebidas Proteicas', 84),
	(86, 'Bebidas Deportivas', 84),
	(87, 'Bebdas Vegetales', 84),
	(88, 'Cafe y Té', 84),
	(89, 'Aromas y Edulcorantes', 84),
	(90, 'Cremas', 75),
	(91, 'Cremas de Cacahuete', 90),
	(92, 'Cremas de Frutos Secos', 90),
	(93, 'Cremas para Untar', 90),
	(94, 'Cremas Proteicas', 90),
	(95, 'Congelados', 75),
	(96, 'Platos', 95),
	(97, 'Helados y Postres', 95),
	(98, 'Salsas, Siropes y Mermeladas', 75),
	(99, 'Salsa Zero', 98),
	(100, 'Siropes y Mermeladas', 98),
	(101, 'Suplementación', NULL);

-- Volcando estructura para tabla database_web.notification
DROP TABLE IF EXISTS `notification`;
CREATE TABLE IF NOT EXISTS `notification` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `notification_date` datetime NOT NULL,
  `viewed` enum('1','0') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `reference` varchar(200) DEFAULT NULL,
  `notification_user` int NOT NULL,
  `type` enum('Order','Notification') NOT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `reference` (`reference`),
  KEY `notification_user` (`notification_user`),
  CONSTRAINT `FK_Order_Notification` FOREIGN KEY (`reference`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_User_Notification` FOREIGN KEY (`notification_user`) REFERENCES `user_credentials` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.notification: ~1 rows (aproximadamente)
DELETE FROM `notification`;
INSERT INTO `notification` (`notification_id`, `title`, `description`, `notification_date`, `viewed`, `reference`, `notification_user`, `type`) VALUES
	(44, 'Pedido py_3PPRkRIqj90TtX551dF7BIY6 creado', 'Se ha creado un nuevo pedido con el número de orden: py_3PPRkRIqj90TtX551dF7BIY6', '2024-06-08 18:04:23', '1', 'py_3PPRkRIqj90TtX551dF7BIY6', 79, 'Order'),
	(50, 'Pedido py_3PPrBmIqj90TtX551efp4FhZ creado', 'Se ha creado un nuevo pedido con el número de orden: py_3PPrBmIqj90TtX551efp4FhZ', '2024-06-09 21:14:11', '1', 'py_3PPrBmIqj90TtX551efp4FhZ', 78, 'Order');

-- Volcando estructura para tabla database_web.old_passwords
DROP TABLE IF EXISTS `old_passwords`;
CREATE TABLE IF NOT EXISTS `old_passwords` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `old_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `change_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `old_passwords_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.old_passwords: ~3 rows (aproximadamente)
DELETE FROM `old_passwords`;
INSERT INTO `old_passwords` (`id`, `user_id`, `old_password`, `change_date`) VALUES
	(4, 78, '$2b$10$ZgCO3QMiRBp0JLuy9zaEm.npQjjF9naJuR42Ebkv1wyUWxGJg1ogG', '2024-06-08 20:15:03'),
	(5, 78, '$2b$10$MmDOlYGHCvdKoopIz.l.j.Wb2UyABqUKIIxV1c1k98sz0farfXJYq', '2024-06-09 16:17:03'),
	(6, 78, '$2b$10$Zvjyl.6LqwSlbY1OZ0GSROygJ.HJ7s/Y4B4vFVsIvsNvLOQkn9Nce', '2024-06-09 16:20:20'),
	(7, 78, '$2b$10$RAzCldZxy6xAX5eutgfM7eR7Dk0CUX4sSiMjpUA9c/gV.2qSZA2Ne', '2024-06-09 16:25:25'),
	(8, 78, '$2b$10$/yz1BM6t/Gg/Vx4mUHPkeeUP3WiCMThrQjxKtBRWGx1e04fWezG9S', '2024-06-09 16:27:46'),
	(9, 78, '$2b$10$/yz1BM6t/Gg/Vx4mUHPkeeUP3WiCMThrQjxKtBRWGx1e04fWezG9S', '2024-06-09 16:35:34'),
	(10, 78, '$2b$10$FH7Nyxa67yd04bQv9pkqJOGaYr8nCtSA67ahglW9ueY/pXMsrVHzu', '2024-06-09 16:36:17'),
	(11, 78, '$2b$10$OGHzy9sapZ4BeLY3gJCnd.uFURuGeBgCpDGp8t7ocnS20Iyc0lBGm', '2024-06-09 16:37:19'),
	(12, 78, '$2b$10$MCIyxOO059WjQCMlg8N2bei2DS/uYE6uYgc3lMBipCDJm1qIMMfui', '2024-06-09 16:38:07'),
	(13, 78, '$2b$10$/1OQN6NJKZJE9qWE0q0nxu71ft94eAwp4buK2a2WS.I8wF6m2/Kg.', '2024-06-09 16:39:07'),
	(14, 78, '$2b$10$ZM9CBbY/eOl7C7xW4N.aBORaOhq2dIt4O4NgMU9VlbMmulkaQfA1K', '2024-06-09 16:39:56'),
	(15, 78, '$2b$10$GXaXUAGV6NhIIieMGxkdtez14v9VBkhq6lNXmo7PDmvDZWLYMtZV.', '2024-06-09 16:41:24'),
	(16, 78, '$2b$10$5rxJLBBtZFAOMYtPGr3iL.Xj2jcI/RelteQslKkeHrda4C7WXcpN6', '2024-06-09 16:41:44');

-- Volcando estructura para tabla database_web.orders
DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` varchar(50) NOT NULL,
  `user_id` int DEFAULT NULL,
  `order_date` datetime NOT NULL,
  `status` enum('pendiente','en proceso','enviado','entregado','cancelado','devuelto','fallido','en proceso de devolucion') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `details` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `shipping_address` varchar(255) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `FK_orders_database_web.user_credentials` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.orders: ~1 rows (aproximadamente)
DELETE FROM `orders`;
INSERT INTO `orders` (`order_id`, `user_id`, `order_date`, `status`, `details`, `shipping_address`) VALUES
	('py_3PPrBmIqj90TtX551efp4FhZ', 78, '2024-06-09 21:14:10', 'pendiente', '[{"product_id":107,"quantity":1}]', '{"address_id":68,"user_id":78,"street":"Plaza de Uruguay, 8 28822 Coslada Madrid, España, 9° C","city":"Coslada","province":"Madrid","country":"España","zip":"28822","phone_number":654203319,"is_default":0}'),
	('py_3PPRkRIqj90TtX551dF7BIY6', 79, '2024-06-08 18:04:14', 'en proceso de devolucion', '[{"product_id":110,"quantity":1}]', '{"street":"C/Doctor Fleming","city":"Coslada","zip":"28821","province":"Comunidad de Madrid","country":"España","phone_number":602240748}');

-- Volcando estructura para tabla database_web.password_reset_codes
DROP TABLE IF EXISTS `password_reset_codes`;
CREATE TABLE IF NOT EXISTS `password_reset_codes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `code` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `used` enum('1','0') NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_USER_RESET_PASSWORD` (`user_id`),
  CONSTRAINT `FK_USER_RESET_PASSWORD` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.password_reset_codes: ~0 rows (aproximadamente)
DELETE FROM `password_reset_codes`;
INSERT INTO `password_reset_codes` (`id`, `user_id`, `code`, `created_at`, `used`) VALUES
	(4, 79, '986232', '2024-06-09 18:46:32', '0');

-- Volcando estructura para tabla database_web.products
DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock_quantity` int NOT NULL DEFAULT '0',
  `id_brand` int NOT NULL,
  `status` enum('Enabled','Disabled') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Disabled',
  `category_id` int NOT NULL,
  `stripe_product_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `stripe_price_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `registration_date` datetime NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `id_brand` (`id_brand`),
  KEY `category_ibfk_1` (`category_id`),
  CONSTRAINT `category_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  CONSTRAINT `FK_products_database_web.brands` FOREIGN KEY (`id_brand`) REFERENCES `brands` (`id_brand`)
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.products: ~8 rows (aproximadamente)
DELETE FROM `products`;
INSERT INTO `products` (`product_id`, `product_name`, `description`, `price`, `stock_quantity`, `id_brand`, `status`, `category_id`, `stripe_product_id`, `stripe_price_id`, `registration_date`) VALUES
	(106, '12 x Protein Snack 30g Chocolate blanco con frambuesas ', 'Cuando falta demasiado tiempo para la siguiente comida\r\n¿Estás todo el día sentado trabajando? Pruébalo y disfruta de tu dosis de proteínas sin calorías extra. ¡Es deliciosamente equilibrado!\r\n\r\n¿Sabes ese momento en que te apetece algo realmente bueno y te sientes tentado de hincarle el diente a algo apetitoso? ¡Pues es hora de que conozcas Protein Snack de Prozis! Una sabrosa barrita para disfrutar a cualquier hora del día siempre que sientas deseos de algo dulce y delicioso.\r\n\r\nEl aperitivo perfecto para completar tu dieta.\r\n\r\n¿Proteínas extra? ¡Claro!\r\nUna buena fuente de proteínas para satisfacer tus deseos a lo largo del día. ¡La mejor manera de hacer cada día un poquito más dulce!\r\n\r\nA tener en cuenta:\r\n- Fomenta el crecimiento muscular.\r\n- Perfecto para tus objetivos de fitness.\r\n- Sin conservantes.\r\n- Sin edulcorantes.\r\n- Sin aspartamo.', 10.68, 0, 1, 'Enabled', 77, 'prod_QENqAA3MBCprlk', 'price_1PNv4TIqj90TtX552fcfKqo9', '2024-06-04 10:58:29'),
	(107, '12 x Protein Snack 30g Chocolate-Avellana', 'Cuando falta demasiado tiempo para la siguiente comida\r\n¿Estás todo el día sentado trabajando? Pruébalo y disfruta de tu dosis de proteínas sin calorías extra. ¡Es deliciosamente equilibrado!\r\n\r\n¿Sabes ese momento en que te apetece algo realmente bueno y te sientes tentado de hincarle el diente a algo apetitoso? ¡Pues es hora de que conozcas Protein Snack de Prozis! Una sabrosa barrita para disfrutar a cualquier hora del día siempre que sientas deseos de algo dulce y delicioso.\r\n\r\nEl aperitivo perfecto para completar tu dieta.\r\n\r\n¿Proteínas extra? ¡Claro!\r\nUna buena fuente de proteínas para satisfacer tus deseos a lo largo del día. ¡La mejor manera de hacer cada día un poquito más dulce!\r\n\r\nA tener en cuenta:\r\n- Fomenta el crecimiento muscular.\r\n- Perfecto para tus objetivos de fitness.\r\n- Sin conservantes.\r\n- Sin edulcorantes.\r\n- Sin aspartamo.', 10.68, 1111, 1, 'Enabled', 77, 'prod_QENwUDJVe6DUhp', 'price_1PNvApIqj90TtX55Tvtdc0L0', '2024-06-04 11:05:03'),
	(108, '12 x Protein Snack 30g Chocolate-Coco', 'Cuando falta demasiado tiempo para la siguiente comida\r\n¿Estás todo el día sentado trabajando? Pruébalo y disfruta de tu dosis de proteínas sin calorías extra. ¡Es deliciosamente equilibrado!\r\n\r\n¿Sabes ese momento en que te apetece algo realmente bueno y te sientes tentado de hincarle el diente a algo apetitoso? ¡Pues es hora de que conozcas Protein Snack de Prozis! Una sabrosa barrita para disfrutar a cualquier hora del día siempre que sientas deseos de algo dulce y delicioso.\r\n\r\nEl aperitivo perfecto para completar tu dieta.\r\n\r\n¿Proteínas extra? ¡Claro!\r\nUna buena fuente de proteínas para satisfacer tus deseos a lo largo del día. ¡La mejor manera de hacer cada día un poquito más dulce!\r\n\r\nA tener en cuenta:\r\n- Fomenta el crecimiento muscular.\r\n- Perfecto para tus objetivos de fitness.\r\n- Sin conservantes.\r\n- Sin edulcorantes.\r\n- Sin aspartamo.', 10.68, 0, 1, 'Enabled', 78, 'prod_QENzHVIwUcK85A', 'price_1PNvDNIqj90TtX55dfzqej0R', '2024-06-04 11:07:41'),
	(109, '12 x Protein Snack 30g Chocolate-Galletas de Crema', 'Cuando falta demasiado tiempo para la siguiente comida\r\n¿Estás todo el día sentado trabajando? Pruébalo y disfruta de tu dosis de proteínas sin calorías extra. ¡Es deliciosamente equilibrado!\r\n\r\n¿Sabes ese momento en que te apetece algo realmente bueno y te sientes tentado de hincarle el diente a algo apetitoso? ¡Pues es hora de que conozcas Protein Snack de Prozis! Una sabrosa barrita para disfrutar a cualquier hora del día siempre que sientas deseos de algo dulce y delicioso.\r\n\r\nEl aperitivo perfecto para completar tu dieta.\r\n\r\n¿Proteínas extra? ¡Claro!\r\nUna buena fuente de proteínas para satisfacer tus deseos a lo largo del día. ¡La mejor manera de hacer cada día un poquito más dulce!\r\n\r\nA tener en cuenta:\r\n- Fomenta el crecimiento muscular.\r\n- Perfecto para tus objetivos de fitness.\r\n- Sin conservantes.\r\n- Sin edulcorantes.\r\n- Sin aspartamo.', 10.68, 1, 1, 'Enabled', 77, 'prod_QEO3X72ujJXrhl', 'price_1PNvHcIqj90TtX55qj6wSTO0', '2024-06-04 11:12:04'),
	(110, '12 x Protein Snack 30g Chocolate-Helado de Vainilla', 'Cuando falta demasiado tiempo para la siguiente comida\r\n¿Estás todo el día sentado trabajando? Pruébalo y disfruta de tu dosis de proteínas sin calorías extra. ¡Es deliciosamente equilibrado!\r\n\r\n¿Sabes ese momento en que te apetece algo realmente bueno y te sientes tentado de hincarle el diente a algo apetitoso? ¡Pues es hora de que conozcas Protein Snack de Prozis! Una sabrosa barrita para disfrutar a cualquier hora del día siempre que sientas deseos de algo dulce y delicioso.\r\n\r\nEl aperitivo perfecto para completar tu dieta.\r\n\r\n¿Proteínas extra? ¡Claro!\r\nUna buena fuente de proteínas para satisfacer tus deseos a lo largo del día. ¡La mejor manera de hacer cada día un poquito más dulce!\r\n\r\nA tener en cuenta:\r\n- Fomenta el crecimiento muscular.\r\n- Perfecto para tus objetivos de fitness.\r\n- Sin conservantes.\r\n- Sin edulcorantes.\r\n- Sin aspartamo.', 10.68, 0, 1, 'Enabled', 77, 'prod_QEO6RJbyub4ttR', 'price_1PNvKYIqj90TtX5584LNVgJ2', '2024-06-04 11:15:06'),
	(111, '12 x Protein Snack 30g Chocolate-Tofe', 'Cuando falta demasiado tiempo para la siguiente comida\r\n¿Estás todo el día sentado trabajando? Pruébalo y disfruta de tu dosis de proteínas sin calorías extra. ¡Es deliciosamente equilibrado!\r\n\r\n¿Sabes ese momento en que te apetece algo realmente bueno y te sientes tentado de hincarle el diente a algo apetitoso? ¡Pues es hora de que conozcas Protein Snack de Prozis! Una sabrosa barrita para disfrutar a cualquier hora del día siempre que sientas deseos de algo dulce y delicioso.\r\n\r\nEl aperitivo perfecto para completar tu dieta.\r\n\r\n¿Proteínas extra? ¡Claro!\r\nUna buena fuente de proteínas para satisfacer tus deseos a lo largo del día. ¡La mejor manera de hacer cada día un poquito más dulce!\r\n\r\nA tener en cuenta:\r\n- Fomenta el crecimiento muscular.\r\n- Perfecto para tus objetivos de fitness.\r\n- Sin conservantes.\r\n- Sin edulcorantes.\r\n- Sin aspartamo.', 10.68, 0, 1, 'Enabled', 77, 'prod_QEO97ItjjoQa0b', 'price_1PNvNNIqj90TtX55OX04nZCp', '2024-06-04 11:18:02');

-- Volcando estructura para tabla database_web.roles
DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.roles: ~7 rows (aproximadamente)
DELETE FROM `roles`;
INSERT INTO `roles` (`role_id`, `role_name`) VALUES
	(99, 'Administrador'),
	(96, 'Manager de Analiticas'),
	(94, 'Manager de Pedidos'),
	(97, 'Manager de Productos'),
	(95, 'Manager de Soporte'),
	(98, 'Manager de Usuarios'),
	(10, 'Usuario');

-- Volcando estructura para tabla database_web.support_tickets
DROP TABLE IF EXISTS `support_tickets`;
CREATE TABLE IF NOT EXISTS `support_tickets` (
  `ticket_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` enum('Problema de Pago','Problema de Envío','Producto Dañado','Producto Incorrecto','Consulta de Producto','Solicitud de Reembolso','Problema de Inicio de Sesión','Problema de Cuenta','Otro') NOT NULL,
  `message` text NOT NULL,
  PRIMARY KEY (`ticket_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.support_tickets: ~2 rows (aproximadamente)
DELETE FROM `support_tickets`;
INSERT INTO `support_tickets` (`ticket_id`, `email`, `name`, `type`, `message`) VALUES
	(1, 'adrigar250503@gmail.com', 'Paco', 'Otro', 'Hola me gusta el chuchi'),
	(2, 'adrigar250503@gmail.com', 'Paco', 'Otro', 'Hola me gusta el chuchi');

-- Volcando estructura para tabla database_web.user_address
DROP TABLE IF EXISTS `user_address`;
CREATE TABLE IF NOT EXISTS `user_address` (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `street` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `zip` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `province` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone_number` int NOT NULL,
  `is_default` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`address_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.user_address: ~2 rows (aproximadamente)
DELETE FROM `user_address`;
INSERT INTO `user_address` (`address_id`, `user_id`, `street`, `city`, `country`, `zip`, `province`, `phone_number`, `is_default`) VALUES
	(68, 78, 'Plaza de Uruguay, 8 28822 Coslada Madrid, España, 9° C', 'Coslada', 'España', '28822', 'Madrid', 654203319, 0),
	(69, 79, 'C/Doctor Fleming', 'Coslada', 'España', '28821', 'Comunidad de Madrid', 602240748, 1),
	(71, 79, 'C/San Patricio', 'Madrid', 'España', '28082', 'Comunidad de Madrid', 123455698, 0);

-- Volcando estructura para tabla database_web.user_credentials
DROP TABLE IF EXISTS `user_credentials`;
CREATE TABLE IF NOT EXISTS `user_credentials` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `current_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `stripe_customer_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` enum('Activo','Inactivo','Suspendido') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Activo',
  `registration_date` datetime NOT NULL,
  PRIMARY KEY (`user_id`,`email`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.user_credentials: ~2 rows (aproximadamente)
DELETE FROM `user_credentials`;
INSERT INTO `user_credentials` (`user_id`, `email`, `current_password`, `stripe_customer_id`, `status`, `registration_date`) VALUES
	(78, 'adrigar250503@gmail.com', '$2b$10$2HpgEKW9IYiG7/JWDQp35O6fbmM.As8RO0OwELhTbZvqoJ0Cl1Ori', 'cus_QFtSI0obB5PLDZ', 'Activo', '2024-06-08 13:42:35'),
	(79, 'adrian.escribano3@gmail.com', '$2b$10$EXAyHVw3qdSjqOEFRdi8WeIhHnLx.wRzIumRWEZ7nGPzNTSZQAhue', 'cus_QFu3HwQHZVhzWb', 'Activo', '2024-06-08 14:20:02');

-- Volcando estructura para tabla database_web.user_info
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE IF NOT EXISTS `user_info` (
  `user_id` int NOT NULL,
  `first_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `last_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `dni` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `user_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.user_info: ~3 rows (aproximadamente)
DELETE FROM `user_info`;
INSERT INTO `user_info` (`user_id`, `first_name`, `last_name`, `dni`) VALUES
	(78, 'Adriáns', 'García Torrente', '49815997k'),
	(79, 'Adrián', 'Escribano Pérez', '49814242z');

-- Volcando estructura para tabla database_web.user_roles
DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE IF NOT EXISTS `user_roles` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL DEFAULT '10',
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `role_id_ibfk_1` (`role_id`),
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla database_web.user_roles: ~3 rows (aproximadamente)
DELETE FROM `user_roles`;
INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
	(78, 99),
	(79, 99);

-- Volcando estructura para disparador database_web.update_order_status_on_delete
DROP TRIGGER IF EXISTS `update_order_status_on_delete`;
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `update_order_status_on_delete` BEFORE DELETE ON `user_credentials` FOR EACH ROW BEGIN
    UPDATE orders
    SET status = 'cancelado'
    WHERE user_id = OLD.user_id;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
