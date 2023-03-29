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
-- Dumping data for table `book_category`
--

LOCK TABLES `book_category` WRITE;
/*!40000 ALTER TABLE `book_category` DISABLE KEYS */;
INSERT INTO `book_category` VALUES (1,'thieunhi'),(1,'truyen');
/*!40000 ALTER TABLE `book_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'Tô Hoài','Diễn biến tâm trạng nhân vật dế mèn, ...','Dế Mèn phưu lưu ký',10,2000,'NXB Kim Đồng',10);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('chinhtri_phapluat','Chính trị - Pháp luật'),('giaotrinh','Giáo trình'),('KHCN_kinhte','Khoa học công nghệ - Kinh tế'),('tamlinh','Tâm linh'),('thieunhi','Thiếu nhi'),('tieuthuyet','Tiểu thuyết'),('truyen','Truyện'),('VHNT','Văn học nghệ thuật'),('VHXH_lichsu','Văn hóa xã hội - Lịch sử');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'Dế mèn phưu lưu ký',NULL,NULL,NULL,0,'[Cho thuê] Sách','admin','userA');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `post_detail`
--

LOCK TABLES `post_detail` WRITE;
/*!40000 ALTER TABLE `post_detail` DISABLE KEYS */;
INSERT INTO `post_detail` VALUES (0.5,_binary '',1,1);
/*!40000 ALTER TABLE `post_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ROLE_ADMIN'),(2,'ROLE_USER'),(3,'ROLE_MANAGER_POST'),(4,'ROLE_MANAGER_MEMBER'),(5,'ROLE_MANAGER_REPORT');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES ('admin',1),('admin',2),('admin',3),('admin',4),('admin',5);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('admin','Ha noi',10000,'admin@gmail.com','son','nguyen',NULL,NULL,'$2a$10$rJ9ZDn7tYqI5TkUth8QKFeEucZCP03drJmeSfiOJi5.CW06J3Myoq','012345678',0),('admin2',NULL,0,'admin2@gmail.com','son','nguyen',NULL,NULL,'$2a$10$fIZkx1UaxjxEMTavL6aso.ZXCjwuAQplIeIUiGmjaug2pV7puhRfC',NULL,0),('admin3',NULL,0,'admin3@gmail.com','son','nguyen',NULL,NULL,'$2a$10$QVpfi9/F2XwXRWS/OFhJBevkcuhWOEnxdYscoN/STeY0lpppdDy6S',NULL,0),('admin4',NULL,10000,'admin4@gmail.com','son','nguyen',NULL,NULL,'$2a$10$xijlfsNP9OMNPcX2vZxwLeB6Y1fDjkQ3kA/ET3EiR6B8KK0050w/i','012345678',0),('userA','Ha noi',10000,'adminA@gmail.com','son','nguyen',NULL,NULL,'$2a$10$OV3.1HIlC//zkvlJ8xr5ZeyivIigMCdg92fhMn4F1HM259ppXnWBq','012345678',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-28 16:31:31
ALTER TABLE `books`
    CHANGE COLUMN `description` `description` LONGTEXT NULL DEFAULT NULL ;

DROP TRIGGER IF EXISTS `books_BEFORE_DELETE`;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `books_BEFORE_DELETE` BEFORE DELETE ON `books` FOR EACH ROW BEGIN
	DELETE FROM `capstone_db`.`book_category`
	WHERE `book_category`.book_id = OLD.id;
    DELETE FROM `capstone_db`.`image`
	WHERE `image`.book_id = OLD.id;
END */;;
DELIMITER ;

ALTER TABLE `capstone_db`.`post`
    ADD COLUMN `address` VARCHAR(255) NULL AFTER `title`;
ALTER TABLE `capstone_db`.`image`
    CHANGE COLUMN `link` `link` LONGTEXT NULL DEFAULT NULL ;


--
-- Table structure for table `post_detail`
--

DROP TABLE IF EXISTS `post_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_detail` (
                               `id` int NOT NULL AUTO_INCREMENT,
                               `fee` double NOT NULL,
                               `sublet` bit(1) NOT NULL,
                               `post_id` int NOT NULL,
                               `quantity` int DEFAULT '1',
                               `book_id` int NOT NULL,
                               PRIMARY KEY (`id`),
                               KEY `FK6li9i4xwinbd19wvh5buy60dh` (`book_id`),
                               KEY `FK46mm0e5earch2ws3ffhl533aa` (`post_id`),
                               CONSTRAINT `FK46mm0e5earch2ws3ffhl533aa` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`),
                               CONSTRAINT `FK6li9i4xwinbd19wvh5buy60dh` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_detail`
--

LOCK TABLES `post_detail` WRITE;
/*!40000 ALTER TABLE `post_detail` DISABLE KEYS */;
INSERT INTO `post_detail` VALUES (0.5,_binary '',1,1,1);
/*!40000 ALTER TABLE `post_detail` ENABLE KEYS */;
UNLOCK TABLES;

-- WW04
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