DROP DATABASE IF EXISTS `capstone_db`;
CREATE DATABASE  IF NOT EXISTS `capstone_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `capstone_db`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: capstone_db
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `book_category`
--

DROP TABLE IF EXISTS `book_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_category` (
  `book_id` int NOT NULL,
  `category_id` varchar(255) NOT NULL,
  PRIMARY KEY (`book_id`,`category_id`),
  KEY `FKam8llderp40mvbbwceqpu6l2s` (`category_id`),
  CONSTRAINT `FK7k0c5mr0rx89i8jy5ges23jpe` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `FKam8llderp40mvbbwceqpu6l2s` FOREIGN KEY (`category_id`) REFERENCES `category` (`name_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_category`
--

LOCK TABLES `book_category` WRITE;
/*!40000 ALTER TABLE `book_category` DISABLE KEYS */;
INSERT INTO `book_category` VALUES (53,'KHCN_kinhte'),(52,'tamlinh'),(1,'thieunhi'),(53,'thieunhi'),(54,'thieunhi'),(1,'truyen'),(52,'truyen'),(53,'truyen'),(54,'truyen');
/*!40000 ALTER TABLE `book_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author` varchar(255) DEFAULT NULL,
  `description` longtext,
  `name` varchar(255) DEFAULT NULL,
  `price` int NOT NULL,
  `publish_year` int DEFAULT '1925',
  `publisher` varchar(255) DEFAULT NULL,
  `quantity` int NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `in_stock` int DEFAULT '0',
  `percent` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcykkh3hxh89ammmwch0gw5o1s` (`user_id`),
  CONSTRAINT `FKcykkh3hxh89ammmwch0gw5o1s` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'Tô Hoài','Diễn biến tâm trạng nhân vật dế mèn, ...','Dế Mèn phưu lưu ký',10,2000,'NXB Kim Đồng',10,'admin',1,0),(52,'duyanh','HhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhh','duyanh1234',20,0,'duyanh',10,'son',0,0),(53,'vnkk','GhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhh','duyanh 4',20,0,'fhjj',8957,'son',9,30),(54,'J. K. Rowling',NULL,'Harry potter và hòn đá phù thủy',100000,2019,'NXB Kim Đồng',0,'admin',10,0);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;
ALTER DATABASE `capstone_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `books_BEFORE_DELETE` BEFORE DELETE ON `books` FOR EACH ROW BEGIN
	DELETE FROM `capstone_db`.`book_category`
	WHERE `book_category`.book_id = OLD.id;
    DELETE FROM `capstone_db`.`image`
	WHERE `image`.book_id = OLD.id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `capstone_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci ;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `name_code` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`name_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('chinhtri_phapluat','Chính trị - Pháp luật'),('giaotrinh','Giáo trình'),('KHCN_kinhte','Khoa học công nghệ - Kinh tế'),('tamlinh','Tâm linh'),('thieunhi','Thiếu nhi'),('tieuthuyet','Tiểu thuyết'),('truyen','Truyện'),('truyen_cuoi','Truyện cười'),('VHNT','Văn học nghệ thuật'),('VHXH_lichsu','Văn hóa xã hội - Lịch sử');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favourite_book`
--

DROP TABLE IF EXISTS `favourite_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favourite_book` (
  `user_id` varchar(255) NOT NULL,
  `book_id` int NOT NULL,
  `rating` double NOT NULL,
  PRIMARY KEY (`user_id`,`book_id`),
  KEY `FKldegjt2bi7ijajn7fa94cqu96` (`book_id`),
  CONSTRAINT `FKldegjt2bi7ijajn7fa94cqu96` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `FKoh438e8vwbyo3iv436um0q0uk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favourite_book`
--

LOCK TABLES `favourite_book` WRITE;
/*!40000 ALTER TABLE `favourite_book` DISABLE KEYS */;
/*!40000 ALTER TABLE `favourite_book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `link` longtext,
  `book_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1x4slc19br0o6h6nxmjdkp103` (`book_id`),
  CONSTRAINT `FK1x4slc19br0o6h6nxmjdkp103` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (1,'/images/1678780034379me_m.jpg',1),(54,'/images/1679642426277.png',52),(55,'/images/1679642426292.png',52),(56,'/images/1679642603876.png',53),(57,'/images/1679644420442.jpeg',54),(58,'/images/1679644420447.jpg',54);
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manager_post`
--

DROP TABLE IF EXISTS `manager_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manager_post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` longtext,
  `post_id` int DEFAULT NULL,
  `manager_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6u4bj0ek722dnx1vykkv81qt8` (`post_id`),
  KEY `FKfliw96qdbrvcn14njxqay843m` (`manager_id`),
  CONSTRAINT `FK6u4bj0ek722dnx1vykkv81qt8` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`),
  CONSTRAINT `FKfliw96qdbrvcn14njxqay843m` FOREIGN KEY (`manager_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manager_post`
--

LOCK TABLES `manager_post` WRITE;
/*!40000 ALTER TABLE `manager_post` DISABLE KEYS */;
INSERT INTO `manager_post` VALUES (56,'admin has changed order status with id is 109to Accept.',109,'admin'),(57,'admin has changed order status with id is 109to Accept.',109,'admin'),(58,'admin has changed order status with id is 109to Accept.',109,'admin'),(59,'son has changed order status with id is 110to Accept.',110,'son'),(60,'admin has changed order status with id is 110to Deny.',110,'admin'),(61,'son has changed order status with id is 111to Accept.',111,'son'),(62,'son has changed order status with id is 112to Accept.',112,'son');
/*!40000 ALTER TABLE `manager_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` longtext,
  `created_date` datetime DEFAULT NULL,
  `usera_id` varchar(255) NOT NULL,
  `userb_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9x3i8ueh8l9bs0a8v9wat1qoq` (`usera_id`),
  KEY `FK58l2h5ehlsb53261i1kri0x0t` (`userb_id`),
  CONSTRAINT `FK58l2h5ehlsb53261i1kri0x0t` FOREIGN KEY (`userb_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK9x3i8ueh8l9bs0a8v9wat1qoq` FOREIGN KEY (`usera_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,'Hi','2023-03-06 01:56:20','userA','admin'),(2,'Hi. Can i help u?','2023-03-06 01:56:24','admin','userA'),(3,'I want to learn more about Vietnamese.','2023-03-06 01:56:26','userA','admin'),(4,'Haha','2023-03-06 03:32:03','admin','userA');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `description` longtext,
  `user_id` varchar(255) DEFAULT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKnk4ftb5am9ubmkv1661h15ds9` (`user_id`),
  CONSTRAINT `FKnk4ftb5am9ubmkv1661h15ds9` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (1,'2023-03-22 23:33:43','test','admin',0),(2,'2023-03-22 23:34:44','son đã yêu cầu ký gửi sách.','admin',1),(3,'2023-03-22 23:36:28','son đã yêu cầu ký gửi sách.','admin',1),(4,'2023-03-23 20:01:03','Tài khoản của bạn đã được công thêm 1000000 vnd. Số dư hiện tại là 2009520 vnd.','son',0),(5,'2023-03-23 20:18:24','son đã yêu cầu ký gửi sách.','admin',0),(6,'2023-03-23 20:27:16','Admin đã chấp nhận việc ký gửi sách của bạn.','son',0),(7,'2023-03-23 21:41:14','son đã đặt hàng có MĐH: CS91 và thanh toán thành công.','son',0),(8,'2023-03-23 21:41:14','Chờ xác nhận đơn hàng có MĐH: CS91','son',0),(9,'2023-03-23 21:45:43','son đã đặt hàng có MĐH: CS92 và thanh toán thành công.','admin',0),(10,'2023-03-23 21:45:43','Chờ xác nhận đơn hàng có MĐH: CS92','son',0),(11,'2023-03-23 21:50:22','Admin đã xác nhận đơn hàng có MĐH: CS90 của bạn.','son',0),(12,'2023-03-23 22:12:15','Admin đã xác nhận đơn hàng có MĐH: CS91 của bạn.','son',0),(13,'2023-03-23 22:13:00','Xác nhận đã lấy hàng thành công. MĐH: CS90','son',0),(14,'2023-03-23 22:13:00','Xác nhận đã giao hàng thành công. MĐH: CS90','admin',0),(15,'2023-03-24 00:00:15','son đã đặt hàng có MĐH: CS93 và thanh toán thành công.','admin',0),(16,'2023-03-24 00:00:15','Chờ xác nhận đơn hàng có MĐH: CS93','son',0),(17,'2023-03-24 00:07:15','Admin đã xác nhận đơn hàng có MĐH: CS93 của bạn.','son',0),(18,'2023-03-24 00:07:45','Xác nhận đã lấy hàng thành công. MĐH: CS93','son',0),(19,'2023-03-24 00:07:45','Xác nhận đã giao hàng thành công. MĐH: CS93','admin',0),(20,'2023-03-24 00:10:28','Tài khoản của bạn đã được công thêm 10 vnd. Số dư hiện tại là 9910 vnd.','admin',0),(21,'2023-03-24 00:10:28','Admin đã xác nhận việc hoàn sách của bạn.','son',0),(22,'2023-03-24 00:14:46','admin đã đặt hàng có MĐH: CS94 và thanh toán thành công.','admin',0),(23,'2023-03-24 00:14:46','Chờ xác nhận đơn hàng có MĐH: CS94','admin',0),(24,'2023-03-24 00:15:03','Tài khoản của bạn đã được công thêm 2000 vnd. Số dư hiện tại là 9910 vnd.','admin',0),(25,'2023-03-24 00:15:03','Admin đã hủy đơn hàng của bạn.','admin',0),(26,'2023-03-24 00:25:19','son đã yêu cầu ký gửi sách.','admin',0),(27,'2023-03-24 00:25:44','Admin đã chấp nhận việc ký gửi sách của bạn.','son',0),(28,'2023-03-24 00:46:58','son đã đặt hàng có MĐH: CS96 và thanh toán thành công.','admin',0),(29,'2023-03-24 00:46:58','Chờ xác nhận đơn hàng có MĐH: CS96','son',0),(30,'2023-03-24 00:48:49','Admin đã xác nhận đơn hàng có MĐH: CS96 của bạn.','son',0),(31,'2023-03-24 00:53:48','son đã yêu cầu ký gửi sách.','admin',0),(32,'2023-03-24 00:54:51','Admin đã chấp nhận việc ký gửi sách của bạn.','son',0),(33,'2023-03-24 00:58:31','Admin đã chấp nhận việc ký gửi sách của bạn.','son',0),(34,'2023-03-24 01:20:28','son đã yêu cầu ký gửi sách.','admin',0),(35,'2023-03-24 01:24:23','son đã yêu cầu ký gửi sách.','admin',0),(36,'2023-03-24 01:28:24','son đã yêu cầu ký gửi sách.','admin',0),(37,'2023-03-24 01:29:56','Admin đã chấp nhận việc ký gửi sách của bạn.','son',0),(38,'2023-03-24 01:34:02','son đã đặt hàng có MĐH: CS102 và thanh toán thành công.','admin',0),(39,'2023-03-24 01:34:02','Chờ xác nhận đơn hàng có MĐH: CS102','son',0),(40,'2023-03-24 01:36:26','Admin đã xác nhận đơn hàng có MĐH: CS102 của bạn.','son',0),(41,'2023-03-24 01:38:44','Admin đã xác nhận đơn hàng có MĐH: CS102 của bạn.','son',0),(42,'2023-03-24 01:40:22','Tài khoản của bạn đã được công thêm 32000000 vnd. Số dư hiện tại là 33881050 vnd.','son',0),(43,'2023-03-24 01:40:26','Admin đã xác nhận đơn hàng có MĐH: CS102 của bạn.','son',0),(44,'2023-03-24 01:43:58','Tài khoản của bạn đã được công thêm 32000000 vnd. Số dư hiện tại là 65881050 vnd.','son',0),(45,'2023-03-24 01:46:08','Admin đã xác nhận đơn hàng có MĐH: CS102 của bạn.','son',0),(46,'2023-03-24 01:53:39','Tài khoản của bạn đã được công thêm 32000000 vnd. Số dư hiện tại là 97881050 vnd.','son',0),(47,'2023-03-24 01:53:39','Admin đã xác nhận đơn hàng có MĐH: CS102 của bạn.','son',0),(48,'2023-03-24 01:54:48','son đã yêu cầu ký gửi sách.','admin',0),(49,'2023-03-24 01:55:26','Admin đã chấp nhận việc ký gửi sách của bạn.','son',0),(50,'2023-03-24 02:06:26','son đã yêu cầu ký gửi sách.','admin',0),(51,'2023-03-24 02:06:56','Admin đã chấp nhận việc ký gửi sách của bạn.','son',1),(52,'2023-03-24 02:08:46','son đã đặt hàng có MĐH: CS105 và thanh toán thành công.','admin',0),(53,'2023-03-24 02:08:46','Chờ xác nhận đơn hàng có MĐH: CS105','son',1),(54,'2023-03-24 02:11:15','Tài khoản của bạn đã được công thêm 60000 vnd. Số dư hiện tại là 158960 vnd.','son',1),(55,'2023-03-24 02:11:15','Admin đã xác nhận đơn hàng có MĐH: CS105 của bạn.','son',1),(56,'2023-03-24 02:25:51','Admin đã xác nhận đơn hàng có MĐH: CS105 của bạn.','son',0),(57,'2023-03-24 02:27:26','Tài khoản của bạn đã được công thêm 1800 vnd. Số dư hiện tại là 159720 vnd.','son',0),(58,'2023-03-24 02:27:26','Admin đã xác nhận đơn hàng có MĐH: CS104 của bạn.','son',0),(59,'2023-03-24 02:28:46','Tài khoản của bạn đã được công thêm 1800 vnd. Số dư hiện tại là 161520 vnd.','son',0),(60,'2023-03-24 02:28:46','Admin đã xác nhận đơn hàng có MĐH: CS104 của bạn.','son',0),(61,'2023-03-24 02:29:53','son đã yêu cầu ký gửi sách.','admin',0),(62,'2023-03-24 02:30:33','Admin đã chấp nhận việc ký gửi sách của bạn.','son',0),(63,'2023-03-24 02:32:19','son đã đặt hàng có MĐH: CS107 và thanh toán thành công.','admin',0),(64,'2023-03-24 02:32:19','Chờ xác nhận đơn hàng có MĐH: CS107','son',0),(65,'2023-03-24 02:35:06','Admin đã xác nhận đơn hàng có MĐH: CS107 của bạn.','son',0),(66,'2023-03-24 02:42:35','son đã đặt hàng có MĐH: CS108 và thanh toán thành công.','admin',0),(67,'2023-03-24 02:42:35','Chờ xác nhận đơn hàng có MĐH: CS108','son',0),(68,'2023-03-24 02:43:02','Admin đã xác nhận đơn hàng có MĐH: CS108 của bạn.','son',0),(69,'2023-03-24 02:45:21','son đã đặt hàng có MĐH: CS109 và thanh toán thành công.','admin',0),(70,'2023-03-24 02:45:21','Chờ xác nhận đơn hàng có MĐH: CS109','son',0),(71,'2023-03-24 02:47:54','Tài khoản của bạn đã được công thêm 600 vnd. Số dư hiện tại là 159000 vnd.','son',0),(72,'2023-03-24 02:47:54','Admin đã xác nhận đơn hàng có MĐH: CS109 của bạn.','son',0),(73,'2023-03-24 02:51:11','Xác nhận đã lấy hàng thành công. MĐH: CS109','son',0),(74,'2023-03-24 02:51:11','Xác nhận đã giao hàng thành công. MĐH: CS109','admin',0),(75,'2023-03-24 02:51:19','Tài khoản của bạn đã được công thêm 20 vnd. Số dư hiện tại là 159020 vnd.','son',0),(76,'2023-03-24 02:51:19','Admin đã xác nhận việc hoàn sách của bạn.','son',0),(77,'2023-03-24 02:52:53','son đã đặt hàng có MĐH: CS110 và thanh toán thành công.','admin',0),(78,'2023-03-24 02:52:53','Chờ xác nhận đơn hàng có MĐH: CS110','son',0),(79,'2023-03-24 02:53:31','Tài khoản của bạn đã được công thêm 1040 vnd. Số dư hiện tại là 159020 vnd.','son',0),(80,'2023-03-24 02:53:31','Admin đã hủy đơn hàng của bạn.','son',0),(81,'2023-03-24 03:02:44','son đã đặt hàng có MĐH: CS111 và thanh toán thành công.','admin',0),(82,'2023-03-24 03:02:44','Chờ xác nhận đơn hàng có MĐH: CS111','son',0),(83,'2023-03-24 03:07:03','son đã đặt hàng có MĐH: CS112 và thanh toán thành công.','admin',0),(84,'2023-03-24 03:07:03','Chờ xác nhận đơn hàng có MĐH: CS112','son',0);
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `borrowed_date` datetime NOT NULL,
  `return_date` datetime NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `discount` int DEFAULT '0',
  `total_price` int NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKa81lufs91i9gxew3whm25d4u0` (`post_id`),
  KEY `FK32ql8ubntj5uh44ph9659tiih` (`user_id`),
  CONSTRAINT `FK32ql8ubntj5uh44ph9659tiih` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKa81lufs91i9gxew3whm25d4u0` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (35,'2023-03-24 02:45:21','2023-04-13 02:45:21',NULL,0,1040,'son',109),(36,'2023-03-24 02:52:54','2023-03-04 08:50:07',NULL,0,1040,'son',110),(37,'2023-03-24 03:02:44','2023-04-03 03:02:44',NULL,0,10050,'son',111),(38,'2023-03-24 03:07:04','2023-04-13 03:07:04',NULL,0,1040,'son',112);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `manager_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `transfer_amount` int NOT NULL,
  `content` longtext,
  `status` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfgpy0aqmx4gil04lu2hdxp8gk` (`manager_id`),
  KEY `FKmi2669nkjesvp7cd257fptl6f` (`user_id`),
  CONSTRAINT `FKfgpy0aqmx4gil04lu2hdxp8gk` FOREIGN KEY (`manager_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKmi2669nkjesvp7cd257fptl6f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `status` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `no_days` int DEFAULT '7',
  `fee` int NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_vi_0900_ai_ci,
  PRIMARY KEY (`id`),
  KEY `FK7ky67sgi7k0ayf22652f7763r` (`user_id`),
  CONSTRAINT `FK7ky67sgi7k0ayf22652f7763r` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vi_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'2023-03-14 00:55:20','2023-03-20 01:20:35',4,'[Cho thuê] Sách','Nha sach tri tue','son',20,10,'Truyện cổ tích Thánh Gióng'),(109,'2023-03-24 02:45:04','2023-03-24 02:51:19',256,'tieu de 14ghvgg','72 Nguyễn Trãi, Thượng Đình, Thanh Xuân, Hà Nội','admin',20,1000,'ShgGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhh'),(110,'2023-03-24 02:52:30','2023-03-24 02:53:31',2,'tieu de 14;hjj','72A Nguyễn Trãi, Thượng Đình, Thanh Xuân, Hà Nội','admin',30,1000,'FvgGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhh'),(111,'2023-03-24 03:01:22','2023-03-24 03:02:44',32,'[Cho thuê] Truyện thiếu nhi',NULL,'admin',10,10000,'Truy?n thi?u nhi'),(112,'2023-03-24 03:06:43','2023-03-24 03:07:04',32,'tieu de 1222','04A Trần Duy Hưng, Trung Hoà, Cầu Giấy, Hà Nội','admin',20,1000,'JxjGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhd');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `post_AFTER_INSERT` AFTER INSERT ON `post` FOR EACH ROW BEGIN
	DECLARE username varchar(255);
	SET username = NEW.user_id;
	If(NEW.status = 4) THEN
		INSERT INTO `capstone_db`.`notification`(`created_date`,`description`,`user_id`,`status`)
		VALUES (now(), CONCAT_WS(' ',NEW.user_id,'đã yêu cầu ký gửi sách.'), "admin", 0);
    End if;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `post_AFTER_UPDATE` AFTER UPDATE ON `post` FOR EACH ROW BEGIN
    SET @ADMIN_POST                  = 0;
    SET @USER_REQUEST_IS_DENY        = 2;
    SET @USER_POST_IS_NOT_APPROVED   = 4;
    SET @ADMIN_DISABLE_POST          = 8;
    SET @USER_POST_IS_APPROVED       = 16;
    SET @USER_PAYMENT_SUCCESS        = 32;
    SET @USER_WAIT_TAKE_BOOK         = 64;
    SET @USER_RETURN_IS_NOT_APPROVED = 128;
    SET @USER_RETURN_IS_APPROVED     = 256;
	SELECT user_id INTO @username FROM Orders where post_id = OLD.id;
    If(OLD.status = @USER_POST_IS_NOT_APPROVED AND NEW.status = @USER_POST_IS_APPROVED) THEN
		INSERT INTO `capstone_db`.`notification`(`created_date`,`description`,`user_id`,`status`)
			VALUES (now(), 'Admin đã chấp nhận việc ký gửi sách của bạn.', OLD.user_id, 0);
	elseif(OLD.status = @USER_POST_IS_NOT_APPROVED AND NEW.status = @USER_REQUEST_IS_DENY) THEN
		INSERT INTO `capstone_db`.`notification`(`created_date`,`description`,`user_id`,`status`)
			VALUES (now(),  'Admin đã từ chối việc ký gửi sách của bạn.', OLD.user_id, 0);
	elseif(OLD.status = @ADMIN_POST AND NEW.status = @USER_PAYMENT_SUCCESS) THEN
		INSERT INTO `capstone_db`.`notification`(`created_date`,`description`,`user_id`,`status`)
			VALUES (now(),  concat_ws('', @username, ' đã đặt hàng có MĐH: CS', OLD.id,' và thanh toán thành công.'), OLD.user_id, 0);
		INSERT INTO `capstone_db`.`notification`(`created_date`,`description`,`user_id`,`status`)
			VALUES (now(),  concat_ws('', 'Chờ xác nhận đơn hàng có MĐH: CS', OLD.id), @username, 0);
	elseif(OLD.status = @USER_PAYMENT_SUCCESS AND NEW.status = @USER_WAIT_TAKE_BOOK) THEN
		INSERT INTO `capstone_db`.`notification`(`created_date`,`description`,`user_id`,`status`)
			VALUES (now(),  concat_ws('', 'Admin đã xác nhận đơn hàng có MĐH: CS', OLD.id ,' của bạn.'), @username, 0);
	elseif(OLD.status = @USER_PAYMENT_SUCCESS AND NEW.status = @USER_REQUEST_IS_DENY) THEN
		INSERT INTO `capstone_db`.`notification`(`created_date`,`description`,`user_id`,`status`)
			VALUES (now(),  'Admin đã hủy đơn hàng của bạn.', @username, 0);
	elseif(OLD.status = @USER_WAIT_TAKE_BOOK AND NEW.status = @USER_RETURN_IS_NOT_APPROVED) THEN
		INSERT INTO `capstone_db`.`notification`(`created_date`,`description`,`user_id`,`status`)
			VALUES (now(),  concat_ws('', 'Xác nhận đã lấy hàng thành công. MĐH: CS', OLD.id), @username, 0);
		INSERT INTO `capstone_db`.`notification`(`created_date`,`description`,`user_id`,`status`)
			VALUES (now(),  concat_ws('', 'Xác nhận đã giao hàng thành công. MĐH: CS', OLD.id), OLD.user_id, 0);
	elseif(OLD.status = @USER_RETURN_IS_NOT_APPROVED AND NEW.status = @USER_RETURN_IS_APPROVED) THEN
		INSERT INTO `capstone_db`.`notification`(`created_date`,`description`,`user_id`,`status`)
			VALUES (now(),  'Admin đã xác nhận việc hoàn sách của bạn.', @username, 0);
    End if;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `post_BEFORE_DELETE` BEFORE DELETE ON `post` FOR EACH ROW BEGIN
	delete from post_detail as pd where pd.post_id = OLD.id;
    delete from manager_post as mp where mp.post_id = OLD.id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `post_detail`
--

DROP TABLE IF EXISTS `post_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sublet` int NOT NULL,
  `post_id` int NOT NULL,
  `quantity` int DEFAULT '1',
  `book_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6li9i4xwinbd19wvh5buy60dh` (`book_id`),
  KEY `FK46mm0e5earch2ws3ffhl533aa` (`post_id`),
  CONSTRAINT `FK46mm0e5earch2ws3ffhl533aa` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`),
  CONSTRAINT `FK6li9i4xwinbd19wvh5buy60dh` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_detail`
--

LOCK TABLES `post_detail` WRITE;
/*!40000 ALTER TABLE `post_detail` DISABLE KEYS */;
INSERT INTO `post_detail` VALUES (105,0,109,2,53),(106,0,110,2,53),(107,0,111,5,1),(108,0,112,2,53);
/*!40000 ALTER TABLE `post_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` longtext,
  `created_date` datetime DEFAULT NULL,
  `status` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type_report` int DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKnuqod1y014fp5bmqjeoffcgqy` (`post_id`),
  KEY `FKide3gruwmi3na8jjsgfs04din` (`created_by`),
  CONSTRAINT `FKide3gruwmi3na8jjsgfs04din` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `FKnuqod1y014fp5bmqjeoffcgqy` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ROLE_ADMIN'),(2,'ROLE_USER'),(3,'ROLE_MANAGER_POST'),(4,'ROLE_MANAGER_MEMBER'),(5,'ROLE_MANAGER_REPORT');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `user_id` varchar(255) NOT NULL,
  `role_id` int NOT NULL,
  KEY `FKt7e7djp752sqn6w22i6ocqy6q` (`role_id`),
  KEY `FKj345gk1bovqvfame88rcx7yyx` (`user_id`),
  CONSTRAINT `FKj345gk1bovqvfame88rcx7yyx` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKt7e7djp752sqn6w22i6ocqy6q` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES ('admin',1),('admin',2),('admin',3),('admin',4),('admin',5),('admin5',1),('admin5',2),('son',2);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `balance` int NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('admin','Ha noi',9910,'admin@gmail.com','son','nguyen',NULL,'2023-03-13 22:17:32','$2a$10$s1ocjk8P0DfqNHEoWLAP3OVl/d311OhyOKgZm6dwMTws0c14K.2UO','012345678',32),('son','Vinh Phuc',147930,'admin4@gmail.com','son','nguyen',NULL,'2023-03-13 22:14:50','$2a$10$d9.uHKU8XOjk37sroDVdK.ZkGByKQ3m.3FwBTgt1eugs2nU5v.43i','012345678',32),('sonn','Vĩnh Phúc',10000,'nguyenson98.ylvp@gmail.com','son','nguyen',NULL,NULL,'$2a$10$T9IajOaDq983xowNi8RC1e6elVPqZiDToZJKXmy8oMJZw1Jgo5lqG','012345678',32);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `users_AFTER_UPDATE` AFTER UPDATE ON `users` FOR EACH ROW BEGIN
	If(NEW.balance > OLD.balance) Then
		INSERT INTO `notification`(`created_date`,`description`,`user_id`,`status`)
		VALUES (now(), CONCAT_WS(' ', 'Tài khoản của bạn đã được công thêm', NEW.balance - OLD.balance, 'vnd. Số dư hiện tại là', NEW.balance, 'vnd.'), OLD.id, 0);
    End if;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `users_BEFORE_DELETE` BEFORE DELETE ON `users` FOR EACH ROW BEGIN
	delete from user_role where user_id = OLD.id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `users_books`
--

DROP TABLE IF EXISTS `users_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_books` (
  `user_id` varchar(255) NOT NULL,
  `books_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`books_id`),
  UNIQUE KEY `UK_7blux4to1yoy8dlwq3kegqsoi` (`books_id`),
  CONSTRAINT `FKddv9o0ehcbpn1xdvypcynju0u` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKjck6upwhlc41ktqa7sg09tge0` FOREIGN KEY (`books_id`) REFERENCES `books` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_books`
--

LOCK TABLES `users_books` WRITE;
/*!40000 ALTER TABLE `users_books` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'capstone_db'
--

--
-- Dumping routines for database 'capstone_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-24  3:14:48
