-- -------------------------------------------------------------
-- TablePlus 4.0.0(370)
--
-- https://tableplus.com/
--
-- Database: modulo-dominios
-- Generation Time: 2021-07-15 6:09:25.6520 p.m.
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `dnsRecord` (
  `Dns_ID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Dom_ID` bigint unsigned NOT NULL,
  `Dns_Data` varchar(15) NOT NULL,
  `Dns_Name` varchar(15) NOT NULL,
  `Dns_Type` varchar(15) NOT NULL,
  `createdAt` timestamp NOT NULL,
  `updatedAt` timestamp NOT NULL,
  PRIMARY KEY (`Dns_ID`),
  UNIQUE KEY `Dns_ID` (`Dns_ID`),
  KEY `Dom_ID` (`Dom_ID`),
  CONSTRAINT `dnsrecord_ibfk_1` FOREIGN KEY (`Dom_ID`) REFERENCES `dominio` (`Dom_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `dominio` (
  `Dom_ID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Usr_ID` bigint unsigned DEFAULT NULL,
  `Dom_Name` varchar(40) NOT NULL,
  `Dom_Status` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Dom_Expires` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Dom_RenewDeadline` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Dom_TransferAwayEligibleAt` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL,
  `updatedAt` timestamp NOT NULL,
  PRIMARY KEY (`Dom_ID`),
  UNIQUE KEY `Dom_ID` (`Dom_ID`),
  UNIQUE KEY `Unique Name` (`Dom_Name`) USING BTREE,
  KEY `Usr_ID` (`Usr_ID`),
  CONSTRAINT `dominio_ibfk_1` FOREIGN KEY (`Usr_ID`) REFERENCES `usuario` (`Usr_ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `instancia` (
  `Ins_ID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Usr_ID` bigint unsigned NOT NULL,
  `Ins_Name` varchar(30) NOT NULL,
  `Ins_Status` varchar(15) NOT NULL,
  `Ins_Expires` timestamp NOT NULL,
  `Ins_RenewDeadline` timestamp NOT NULL,
  `createdAt` timestamp NOT NULL,
  `updatedAt` timestamp NOT NULL,
  PRIMARY KEY (`Ins_ID`),
  UNIQUE KEY `Ins_ID` (`Ins_ID`),
  KEY `Usr_ID` (`Usr_ID`),
  CONSTRAINT `instancia_ibfk_1` FOREIGN KEY (`Usr_ID`) REFERENCES `usuario` (`Usr_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `transaccion` (
  `Tra_ID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Usr_ID` bigint unsigned DEFAULT NULL,
  `Tra_Concept` varchar(25) NOT NULL,
  `Tra_PaymentMethod` varchar(30) NOT NULL,
  `Tra_Status` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Tra_Amount` double NOT NULL,
  `createdAt` timestamp NOT NULL,
  `updatedAt` timestamp NOT NULL,
  PRIMARY KEY (`Tra_ID`),
  UNIQUE KEY `Tra_ID` (`Tra_ID`),
  KEY `Usr_ID` (`Usr_ID`),
  CONSTRAINT `transaccion_ibfk_1` FOREIGN KEY (`Usr_ID`) REFERENCES `usuario` (`Usr_ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `usuario` (
  `Usr_ID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Usr_NameFirst` varchar(30) NOT NULL,
  `Usr_NameLast` varchar(30) NOT NULL,
  `Usr_Address1` varchar(40) NOT NULL,
  `Usr_Address2` varchar(40) DEFAULT NULL,
  `Usr_City` varchar(20) NOT NULL,
  `Usr_Country` varchar(2) NOT NULL,
  `Usr_PostalCode` varchar(8) NOT NULL,
  `Usr_State` varchar(20) NOT NULL,
  `Usr_Email` varchar(50) NOT NULL,
  `Usr_Phone` varchar(16) NOT NULL,
  `createdAt` timestamp NOT NULL,
  `updatedAt` timestamp NOT NULL,
  PRIMARY KEY (`Usr_ID`),
  UNIQUE KEY `Usr_ID` (`Usr_ID`),
  UNIQUE KEY `UNIQUE_PHONE` (`Usr_Phone`) USING BTREE,
  UNIQUE KEY `UNIQUE_EMAIL` (`Usr_Email`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `dominio` (`Dom_ID`, `Usr_ID`, `Dom_Name`, `Dom_Status`, `Dom_Expires`, `Dom_RenewDeadline`, `Dom_TransferAwayEligibleAt`, `createdAt`, `updatedAt`) VALUES
(2, 3, 'j0n4th4nmtzbe110.com', NULL, NULL, NULL, NULL, '2021-07-13 19:33:44', '2021-07-13 19:33:44'),
(4, 6, 'j0nathanmtzbello.com', NULL, NULL, NULL, NULL, '2021-07-14 12:05:51', '2021-07-14 12:05:51'),
(5, 6, '000000now.biz', NULL, NULL, NULL, NULL, '2021-07-14 12:06:51', '2021-07-14 12:06:51'),
(6, 6, 'j0n4th4nmtzb3110.com', NULL, NULL, NULL, NULL, '2021-07-14 12:07:51', '2021-07-14 12:07:51'),
(7, 6, 'j0n4thanmtzbe110.com', NULL, NULL, NULL, NULL, '2021-07-14 12:08:51', '2021-07-14 12:08:51'),
(8, 6, 'j0nathanmtzbe110.com', NULL, NULL, NULL, NULL, '2021-07-14 12:09:51', '2021-07-14 12:09:51'),
(9, 3, 'j0nathanmtzbell0.com', NULL, NULL, NULL, NULL, '2021-07-14 12:10:51', '2021-07-14 12:10:51'),
(10, 6, 'jonaamtz.com', NULL, NULL, NULL, NULL, '2021-07-14 12:11:51', '2021-07-14 12:11:51'),
(11, 3, 'jonamtz.com', NULL, NULL, NULL, NULL, '2021-07-14 12:12:51', '2021-07-14 12:12:51'),
(12, 6, 'jonathanmtz.com', NULL, NULL, NULL, NULL, '2021-07-14 12:13:51', '2021-07-14 12:13:51'),
(13, 6, 'jonathanmtzb.com', NULL, NULL, NULL, NULL, '2021-07-14 12:14:51', '2021-07-14 12:14:51'),
(14, 6, 'jonathanmtzbe.com', NULL, NULL, NULL, NULL, '2021-07-14 12:15:51', '2021-07-14 12:15:51'),
(15, 6, 'jonathanmtzbel.com', NULL, NULL, NULL, NULL, '2021-07-14 12:16:51', '2021-07-14 12:16:51'),
(16, 3, 'jonathanmtzbell.com', NULL, NULL, NULL, NULL, '2021-07-14 12:17:51', '2021-07-14 12:17:51'),
(17, 3, 'jonathanmtzbell0.com', NULL, NULL, NULL, NULL, '2021-07-14 12:18:51', '2021-07-14 12:18:51'),
(18, 6, 'jonathanmtzbello.com', 'ACTIVE', '2022-07-13T21:17:50.000Z', '2022-08-27T14:17:48.000Z', '2021-09-11T21:17:50.000Z', '2021-07-14 12:19:51', '2021-07-15 14:27:15'),
(19, 3, 'jonmtz.com', NULL, NULL, NULL, NULL, '2021-07-14 12:20:51', '2021-07-14 12:20:51'),
(20, 6, 'mbdevelop.com', NULL, NULL, NULL, NULL, '2021-07-14 12:21:51', '2021-07-14 12:21:51'),
(21, 3, 'mbdevelops.com', NULL, NULL, NULL, NULL, '2021-07-14 12:22:51', '2021-07-14 12:22:51'),
(22, 6, 'j0nathanmtz.com', NULL, NULL, NULL, NULL, '2021-07-14 12:22:51', '2021-07-14 12:22:51'),
(23, 6, 'j0nathan.com', NULL, NULL, NULL, NULL, '2021-07-14 13:50:28', '2021-07-14 13:50:28');

INSERT INTO `usuario` (`Usr_ID`, `Usr_NameFirst`, `Usr_NameLast`, `Usr_Address1`, `Usr_Address2`, `Usr_City`, `Usr_Country`, `Usr_PostalCode`, `Usr_State`, `Usr_Email`, `Usr_Phone`, `createdAt`, `updatedAt`) VALUES
(1, 'Jonathan', 'Martinez', 'Via Atlixcayotl 5307', 'Torre B quinto piso', 'Puebla', 'MX', '72836', 'Puebla', 'jon.rocafunnels@gmail.com', '7471505833', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Jonathan', 'Martinez', 'Boulevard Atlixcayotl 5307', 'Torre B quinto piso', 'Puebla', 'MX', '72836', 'Puebla', 'prueba1@mail.com', '1231231231', '2021-07-12 18:27:15', '2021-07-12 18:27:15'),
(3, 'Jonathan', 'Martinez', 'Boulevard Atlixcayotl 5307', 'Torre B quinto piso', 'Puebla', 'MX', '72836', 'Puebla', 'prueba2@mail.com', '1231231232', '2021-07-12 18:30:23', '2021-07-12 18:30:23'),
(4, 'Jonathan', 'Martinez', 'Boulevard Atlixcayotl 5307', 'Torre B quinto piso', 'Puebla', 'MX', '72836', 'Puebla', 'prueba3@mail.com', '1231231233', '2021-07-12 18:31:03', '2021-07-12 18:31:03'),
(5, 'Jonathan', 'Martinez', 'Boulevard Atlixcayotl 5307', 'Torre B quinto piso', 'Puebla', 'MX', '72836', 'Puebla', 'prueba4@mail.com', '1231231234', '2021-07-12 18:32:16', '2021-07-12 18:32:16'),
(6, 'Jonathan', 'Martinez', 'Boulevard Atlixcayotl 5307', 'Torre B quinto piso', 'Puebla', 'MX', '72836', 'Puebla', 'prueba5@mail.com', '1231231235', '2021-07-12 18:37:07', '2021-07-12 18:37:07'),
(7, 'Jonathan', 'Martinez', 'Boulevard Atlixcayotl 5307', 'Torre B quinto piso', 'Puebla', 'MX', '72836', 'Puebla', 'prueba6@mail.com', '1231231236', '2021-07-12 18:43:41', '2021-07-12 18:43:41'),
(8, 'Jonathan', 'Martinez', 'Boulevard Atlixcayotl 5307', 'Torre B quinto piso', 'Puebla', 'MX', '72836', 'Puebla', 'prueba7@mail.com', '1231231237', '2021-07-12 18:47:21', '2021-07-12 18:47:21');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;