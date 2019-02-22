-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 22, 2019 at 04:14 AM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mosque_description`
--
CREATE DATABASE IF NOT EXISTS `mosque_description` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mosque_description`;

-- --------------------------------------------------------

--
-- Table structure for table `connection`
--

CREATE TABLE `connection` (
  `precedes` int(11) NOT NULL COMMENT '  First half of the primary key. Foreign key of the mosque that precedes the other in the relationship.',
  `succedes` int(11) NOT NULL COMMENT '  Second half of the primary key. Foreign key of the mosque that succeeded the other in the relationship.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `connection`
--

INSERT INTO `connection` (`precedes`, `succedes`) VALUES
(2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `mosque`
--

CREATE TABLE `mosque` (
  `id` int(11) NOT NULL COMMENT 'Primary key of the mosque.',
  `name` varchar(535) DEFAULT NULL COMMENT '  Name of the mosque.',
  `address` varchar(535) DEFAULT NULL COMMENT '  Street address of the mosque.',
  `phoneNum` varchar(535) DEFAULT NULL COMMENT '  Phone number of the mosque.',
  `website` varchar(535) DEFAULT NULL COMMENT '  URL address of the mosque.',
  `ethnicity` varchar(535) DEFAULT NULL COMMENT 'The primary ethnicity of the mosque.',
  `denomination` varchar(535) DEFAULT NULL COMMENT 'The denomination of the mosque.',
  `incorpDate` date DEFAULT NULL COMMENT 'The date that the mosque was incorporated.',
  `openDate` date DEFAULT NULL COMMENT 'The date that the mosque was opened.',
  `relocDate` date DEFAULT NULL COMMENT '  The date that the mosque was relocated.',
  `dissDate` date DEFAULT NULL COMMENT '  The date that the mosque was dissolved.',
  `fullDesc` longtext COMMENT '  The full description of the mosque.',
  `history` longtext COMMENT '  A description of the history of the mosque.',
  `albumId` varchar(535) DEFAULT NULL COMMENT 'The album id of the Flickr album containing pictures of the mosque.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mosque`
--

INSERT INTO `mosque` (`id`, `name`, `address`, `phoneNum`, `website`, `ethnicity`, `denomination`, `incorpDate`, `openDate`, `relocDate`, `dissDate`, `fullDesc`, `history`, `albumId`) VALUES
(1, 'Albanian Islamic Center', '19775 Harper Avenue Harper Woods, MI', '(313) 884-6676', NULL, 'Historically Albanian, but also mixed', NULL, NULL, '1963-11-03', NULL, NULL, 'The Albanian Islamic Center, built in Harper Woods in 1963, boasts a distinctive Balkan-style dome and minaret. \r\nWith a prayer area, offices, large social hall, classrooms, and kitchen, the mosque serves an old Albanian American community (already well established in the 1940s) and new Muslim immigrants from Albania, Kosovo, Macedonia, and other Balkan countries.\r\n The center provides weekend religious instruction in Arabic, Albanian, and English along with other educational and service programs. The Albanian Islamic Center is open to Muslims from all ethnic backgrounds, but immigrants from Europe and their descendents form its core membership and predominate on its board. \r\n The mosque is unusual for its location in Detroit’s eastern suburbs.', 'Among the oldest mosques in metro Detroit, the Albanian Islamic Center was opened in 1963. \r\nThe Center’s founder and first imam, Vehbi Ismail, came to Detroit in 1949 and established the Albanian American Moslem Society in the same year. The congregation met first at the International Institute of Detroit, moved to a former Armenian church on Hamilton Avenue, and shared prayer space briefly with the American Moslem Society in Dearborn while waiting for their current structure to be completed. \r\nImam Shuajb Gerguri became acting head of the mosque in 1996 upon Imam Ismail’s retirement.', '72157674361260277'),
(2, 'Albanian American Moslem Society', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `connection`
--
ALTER TABLE `connection`
  ADD PRIMARY KEY (`precedes`,`succedes`);

--
-- Indexes for table `mosque`
--
ALTER TABLE `mosque`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `connection`
--
ALTER TABLE `connection`
  ADD CONSTRAINT `HAS_CONNECTION_P` FOREIGN KEY (`precedes`) REFERENCES `mosque` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `HAS_CONNECTION_S` FOREIGN KEY (`succedes`) REFERENCES `mosque` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
