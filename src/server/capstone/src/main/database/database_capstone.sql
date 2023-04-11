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
INSERT INTO `book_category` VALUES (1,'thieunhi'),(57,'thieunhi'),(1,'truyen'),(57,'truyen');
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
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'Tô Hoài','Diễn biến tâm trạng nhân vật dế mèn, ...','Dế Mèn phưu lưu ký',10,2000,'NXB Kim Đồng',0,'admin',10,0),(57,'vnkk','GhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhhGhkjhjjkjjjjhhhhh[Ký gửi]','duyanh 4',20,0,'fhjj',0,'son',100,100);
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
  PRIMARY KEY (`name_code`),
  UNIQUE KEY `name_code_UNIQUE` (`name_code`)
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
-- Table structure for table `configuration`
--

DROP TABLE IF EXISTS `configuration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configuration` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key_cfg` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `value_cfg` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key_cfg_UNIQUE` (`key_cfg`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuration`
--

LOCK TABLES `configuration` WRITE;
/*!40000 ALTER TABLE `configuration` DISABLE KEYS */;
INSERT INTO `configuration` VALUES (1,'discount',40),(2,'days',3);
/*!40000 ALTER TABLE `configuration` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manager_post`
--

LOCK TABLES `manager_post` WRITE;
/*!40000 ALTER TABLE `manager_post` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (134,'2023-03-29 20:52:48','son đã đặt hàng có MĐH: CS110 và thanh toán thành công.','admin',0),(135,'2023-03-29 20:52:48','Chờ xác nhận đơn hàng có MĐH: CS110','son',0),(136,'2023-03-29 20:53:36','son đã đặt hàng có MĐH: CS110 và thanh toán thành công.','admin',0),(137,'2023-03-29 20:53:36','Chờ xác nhận đơn hàng có MĐH: CS110','son',0),(138,'2023-03-29 20:55:11','son đã đặt hàng có MĐH: CS110 và thanh toán thành công.','admin',0),(139,'2023-03-29 20:55:11','Chờ xác nhận đơn hàng có MĐH: CS110','son',0),(140,'2023-03-29 21:14:35','Admin đã chấp nhận việc ký gửi sách của bạn.','son',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
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
  `transfer_amount` int NOT NULL,
  `content` longtext,
  PRIMARY KEY (`id`),
  KEY `FKfgpy0aqmx4gil04lu2hdxp8gk` (`manager_id`),
  KEY `FKmi2669nkjesvp7cd257fptl6f` (`user_id`),
  CONSTRAINT `FKfgpy0aqmx4gil04lu2hdxp8gk` FOREIGN KEY (`manager_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKmi2669nkjesvp7cd257fptl6f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (2,'admin','son','2023-03-24 22:02:24',1000000,'Tài khoản son đã được nạp thêm 1000000vnd. Số dư hiện tại là 3147930vnd.'),(3,'admin','son','2023-03-24 22:03:51',1000000,'Tài khoản son đã được nạp thêm 1000000vnd. Số dư hiện tại là 4147930vnd.');
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
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vi_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (115,'2023-03-25 09:38:03','2023-03-25 09:42:44',16,NULL,'AAAA','son',120,100,'AAAAAA');
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
    SET @USER_POST_IS_EXPIRED 	     = 512;
    SET @MANAGER		     = 3;
	SELECT user_id INTO @username FROM Orders where post_id = OLD.id;

    -- Xử lý hết hạn ký gửi sách
    begin
	DECLARE pBookId, subQ int;
	DECLARE done INT DEFAULT FALSE;
	DECLARE cur CURSOR FOR select sublet, quantity from post_detail where  post_id = OLD.id and sublet > 0;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
	open cur;
	read_loop: LOOP
		FETCH cur INTO pBookId, subQ;
		IF done THEN
		  LEAVE read_loop;
		END IF;
		if(OLD.status = @USER_POST_IS_APPROVED AND NEW.status = @USER_POST_IS_EXPIRED) THEN
			update books set quantity = (quantity + subQ) where id = pBookId;
    		END IF;
	END LOOP;	
	CLOSE cur;
    end;
    
    begin
	DECLARE manager VARCHAR(255);
	DECLARE done INT DEFAULT FALSE;
	DECLARE cur CURSOR FOR select user_id from User_role where role_id = @MANAGER;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
	open cur;
	read_loop: LOOP
		FETCH cur INTO manager;
		IF done THEN
		  LEAVE read_loop;
		END IF;
		if(OLD.status = @ADMIN_POST AND NEW.status = @USER_PAYMENT_SUCCESS) THEN
			INSERT INTO `capstone_db`.`notification`(`created_date`,`description`,`user_id`,`status`)
				VALUES (now(),  concat_ws('', @username, ' đã đặt hàng có MĐH: CS', OLD.id,' và thanh toán thành công. Vui lòng xác nhận.'), manager, 0);
		elseif(OLD.status = @USER_POST_IS_APPROVED AND NEW.status = @USER_POST_IS_EXPIRED) THEN
			INSERT INTO `capstone_db`.`notification`(`created_date`,`description`,`user_id`,`status`)
				VALUES (now(),  concat_ws('', 'Chờ xác nhận lấy sách khi hết thời gian ký gửi MĐH: CS', OLD.id), manager, 0);
    		END IF;
	END LOOP;
	CLOSE cur;
    end;
    If(OLD.status = @USER_POST_IS_NOT_APPROVED AND NEW.status = @USER_POST_IS_APPROVED) THEN
		INSERT INTO `capstone_db`.`notification`(`created_date`,`description`,`user_id`,`status`)
			VALUES (now(), 'Admin đã chấp nhận việc ký gửi sách của bạn.', OLD.user_id, 0);
	elseif(OLD.status = @USER_POST_IS_NOT_APPROVED AND NEW.status = @USER_REQUEST_IS_DENY) THEN
		INSERT INTO `capstone_db`.`notification`(`created_date`,`description`,`user_id`,`status`)
			VALUES (now(),  'Admin đã từ chối việc ký gửi sách của bạn.', OLD.user_id, 0);
	elseif(OLD.status = @ADMIN_POST AND NEW.status = @USER_PAYMENT_SUCCESS) THEN
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
	elseif(OLD.status = @USER_POST_IS_APPROVED AND NEW.status = @USER_POST_IS_EXPIRED) THEN
		INSERT INTO `capstone_db`.`notification`(`created_date`,`description`,`user_id`,`status`)
			VALUES (now(),  concat_ws('', 'Đã hết thời gian ký gửi MĐH: CS', OLD.id,' vui lòng liên hệ admin để lấy lại sách.'), OLD.user_id, 0);
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
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_detail`
--

LOCK TABLES `post_detail` WRITE;
/*!40000 ALTER TABLE `post_detail` DISABLE KEYS */;
INSERT INTO `post_detail` VALUES (111,1,115,100,57);
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
INSERT INTO `user_role` VALUES ('admin',1),('admin',2),('admin',4),('admin',5),('son',2);
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
INSERT INTO `users` VALUES ('admin','Ha noi',9910,'admin@gmail.com','son','nguyen',NULL,'2023-03-13 22:17:32','$2a$10$s1ocjk8P0DfqNHEoWLAP3OVl/d311OhyOKgZm6dwMTws0c14K.2UO','012345678',32),('son','Vinh Phuc',4165270,'admin4@gmail.com','son','nguyen',NULL,'2023-03-13 22:14:50','$2a$10$d9.uHKU8XOjk37sroDVdK.ZkGByKQ3m.3FwBTgt1eugs2nU5v.43i','012345678',32),('sonn','Vĩnh Phúc',10000,'nguyenson98.ylvp@gmail.com','son','nguyen',NULL,NULL,'$2a$10$T9IajOaDq983xowNi8RC1e6elVPqZiDToZJKXmy8oMJZw1Jgo5lqG','012345678',32);
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `users_BEFORE_DELETE` BEFORE DELETE ON `users` FOR EACH ROW BEGIN
	delete from user_role where user_id = OLD.id;
    delete from notification where user_id = OLD.id;
    delete from payment where user_id = OLD.id;
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
/*!50106 SET @save_time_zone= @@TIME_ZONE */ ;
/*!50106 DROP EVENT IF EXISTS `check_expired_day` */;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8mb4 */ ;;
/*!50003 SET character_set_results = utf8mb4 */ ;;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`localhost`*/ /*!50106 EVENT `check_expired_day` ON SCHEDULE EVERY 1 DAY STARTS '2023-04-06 19:49:03' ON COMPLETION NOT PRESERVE ENABLE COMMENT 'Check your book''s consignment expiration date every day.' DO BEGIN
	-- reset var: pId, uId
	select 0, null into @pId, @uId;

        -- get notify days before expired day
	select `value` into @ntf_day from configuration where `key` = "days";

        SELECT `id`, `user_id` into @pId, @uId  FROM Post where  (SELECT DATE_ADD(created_date, INTERVAL (`no_days` - @ntf_day) DAY))  = now() AND `status` = 16;
        -- select @pId, @uId;
        IF(@pId > 0) THEN
		INSERT INTO `capstone_db`.`notification`(`created_date`,`description`,`user_id`,`status`)
			VALUES (now(),  concat_ws('', 'Thời gian ký gửi MĐH: CS', @pId,' còn ', @ntf_day,' vui lòng liên hệ admin để lấy lại sách.'), @uId, 0);
	End if;
        SET SQL_SAFE_UPDATES = 0;
	Update post Set `status` = 512
		where  (SELECT DATE_ADD(created_date, INTERVAL no_days DAY))  < now() AND `status` = 16;
	SET SQL_SAFE_UPDATES = 1;
END */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
DELIMITER ;
/*!50106 SET TIME_ZONE= @save_time_zone */ ;

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

SET SQL_SAFE_UPDATES = 0;

-- Dump completed on 2023-03-24  3:14:48
