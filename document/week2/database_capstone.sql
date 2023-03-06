CREATE DATABASE  IF NOT EXISTS `capstone_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `capstone_db`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ligimi_db
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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`name_code`),
  UNIQUE KEY `name_code` (`name_code`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('kinh dị','kinhdi'),('phưu lưu','phuuluu');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group`
--

/* DROP TABLE IF EXISTS `group`; */
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
/* CREATE TABLE `group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `permission` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; */
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

/* LOCK TABLES `group` WRITE; */
-- /*!40000 ALTER TABLE `group` DISABLE KEYS */;
/* INSERT INTO `group` VALUES (1,'ADMINISTRATOR','ADJUST_PRICE,ADJUST_SALE,BLOG,UPDATE_BOOK,UPDATE_CATEGORY,UPDATE_LEADER,UPDATE_SUB_LEADER,UPDATE_EMPLOYEE',NULL,NULL,NULL,NULL),(2,'LEADER','ADJUST_PRICE,ADJUST_SALE,BLOG,UPDATE_BOOK,UPDATE_CATEGORY,UPDATE_SUB_LEADER,\r\nUPDATE_EMPLOYEE',NULL,NULL,NULL,NULL),(3,'SUB_LEADER','BLOG,UPDATE_EMPLOYEE',NULL,NULL,NULL,NULL),(4,'EMPLOYEE','BLOG',NULL,NULL,NULL,NULL); */
-- /*!40000 ALTER TABLE `group` ENABLE KEYS */;
/* UNLOCK TABLES; */

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `user_id` varchar(255) NOT NULL,
  `role_id` varchar(255) NOT NULL,
  KEY `FK80ch3f5u2lu6cxjpdqwt5qhqk` (`role_id`),
  KEY `FK63doayc93flgiq6lrw8dep9gr` (`user_id`),
  CONSTRAINT `FK63doayc93flgiq6lrw8dep9gr` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK80ch3f5u2lu6cxjpdqwt5qhqk` FOREIGN KEY (`role_id`) REFERENCES `roles` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES ('admin','ROLE_ADMIN');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `book_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgpextbyee3uk9u6o2381m7ft1` (`book_id`),
  CONSTRAINT `FKgpextbyee3uk9u6o2381m7ft1` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `description` text DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_notification_user` (`user_id`),
  CONSTRAINT `FK_notification_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (1,'macbook-air-space-gray.jpg',1),(2,'ipad-pro-12-select-202003.png',2);
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_price` double NOT NULL,
  `discount` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_order_user` (`user_id`),
  CONSTRAINT `FK_order_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `quantity` int DEFAULT NULL,
  `order_id` int NOT NULL,
  `book_id` int NOT NULL,
  `borrow_date` datetime DEFAULT NULL,
  `return_date` datetime DEFAULT NULL,
  PRIMARY KEY (`book_id`,`order_id`),
  KEY `FKplam7wxc4tjbgex0xyk8f0qxo` (`order_id`),
  KEY `FKb8bg2bkty0oksa3wiq5mp5qnc` (`book_id`),
  CONSTRAINT `FKb8bg2bkty0oksa3wiq5mp5qnc` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`),
  CONSTRAINT `FKplam7wxc4tjbgex0xyk8f0qxo` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--
DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` double NOT NULL,
  `author` nvarchar(255),
  `category_id` varchar(255) NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `FK1mtsbur82frn64de7balymq9s` (`category_id`),
  CONSTRAINT `FK1mtsbur82frn64de7balymq9s` FOREIGN KEY (`category_id`) REFERENCES `category` (`name_code`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
-- INSERT INTO `book` VALUES (1,'Our thinnest, lightest notebook, completely transformed by the Apple M1 chip. CPU speeds up to 3.5x faster. GPU speeds up to 5x faster. ','MacBook Air',999,NULL,1),(2,'Liquid Retina display','IPad Pro 12.9 inch',535,641,2,NULL,NULL,NULL,NULL,1),(3,'','IPhone 12 mini',699,133,3,NULL,NULL,NULL,NULL,1),(4,'Iphone 11','IPhone 11 64Gb',599,194,3,NULL,NULL,NULL,NULL,1),(5,'iPhone SE packs our powerful A13 Bionic chip into our most popular size at our most affordable price. It’s just what you’ve been waiting for.','IPhone SE 64Gb',399,148,3,NULL,NULL,NULL,NULL,1),(6,'this is macbook','MacBook Pro 16\"',2399,2000,3,NULL,NULL,NULL,NULL,1),(7,'','Áo cưới công chua Gwen',0,0,4,NULL,NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `UK_ofx66keruapi6vyqpv6f2or37` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES ('ROLE_ADMIN'),('ROLE_USER'),
    ('ROLE_MANAGER_POST'),
    ('ROLE_MANAGER_MEMBER'),
    ('ROLE_MANAGER_REPORT');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `status` int DEFAULT '1',
  `address` nvarchar(255) DEFAULT NULL,
  `phone` nvarchar(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES 
('admin','admin@gmail.com','NGUYEN','SON','$2a$10$rJ9ZDn7tYqI5TkUth8QKFeEucZCP03drJmeSfiOJi5.CW06J3Myoq',NULL,NULL,1,NULL,NULL)
,('asd','asd.skyer3@gmail.com','Sơn','Nguyễn','$2a$10$KyhH0QQ/sYUl3FFFrGK3FOW5/pRo2iWBBz5akMxJQ2mbDB7WPV3D.',NULL,NULL,1,NULL,NULL)
,('user','anhsonit1998@gmail.com','Son','Nguyen','$2a$10$0GPewYid8Hsyx.7Y5WVgE.y87B6biEDvy3r1tjyo63GBkS61mydja',NULL,NULL,1,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_user_delete` BEFORE DELETE ON `users` FOR EACH ROW DELETE FROM `group_user_role` 
WHERE group_user_role.user_id = OLD.id */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `viewbookdetail`
--

DROP TABLE IF EXISTS `viewbookdetail`;
/*!50001 DROP VIEW IF EXISTS `viewbookdetail`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
SET character_set_client = @saved_cs_client;

--
-- Dumping routines for database 'ligimi_db'
--

DROP TABLE IF EXISTS `messager`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `userA_id` varchar(255) NOT NULL,
  `userB_id` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_date` datetime DEFAULT NULL,
  PRIMARY KEY (`userB_id`, `userA_id`),
  KEY `FK_orderDetail_user` (`userA_id`),
  KEY `FK_orderDetail_manager` (`userB_id`),
  CONSTRAINT `FK_orderDetail_user` FOREIGN KEY (`userA_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_orderDetail_manager` FOREIGN KEY (`userB_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `post`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `user_id` varchar(255) NOT NULL,
  `manager_id` varchar(255) NOT NULL,
  `title` nvarchar(150) NOT NULL,
  `content` text,
  `created_date` datetime DEFAULT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`user_id`, `manager_id`),
  KEY `FK_post_user` (`user_id`),
  KEY `FK_post_manager` (`manager_id`),
  CONSTRAINT `FK_post_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_post_manager` FOREIGN KEY (`manager_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



DROP TABLE IF EXISTS `report`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` nvarchar(150) NOT NULL,
  `content` text,
  `created_date` datetime DEFAULT NULL,
  `created_by` varchar(255) NOT NULL,
  `type_report` int NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_repost_user` (`created_by`),
  CONSTRAINT `FK_repost_user` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*!40101 SET character_set_client = @saved_cs_client */;
/* {
  user: "A",
  content:"B",
  time: 17:00,
  user:"B",

} */
--
-- Final view structure for view `viewbookdetail`
--

-- Dump completed on 2023-02-19 16:48:32
