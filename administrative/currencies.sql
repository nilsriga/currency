-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: currencies
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `currency_rates`
--

DROP TABLE IF EXISTS `currency_rates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `currency_rates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `currency` varchar(3) NOT NULL,
  `rate` decimal(15,6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=156 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currency_rates`
--

LOCK TABLES `currency_rates` WRITE;
/*!40000 ALTER TABLE `currency_rates` DISABLE KEYS */;
INSERT INTO `currency_rates` VALUES (63,'2024-10-18 03:00:00','EUR',1.000000),(64,'2024-10-18 03:00:00','USD',1.084700),(65,'2024-10-18 03:00:00','JPY',162.750000),(66,'2024-10-18 03:00:00','BGN',1.955800),(67,'2024-10-18 03:00:00','CZK',25.229000),(68,'2024-10-18 03:00:00','DKK',7.457600),(69,'2024-10-18 03:00:00','GBP',0.831650),(70,'2024-10-18 03:00:00','HUF',400.050000),(71,'2024-10-18 03:00:00','PLN',4.308500),(72,'2024-10-18 03:00:00','RON',4.973300),(73,'2024-10-18 03:00:00','SEK',11.420500),(74,'2024-10-18 03:00:00','CHF',0.940100),(75,'2024-10-18 03:00:00','ISK',149.100000),(76,'2024-10-18 03:00:00','NOK',11.811500),(77,'2024-10-18 03:00:00','TRY',37.197000),(78,'2024-10-18 03:00:00','AUD',1.616500),(79,'2024-10-18 03:00:00','BRL',6.132800),(80,'2024-10-18 03:00:00','CAD',1.496000),(81,'2024-10-18 03:00:00','CNY',7.706500),(82,'2024-10-18 03:00:00','HKD',8.427000),(83,'2024-10-18 03:00:00','IDR',16803.960000),(84,'2024-10-18 03:00:00','ILS',4.022600),(85,'2024-10-18 03:00:00','INR',91.198000),(86,'2024-10-18 03:00:00','KRW',1488.050000),(87,'2024-10-18 03:00:00','MXN',21.407600),(88,'2024-10-18 03:00:00','MYR',4.669100),(89,'2024-10-18 03:00:00','NZD',1.786500),(90,'2024-10-18 03:00:00','PHP',62.359000),(91,'2024-10-18 03:00:00','SGD',1.423500),(92,'2024-10-18 03:00:00','THB',35.996000),(93,'2024-10-18 03:00:00','ZAR',19.076900),(94,'2024-10-21 03:00:00','EUR',1.000000),(95,'2024-10-21 03:00:00','USD',1.085300),(96,'2024-10-21 03:00:00','JPY',162.790000),(97,'2024-10-21 03:00:00','BGN',1.955800),(98,'2024-10-21 03:00:00','CZK',25.268000),(99,'2024-10-21 03:00:00','DKK',7.458700),(100,'2024-10-21 03:00:00','GBP',0.833150),(101,'2024-10-21 03:00:00','HUF',401.600000),(102,'2024-10-21 03:00:00','PLN',4.317500),(103,'2024-10-21 03:00:00','RON',4.972800),(104,'2024-10-21 03:00:00','SEK',11.427500),(105,'2024-10-21 03:00:00','CHF',0.938000),(106,'2024-10-21 03:00:00','ISK',149.300000),(107,'2024-10-21 03:00:00','NOK',11.838000),(108,'2024-10-21 03:00:00','TRY',37.176300),(109,'2024-10-21 03:00:00','AUD',1.623000),(110,'2024-10-21 03:00:00','BRL',6.195300),(111,'2024-10-21 03:00:00','CAD',1.499800),(112,'2024-10-21 03:00:00','CNY',7.719800),(113,'2024-10-21 03:00:00','HKD',8.435100),(114,'2024-10-21 03:00:00','IDR',16816.560000),(115,'2024-10-21 03:00:00','ILS',4.094800),(116,'2024-10-21 03:00:00','INR',91.244000),(117,'2024-10-21 03:00:00','KRW',1495.730000),(118,'2024-10-21 03:00:00','MXN',21.653900),(119,'2024-10-21 03:00:00','MYR',4.674400),(120,'2024-10-21 03:00:00','NZD',1.792000),(121,'2024-10-21 03:00:00','PHP',62.527000),(122,'2024-10-21 03:00:00','SGD',1.424600),(123,'2024-10-21 03:00:00','THB',36.309000),(124,'2024-10-21 03:00:00','ZAR',19.117600),(125,'2024-10-22 03:00:00','EUR',1.000000),(126,'2024-10-22 03:00:00','USD',1.082100),(127,'2024-10-22 03:00:00','JPY',163.220000),(128,'2024-10-22 03:00:00','BGN',1.955800),(129,'2024-10-22 03:00:00','CZK',25.252000),(130,'2024-10-22 03:00:00','DKK',7.457600),(131,'2024-10-22 03:00:00','GBP',0.833400),(132,'2024-10-22 03:00:00','HUF',400.030000),(133,'2024-10-22 03:00:00','PLN',4.317000),(134,'2024-10-22 03:00:00','RON',4.973700),(135,'2024-10-22 03:00:00','SEK',11.400500),(136,'2024-10-22 03:00:00','CHF',0.936500),(137,'2024-10-22 03:00:00','ISK',149.300000),(138,'2024-10-22 03:00:00','NOK',11.823000),(139,'2024-10-22 03:00:00','TRY',37.059900),(140,'2024-10-22 03:00:00','AUD',1.617700),(141,'2024-10-22 03:00:00','BRL',6.163600),(142,'2024-10-22 03:00:00','CAD',1.496400),(143,'2024-10-22 03:00:00','CNY',7.705200),(144,'2024-10-22 03:00:00','HKD',8.411000),(145,'2024-10-22 03:00:00','IDR',16843.320000),(146,'2024-10-22 03:00:00','ILS',4.087100),(147,'2024-10-22 03:00:00','INR',90.971000),(148,'2024-10-22 03:00:00','KRW',1491.660000),(149,'2024-10-22 03:00:00','MXN',21.520200),(150,'2024-10-22 03:00:00','MYR',4.683300),(151,'2024-10-22 03:00:00','NZD',1.787000),(152,'2024-10-22 03:00:00','PHP',62.580000),(153,'2024-10-22 03:00:00','SGD',1.423100),(154,'2024-10-22 03:00:00','THB',36.229000),(155,'2024-10-22 03:00:00','ZAR',19.018400);
/*!40000 ALTER TABLE `currency_rates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (4,1729237554127,'CurrencyRates1729237554127');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-24 15:25:15
