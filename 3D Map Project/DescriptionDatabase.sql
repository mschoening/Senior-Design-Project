-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 30, 2019 at 10:10 PM
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
-- Creation: Mar 20, 2019 at 05:15 PM
--

DROP TABLE IF EXISTS `connection`;
CREATE TABLE IF NOT EXISTS `connection` (
  `precedes` int(11) NOT NULL COMMENT '  First half of the primary key. Foreign key of the mosque that precedes the other in the relationship.',
  `succedes` int(11) NOT NULL COMMENT '  Second half of the primary key. Foreign key of the mosque that succeeded the other in the relationship.',
  PRIMARY KEY (`precedes`,`succedes`),
  KEY `HAS_CONNECTION_S` (`succedes`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `connection`
--

INSERT INTO `connection` (`precedes`, `succedes`) VALUES
(8, 9),
(8, 32),
(8, 52),
(8, 59),
(8, 69),
(9, 10),
(9, 57),
(19, 20),
(20, 49),
(21, 22),
(26, 14),
(26, 27),
(30, 12),
(31, 7),
(31, 39),
(31, 40),
(31, 41),
(31, 44),
(41, 36),
(65, 11);

-- --------------------------------------------------------

--
-- Table structure for table `mosque`
--
-- Creation: Mar 20, 2019 at 05:15 PM
--

DROP TABLE IF EXISTS `mosque`;
CREATE TABLE IF NOT EXISTS `mosque` (
  `id` int(11) NOT NULL COMMENT 'Primary key of the mosque.',
  `name` varchar(535) DEFAULT NULL COMMENT '  Name of the mosque.',
  `address` varchar(535) DEFAULT NULL COMMENT '  Street address of the mosque.',
  `phoneNum` varchar(535) DEFAULT NULL COMMENT '  Phone number of the mosque.',
  `website` varchar(535) DEFAULT NULL COMMENT '  URL address of the mosque.',
  `ethnicity` varchar(535) DEFAULT NULL COMMENT 'The primary ethnicity of the mosque.',
  `denomination` varchar(535) DEFAULT NULL COMMENT 'The denomination of the mosque.',
  `incorpDate` varchar(535) DEFAULT NULL COMMENT 'The date that the mosque was incorporated.',
  `openDate` varchar(535) DEFAULT NULL COMMENT 'The date that the mosque was opened.',
  `relocDate` varchar(535) DEFAULT NULL COMMENT '  The date that the mosque was relocated.',
  `dissDate` varchar(535) DEFAULT NULL COMMENT '  The date that the mosque was dissolved.',
  `fullDesc` longtext COMMENT '  The full description of the mosque.',
  `history` longtext COMMENT '  A description of the history of the mosque.',
  `albumId` varchar(535) DEFAULT NULL COMMENT 'The album id of the Flickr album containing pictures of the mosque.',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mosque`
--

INSERT INTO `mosque` (`id`, `name`, `address`, `phoneNum`, `website`, `ethnicity`, `denomination`, `incorpDate`, `openDate`, `relocDate`, `dissDate`, `fullDesc`, `history`, `albumId`) VALUES
(1, 'Abu-Bakr Al-Siddique Islamic Center', '8904 St Aubin St, Hamtramck, MI 48212 Hamtramck', NULL, NULL, 'Yemeni', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'Albanian Islamic Center', '19775 Harper Avenue Harper Woods, MI', '(313) 884-6676', 'http://www.albaniaislamiccenter.com', 'Historically Albanian, but also Mixed Ethnicity', NULL, '1962', 'Nov. 3, 1963', NULL, NULL, 'https://www.flickr.com/photos/biid/2639660403/in/album-72157605999298753/', 'The Albanian Islamic Center, built in Harper Woods in 1963, boasts a distinctive Balkan-style dome and minaret. With a prayer area, offices, large social hall, classrooms, and kitchen, the mosque serves an old Albanian American community (already well established in the 1940s) and new Muslim immigrants from Albania, Kosovo, Macedonia, and other Balkan countries. The center provides weekend religious instruction in Arabic, Albanian, and English along with other educational and service programs. The Albanian Islamic Center is open to Muslims from all ethnic backgrounds, but immigrants from Europe and their descendents form its core membership and predominate on its board. The mosque is unusual for its location in Detroit’s eastern suburbs.', '72157605999298753'),
(3, 'Al-Islah Islamic Center (Jame Masjid) ', '2733 Caniff Street Hamtramck, MI', '(313) 365-9000', 'http://www.ulifeonline.org/', 'Bangladeshi', NULL, '2000', '2002', '2016 - to 11301 Joseph Campau, Hamtramck', NULL, NULL, 'The Al-Islah Islamic Center is open daily for all prayers. The masjid occupies two floors of a building that was previously a medical clinic. It has a separate prayer space for women. The interior decoration is minimal, consisting mostly of a row of arches in the main prayer hall. Al-Islah currently sponsors a weekend Islamic school for children, where Arabic, Bangla, and Qur’an are taught. The congregation also runs a summer school. Adults meet weekly for tafsir (Qur’an study) on Sundays, and youth meetings are held once a month. Women attend the center most frequently for tafsir and special programming. While the mosque was founded by Bangladeshis, it is open to all Muslims. The administration has good relations with the local school board, with other mosques in the area, and with local churches and interfaith coalitions.', '72157605994013282'),
(4, 'Al-Mahdi Islamic Centre', '385 Cameron Avenue Windsor, ON, Canada', '(519) 256-2888', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'Altaqwa Islamic Center', '30069 Cherry Hill Rd Inkster', '(313) 999-6969', 'http://altaqwaislamiccenter.org/', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'Al-Zahraa Islamic Center', '15571 Joy Road Detroit, MI', NULL, NULL, NULL, NULL, '2012', NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'American Islamic Community Center', '27205 Dequindre Road Madison Heights, MI', NULL, 'http://www.aiccmi.com/about-aicc/', 'Lebanese American', NULL, '2003', NULL, NULL, NULL, NULL, NULL, '72157605994779040'),
(8, 'American Moslem Society', '9934 W. Vernor Highway Dearborn, MI', NULL, NULL, NULL, NULL, '1938', NULL, NULL, NULL, NULL, NULL, '72157605999635591'),
(9, 'American Muslim Bekaa Center', '6110 Chase Road Dearborn, MI', NULL, NULL, NULL, NULL, '1979', NULL, NULL, NULL, NULL, NULL, '72157605995255860'),
(10, 'American Muslim Center', '21110 Outer Drive Dearborn, MI', NULL, 'http://www.amcdearborn.com', NULL, NULL, '2002', NULL, NULL, NULL, NULL, NULL, '7.21576E+16'),
(11, 'American Yemeni Islamic Center', '8564 Joseph Campau Hamtramck, MI', '(313) 587-5248', NULL, NULL, NULL, '2004', NULL, NULL, NULL, NULL, NULL, '72157605995568076'),
(12, 'American Muslim Diversity Association', '44760 RYAN RD Sterling Heights', NULL, 'http://www.amda.us/', 'Asian, Bangladeshi', NULL, '2006', '2014', NULL, NULL, NULL, NULL, '72157605995585362'),
(13, 'Anjumane Najmi', '20959 Orchard Lake Rd Farmington Hills', '(248) 478-2001', 'http://www.detroitjamaat.online/', 'Asian, Indian', NULL, NULL, NULL, NULL, NULL, NULL, 'Bohra', NULL),
(14, 'Ar-Rasool Community Center', '8140 Greenfield Road Detroit, MI', NULL, NULL, NULL, NULL, '2001', NULL, NULL, NULL, NULL, NULL, NULL),
(15, 'Association of Islamic Charitable Projects', '5715 N. Inkster Road Garden City, MI', '(734) 523-9940', 'http://aicpmi.org/index.html', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(16, 'Baitul-Islam Jame Masjid', '7826 Klein Street Detroit, MI', NULL, NULL, NULL, NULL, '1995', NULL, NULL, NULL, NULL, NULL, '72157606000394445'),
(17, 'Baitul Ma\'moor Sunni Islamic Center', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(18, 'Baitul Muzaffar (Ahmadiyyah Movement of Michigan)', '8218 Wyoming Street Detroit, MI', '(313) 933-9850', NULL, NULL, NULL, '1979', NULL, NULL, NULL, NULL, NULL, '72157605995732572'),
(19, 'Bosnian American Islamic Center', '3437 Caniff Street Hamtramck, MI', '(313) 891-6192', NULL, 'Bosnian', NULL, '1999', NULL, NULL, NULL, NULL, NULL, '72157605995742790'),
(20, 'Bosnian Islamic Center', '12426 Joseph Campau Hamtramck, MI', NULL, NULL, 'Bosnian', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '72157606559058763'),
(21, 'Dahira Taisiroul Hasir Touba', '27500 Franklin Road Southfield, MI', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '72157606000547697'),
(22, 'Dar Al Salam Islamic Center', 'look up!', NULL, 'http://daiconline.org/', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(23, 'Daru Salam Center (Life for Relief and Development)', '17300 W. 10 Mile Road Southfield, MI', NULL, 'http://www.lifeusa.org/site/PageServer', NULL, NULL, '1992', NULL, NULL, NULL, NULL, NULL, '72157606000619167'),
(24, 'Darul Uloom Michigan (Madani Muslim Community Service)', '2446 E Twelve Mile Rd, Warren', '(313) 445-8827', 'http://www.darululoommi.org/', NULL, NULL, '2014', '2015', NULL, NULL, NULL, NULL, '72157617872143008'),
(25, 'First Albanian Bektashi Monastery', '21749 Northline Road Taylor, MI', '(734) 287-3646', 'http://www.bektashi.net/bio-babarexheb.html', NULL, NULL, '1954', NULL, NULL, NULL, NULL, NULL, '72157606581865831'),
(26, 'Imam Ali Mosque', '16003 W. Warren Avenue Detroit, MI', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '72157606000646197'),
(27, 'Imam Jaafar Al-Sadeq Center', '19111 W Warren Ave  Detroit', '(313) 406-2438', NULL, 'Iraqi', NULL, '2013', '2013', NULL, NULL, NULL, NULL, NULL),
(28, 'Institute of the Holy Quran', 'Dearborn, MI', '(313) 582-7566', NULL, 'Arab', NULL, '2007', NULL, NULL, NULL, NULL, NULL, NULL),
(29, 'Islamic American University Masjid', '23725 Northwestern Highway Southfield, MI', NULL, NULL, NULL, NULL, '2005', NULL, NULL, NULL, NULL, NULL, NULL),
(30, 'Islamic Association of Greater Detroit', '879 W. Auburn Road Rochester Hills, MI', NULL, 'www.iagd.net', NULL, NULL, '1978', NULL, NULL, NULL, NULL, NULL, '72157606000665411'),
(31, 'Islamic Center of America', '19500 Ford Road Dearborn, MI', '(313) 593-0000', 'http://www.icofa.com/', 'Arab', NULL, '1950\'s', NULL, NULL, NULL, NULL, 'The Islamic Center’s new mosque, at 120,000 sq. ft., is grand in comparison to its earlier facility (17,000 sq.ft.), yet both structures are distinctive for the large spaces they set aside for religious and social events. The new mosque includes a vast meeting hall that can be divided into several smaller rooms, an industrial kitchen, a spacious prayer room with a high, calligraphy-decorated dome, a generously proportioned mezzanine for women, offices, meeting rooms, a library, and archival space set aside to document the community’s history in America. Led by Imam Hassan Qazwini, the Islamic Center offers a wide range of religious, educational, and public programs. It is frequently host to interfaith tour groups and visiting dignitaries from around the world. With a congregation of over 3,000 members, the center has long been one of Detroit’s most vibrant and influential Muslim institutions. A calendar of events, lectures by Imam Qazwini, prayer times, programs, and photographs of the new mosque are available at www.icofa.com.', '72157605995958704'),
(32, 'Islamic Center of Detroit', '14350 Tireman Street Detroit, MI', NULL, 'http://www.icd-center.org', 'Arab', NULL, '1998', NULL, NULL, NULL, NULL, NULL, '72157606255830312'),
(33, 'Islamic Center of Hamtramck', '12635 McDougall Street Detroit, MI', NULL, NULL, 'Arab', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '72157606581842535'),
(34, 'Islamic Center of North Detroit (Masjid al-Falah)', '12500 McDougall Street Hamtramck, MI', '(313) 368-5308', 'http://masjidalfalah.org/', 'South Asian', NULL, '1989', '1990', '2006', NULL, NULL, NULL, NULL),
(35, 'Islamic Center of Southfield', '23435 Berg Road Southfield', NULL, NULL, NULL, NULL, '2012', NULL, NULL, NULL, NULL, NULL, NULL),
(36, 'Islamic Council of America', '6941 Schaefer Road Dearborn, MI', '(313) 584-4488', NULL, NULL, NULL, '1989', NULL, NULL, NULL, NULL, NULL, '72157606426830267'),
(37, 'Islamic Cultural Association', '32220 Franklin Road Franklin, MI', '(248) 988-7517', 'http://www.ica-mi.org', 'Syrian', NULL, '1984', NULL, NULL, NULL, NULL, NULL, NULL),
(38, 'Islamic Cultural Institute', '30115 Greater Mack Avenue St. Clair Shores, MI', '(586) 293-5752', 'http://www.ici-online.net', 'Egyptian', NULL, '1993', NULL, NULL, NULL, NULL, NULL, '72157606441742803'),
(39, 'Islamic House of Wisdom', '22575 Ann Arbor Trail Dearborn Heights, MI', '(313) 584-2570', 'www.islamichouseofwisdom.com', NULL, NULL, '1995', NULL, NULL, NULL, NULL, NULL, '72157606441775413'),
(40, 'Islamic Institute of America', '26305 Ford Road Dearborn Heights', '(313) 432-8722', 'http://www.iiofa.org/', 'Lebanese', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(41, 'Islamic Institute of Knowledge', '6345 Schaefer Rd. Dearborn, MI', '(313) 584-2570', 'http://www.iiokonline.org/', NULL, NULL, '1982', NULL, '1998', NULL, NULL, NULL, '72157606578053994'),
(42, 'Islamic Organization of North America', '28654 Ryan Road Warren, MI', '(586) 558-6900', 'http://www.ionaonline.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '72157606438582338'),
(43, 'Jamia Islamia Darul-Uloom Detroit', '5679 Caniff Ave Hamtramck', '(313) 891-3256', NULL, 'Bangladeshi', NULL, '1998', NULL, NULL, NULL, NULL, NULL, NULL),
(44, 'Karbala Islamic Education Center', '15332 W. Warren Avenue Dearborn, MI', NULL, 'www.karbalaa.org', NULL, NULL, '1995', NULL, NULL, NULL, NULL, NULL, '72157606438911028'),
(45, 'Masjid Al-Burhani', '20959 Orchard Lake Road Farmington Hills, MI', '(248) 478-2001', NULL, NULL, NULL, '1988', NULL, NULL, NULL, NULL, NULL, '72157606443379891'),
(46, 'Masjid al-Fatheh (Islamic Center of Warren)', '24703 Ryan Road Warren, MI', '(313) 598-6417', 'http://www.icwweb.org/', 'Bangladeshi', NULL, '2012', '2015', NULL, NULL, NULL, NULL, NULL),
(47, 'Masjid al-Fatiha', '2844 4th Street Detroit, MI', NULL, NULL, 'African American', NULL, '1990', NULL, NULL, NULL, NULL, NULL, '72157606443495273'),
(48, 'Masjid al-Fatimah (Hope Center)', '12818 Joseph Campau Detroit, MI', '(313) 444-4554', 'http://www.masjidfatimah.org/', 'Bangladeshi', NULL, '2003', '2014', NULL, NULL, NULL, NULL, NULL),
(49, 'Masjid al-Furqaan', '27643 Schoenherr Rd Warren, MI', '(248) 495-8742', NULL, 'Bosnian', NULL, '2014', '2015', NULL, NULL, NULL, NULL, NULL),
(50, 'Masjid al-Furqān', '4981 Cabot St Detroit', '(313) 584-4464', 'http://www.quran-institute.org/masjid-furqan', 'Yemeni', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(51, 'Masjid al-Haqq', '4017 Clairmount Street Detroit, MI', NULL, NULL, NULL, NULL, '2009', NULL, NULL, NULL, NULL, NULL, '72157606440039168'),
(52, 'Masjid Al-Hoda', '5838 Lawndale Street Detroit, MI', NULL, NULL, NULL, NULL, '1995', NULL, NULL, NULL, NULL, NULL, '72157617142852840'),
(53, 'Masjid al Ihsan (Ideal Islamic Center)', '2721 Holbrook Hamtramck, MI', '(313) 872-6000', 'http://www.idealislamiccenter.org/', 'Bangladeshi', NULL, '2011', '2011', NULL, NULL, NULL, NULL, NULL),
(54, 'Masjid Al-Nur', '318 Pilgrim Street Highland Park, MI', '(313) 867-9428', NULL, NULL, NULL, '1989', NULL, NULL, NULL, NULL, NULL, NULL),
(55, 'Masjid Al-Nur (Jumaa)', 'MI', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(56, 'Masjid al-Rahma', '7520 Bingham St. Dearborn, MI', NULL, NULL, 'Senegalese', NULL, '2011', '2014', NULL, NULL, NULL, NULL, NULL),
(57, 'Masjid Al-Salam (Dearborn Community Center)', '3900 Schaefer Road Dearborn, MI', NULL, 'http://muslimmedianetwork.com/mmn/?p=6451', 'Mixed', NULL, '2006', '2010', NULL, NULL, NULL, NULL, '72157629939914208'),
(58, 'Masjid As-Salam Islamic Community Center', '21628 Fenkell Street Detroit, MI', NULL, NULL, NULL, NULL, '2008', NULL, '2008', NULL, NULL, NULL, '72157701580804195'),
(59, 'Masjid al-Tawheed', '18624 W. Warren Avenue Detroit, MI', '(313) 271-0731', 'http://www.masjidtawheed.org/First', NULL, NULL, '1995', NULL, NULL, NULL, NULL, NULL, '72157606450530354'),
(60, 'Masjid Baitul Mukarram and Islamic Academy', '12203 Conant Street Hamtramck, MI', '(313) 258 - 1238', 'http://www.baitulmukarrammasjid.org/', NULL, NULL, '2003', '2003', NULL, NULL, NULL, 'This mosque is opened for the five daily prayers and provides Islamic educational services for familys. A major renovation project was completed in 2015, providing much more room for congregational prayers and educational programs. ', NULL),
(61, 'Masjid Bilal/Madrasah Bilal', '4891 W. Michigan Avenue Ypsilanti, MI', NULL, 'http://www.masjidbilalmi.org', NULL, NULL, '1990\'s', NULL, '2007', NULL, NULL, NULL, NULL),
(62, 'Masjid Bilal', '1525 N. Ridge Road Canton, MI', NULL, 'http://www.masjidbilalmi.org', NULL, NULL, '1990\'s', NULL, '2007', NULL, NULL, NULL, NULL),
(63, 'Masjid Madinatul Ilm', '37775 Palmer Road   Westland, MI', NULL, 'http://www.masjidmadinatulilm.com/', 'South Asian', NULL, '2013', '2013', NULL, NULL, NULL, NULL, NULL),
(64, 'Masjid Mahmood', '1445 W. Auburn Road Rochester Hills, MI', NULL, NULL, NULL, NULL, '2008', NULL, NULL, NULL, NULL, NULL, '72157617782205013'),
(65, 'Masjid Mu\'ath Bin Jabal', '4011 Miller Street (6096 Dorothy Street) Detroit, MI', '(313) 571-9502', 'masjidmuath.com', 'Arab', NULL, '1976', NULL, NULL, NULL, NULL, 'Mu‘ath Bin Jabal is a focal point for the growing population of Yemeni immigrants who live along the border of Hamtramck and Detroit. Small shops that cater to Yemenis line the streets next to the mosque. Young men socialize in front of the local grocery, speaking a mélange of Arabic and English, while bicycle brigades of Yemeni children cruise the streets. The neighborhood was blighted and dangerous when Yemenis starting moving there in the 1970s, but the degraded housing stock was cheap. Over the last 20 years, Yemeni workers have bought and repaired dozens of houses and, in increasing numbers, have brought their wives and children to Detroit. Their school, mosque, and stores are the infrastructure of a stable, socially and morally conservative enclave that has excellent relations with the Detroit police, the public school system, and city government, all of whom appreciate the grassroots urban reclamation project the Yemenis are running in their slice of Detroit.', '72157606456919693'),
(66, 'Masjid Nasrullah', '15744 Harper Detroit, MI', NULL, 'http://www.naicom.info/', 'African', NULL, '2007', NULL, '2007', NULL, NULL, NULL, '72157606453712408'),
(67, 'Masjid Saaliheen (American Society of Muslims Masjid of Detroit, Inc.)', '20823 W. Chicago Detroit', NULL, NULL, NULL, NULL, '2000', NULL, NULL, '2010', NULL, NULL, NULL),
(68, 'Masjidun-Nur', '11311 Mound Road Detroit, MI', '(313) 892-5450', 'http://www.masjidunnur.org/', 'South Asian', NULL, '1977 (on Pilgrim in Highland Park)', NULL, NULL, NULL, NULL, NULL, NULL),
(69, 'Masjid Umar bin Khattab', '18105 Racho Road Brownstown, MI', NULL, 'http://brownstown-masjid.com', NULL, NULL, '1994', NULL, NULL, NULL, NULL, NULL, '72157606453736864'),
(70, 'Masjid Uthman bin affan', '21380 Ryan Road Warren, MI', NULL, 'http://uthmanbinaffan.weebly.com/index.html', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(71, 'Masjid Wali Muhammad', '11529 Linwood Avenue Detroit, MI', '(313) 868-2131', NULL, 'African American', NULL, '1954', '1957 (from Black Bottom)', NULL, NULL, NULL, 'Masjid Wali Muhammad is located on the upper level of a two-story building which was originally a Jewish community center. The lower level holds a large kitchen, a computer room, and a spacious meeting/dining room. The masjid is active in the community, holding weekly fundraisers and sponsoring a local soup kitchen. The mosque is attended by a largely African American, native-born congregation and is affiliated with the national leadership of Imam Warith Deen Mohammad. Gary al-Kasib is the mosque’s current imam.', '72157606457406953'),
(72, 'Michigan Islamic Center of U.S.A.', '24134 Warner Warren', NULL, NULL, NULL, NULL, '2009', '2009', NULL, '2012', NULL, NULL, NULL),
(73, 'Mohammadia Madrasha, Inc.', '4514 Garvin Street Detroit, MI', '(313) 369-0677', 'www.madrasha.org', 'South Asian', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(74, 'Moorish Science Temple (#25)', '5601 Grand River Blvd. Detroit, MI', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '72157606454341614'),
(75, 'Muhammad\'s Mosque', '16335 E. Warren Avenue Detroit, MI', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '72157606454454144'),
(76, 'Muhammad\'s Mosque #1', '14880 Wyoming Street Detroit, MI', NULL, NULL, NULL, NULL, '1984', NULL, NULL, NULL, NULL, NULL, '72157606457978313'),
(77, 'Muslim Center of Detroit', '1605 Davison West Detroit, MI', '(313) 883-3330', 'https://muslimcenterdetroit.com/', 'African American', NULL, '1984', NULL, NULL, NULL, NULL, 'The Muslim Center’s new facility includes a large prayer hall, a gym, a social hall, classrooms, a kitchen, and administrative offices. Located in a poor urban neighborhood, the Center has an activeda`wa (missions) board that provides a wide array of services to local families and youth, including counseling, job training, a soup kitchen, and substance abuse programs. Working with New Detroit, Inc., the Muslim Center also provides a summer camp and athletic programs for local young people. Led by Imam Derrick Ali, the center is also active in interfaith work and hosts an annual interfaith Thanksgiving dinner. With a largely African American and African immigrant congregation, the Center is open to all believers and is especially adept at making visitors feel welcome.', '72157606482285772'),
(78, 'Muslim Community Center of Detroit', '13720 W. McNichols Road Detroit, MI', NULL, NULL, 'African', NULL, '2008', NULL, NULL, NULL, NULL, NULL, '72157606486177129'),
(79, 'Muslim Community Mosque (Islamic Cultural Association)', '35700 W. 12 Mile Rd.  Franklin', NULL, 'http://ica-mi.org/', 'Syrian', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(80, 'Muslim Community of Macomb (Baitul M`amur)', '38810 Ryan Road Sterling Heights', '(313) 910 – 4817', 'http://www.muslimcommunitymacomb.org/', NULL, NULL, '2010', NULL, NULL, NULL, NULL, NULL, NULL),
(81, 'Muhammadi Islamic Center', '2075 Fort Street Lincoln Park, MI', '(734) 564-1650', 'http://www.lpmic.com/', NULL, NULL, 'June, 2015', 'June, 2015', NULL, NULL, NULL, NULL, NULL),
(82, 'Muhammadi Masjid and Madrasha', '4541 Garvin Street Detroit, MI', '(313) 377-9245', 'http://www.madrasha.org/', 'Bangladeshi', NULL, NULL, '2008', NULL, NULL, NULL, 'The Quran Learning Center (Muhammadia Madrasha) is a mosque and schools founded in 2002. Located in Detroit on the outskirts of Hamtramck, this center serves one of the largest and most diverse Muslim communities in Michigan. The Quran Learning Center is open for all five daily prayers and provides Qur`an, Tajweed, and Islamic studies programs after school and on weekends. The center also provides  summer intensive courses and support for new Muslims. ', NULL),
(83, 'Muslim Community of the Western Suburbs', '40440 Palmer Canton, MI', '(734) 729-1000', 'http://www.mcws.org', NULL, NULL, '1988', NULL, NULL, NULL, NULL, NULL, '72157606578087416'),
(84, 'Muslim Men in Fellowship Unity', '17935 John R Street Highland Park, MI', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(85, 'Muslim Unity Center', '1830 W. Square Lake Road Bloomfield Hills, MI', '(248) 857-9200', 'http://www.muslimunitycenter.org/', NULL, NULL, '1993', NULL, NULL, NULL, NULL, NULL, '72157606546495841'),
(86, 'The Qur\'an and Sunnah Society', '19800 Van Dyke Detroit, MI', '(313) 893-3763', 'http://www.qss.org/', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(87, 'Tawheed Center', '29707 W. 10 Mile Road Farmington Hills, MI', '(248) 426-7360', 'http://www.tawheedcenter.org', NULL, NULL, '1993', NULL, NULL, NULL, NULL, NULL, '72157606555469302'),
(88, 'Tijani Zawiya', '3777 Parker Street Detroit, MI', NULL, NULL, NULL, NULL, '2001', NULL, NULL, NULL, NULL, NULL, '72157606555439670'),
(89, 'United Masjid Council of Michigan', '2733 Caniff Hamtramck', NULL, NULL, NULL, NULL, '2005', NULL, NULL, NULL, NULL, NULL, NULL),
(90, 'University Islamic Center of Detroit', '4646 Cass Avenue Detroit, MI', '(313) 831-9222', NULL, 'Mixed', NULL, '1979', NULL, NULL, NULL, NULL, NULL, '72157606558938977'),
(91, 'Windsor Islamic Association and Mosque', '1320 Northwood Street Windsor, ON, Canada', '(519) 966-2355', 'http://www.wiao.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(92, 'Zainabia Center', '2230 Crumb Road Walled Lake, MI', '(248) 669-5740', NULL, NULL, NULL, '2007', NULL, NULL, NULL, NULL, NULL, '72157606558604549'),
(93, 'Ahmadiyyah Islamic Center (Historic, 1952)', '1241 Burlingame Detroit, MI', NULL, NULL, NULL, NULL, '1952', NULL, NULL, NULL, NULL, NULL, NULL),
(94, 'Ahmadiyyah Mission (Historic, 1921)', '27 Labelle Street Highland Park, MI', NULL, NULL, NULL, NULL, '1921', NULL, NULL, NULL, NULL, NULL, NULL),
(95, 'Ahmadiyya Mission (Historic, 1953)', '2151 Grand Blvd. Detroit, MI', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(96, 'Ahmadiyyah Moslem Mission (Historic, 1933)', '537 Hendrie Street Detroit, MI', NULL, NULL, NULL, NULL, '1933', NULL, NULL, NULL, NULL, NULL, NULL),
(97, 'Al-Aqabah Islamic Community Center (Historic, 2011)', '12818 Joseph Campau Detroit, MI', NULL, NULL, NULL, NULL, '2009', '2011', NULL, NULL, NULL, NULL, NULL),
(98, 'Albanian American Moslem Society (Historic, 1950\'s)', 'MI', NULL, NULL, NULL, NULL, '1949', '1950', '1963 (See Albanian Islamic Center)', '1959 (See Albanian Islamic Center)', 'https://www.flickr.com/photos/biid/20034065816/in/album-72157605999298753/', NULL, NULL),
(99, 'Allah Temple of Islam (Historic, 1932)', '283 E. Hancock Detroit, MI', NULL, NULL, NULL, NULL, '1932', NULL, NULL, NULL, NULL, NULL, NULL),
(100, 'Al-Mumineen Mosque/Virginia Park (Historic, 1947)', '1554 Virginia Park Avenue Detroit, MI', NULL, NULL, 'African American', NULL, '1947', NULL, '1978', '1981', NULL, NULL, NULL),
(101, 'Al-Mumineen Mosque (Historic, 1980\'s)', '15535 W. McNichols Road Detroit, MI', NULL, NULL, NULL, NULL, '1980\'s', '1980/1981', NULL, '1981', NULL, NULL, NULL),
(102, 'American Islamic Institute (Historic, 1979)', '3642 Karen Pkwy Waterford, MI', NULL, NULL, NULL, NULL, '1979', NULL, NULL, '1990', NULL, NULL, NULL),
(103, 'American Islamic League of Bekaa (Historic, 1979)', '10605 West Warren Dearborn, MI', NULL, NULL, NULL, NULL, '1979', NULL, NULL, '1981', NULL, NULL, NULL),
(104, 'American Muslim Mission Islamic Center (Historic, 1984)', '2940 Mt. Elliot Detroit, MI', NULL, NULL, NULL, NULL, '1984', NULL, NULL, '1990', NULL, NULL, NULL),
(105, 'American Society of Muslims Masjid of Detroit (Historic, early 2000\'s)', '20823 West Chicago Street Detroit, MI', NULL, NULL, NULL, NULL, '2004', NULL, NULL, '2010', NULL, NULL, NULL),
(106, 'Assira Jadeed Society (Historic, 1940\'s)', '2809 Salina Dearborn, MI', NULL, NULL, NULL, NULL, '1940\'s', NULL, NULL, '1950', NULL, NULL, NULL),
(107, NULL, '574 E. Lafayette Avenue Detroit, MI', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(108, 'Detroit Mosque (Historic, 1945-50)', '14075 Dequindre Detroit, MI', NULL, NULL, NULL, NULL, '1945', NULL, NULL, '1950', NULL, NULL, NULL),
(109, 'Hindoo Hall (Historic, 1930\'s-50\'s)', '1003 Hastings Street Detroit, MI', NULL, NULL, NULL, NULL, '1930\'s', NULL, NULL, '1950\'s', NULL, NULL, NULL),
(110, 'Communaute Islamique Africaine: La Paix de Michigan Masjid', '20555 Lahser Rd. Detroit, MI', NULL, NULL, NULL, NULL, '2001', NULL, NULL, '2004', NULL, NULL, NULL),
(111, 'India Pakistan Club (Historic, 1950\'s-70\'s)', 'E. Grand and Gratiot Detroit, MI', NULL, NULL, NULL, NULL, '1950\'s', NULL, NULL, '1970\'s', NULL, NULL, NULL),
(112, 'Islamic Center of America (Historic, 1963-2005)', '15571 Joy Road Detroit, MI', NULL, NULL, NULL, NULL, '1963', NULL, '2005', '2005', NULL, NULL, NULL),
(113, 'Islamic Institute of Knowledge (Historic, 1983-1998)', '13500 W. Warren Avenue Dearborn, MI', NULL, NULL, NULL, NULL, '1982', NULL, '1998', '1998', NULL, NULL, NULL),
(114, 'Jamiyatul Nasrul Ilm (Historic, 1990\'s)', '9309 Oakland Detroit, MI', NULL, NULL, NULL, NULL, '1990', NULL, NULL, '1998', NULL, NULL, NULL),
(115, 'Kalil Bazzy home (Historic, 1913)', '199 Labelle Street Highland Park, MI', NULL, NULL, NULL, NULL, '1913', NULL, NULL, '1930', NULL, NULL, NULL),
(116, 'Karoub House (Historic, 1921)', '74 Victor Avenue Highland Park, MI', NULL, NULL, NULL, NULL, '1921', NULL, NULL, '1980', NULL, NULL, NULL),
(117, 'Lebanese Islamic Association of Michigan (Historic, 1988)', '7250 Chase Dearborn, MI', NULL, NULL, NULL, NULL, '1988', NULL, NULL, '1990', NULL, NULL, NULL),
(118, 'Masjid al-Asr (Historic, 1977)', '9819 Dexter Blvd. Detroit, MI', NULL, NULL, NULL, NULL, '1977', NULL, NULL, '1985', NULL, NULL, NULL),
(119, 'Masjid al-Haqq (Historic, 1981-2009)', '4118 Joy Road Detroit, MI', NULL, NULL, NULL, NULL, '1981', NULL, NULL, NULL, NULL, NULL, NULL),
(120, 'Masjid Al Haqq', '4017 Clairmount Detroit', NULL, NULL, 'African American', NULL, '1986', NULL, NULL, '2013', NULL, NULL, NULL),
(121, 'Masjid As-Salaam Orthodox Islamic Movement (Historic, 1969-1980)', '12537 Hamilton Highland Park, MI', NULL, NULL, NULL, NULL, '1969', NULL, NULL, '1980', NULL, NULL, NULL),
(122, 'Masjid As-Salam (Historic, 2000\'s)', '21230 W. 7 Mile Road Detroit, MI', '(586) 945-6855', NULL, 'African', NULL, NULL, NULL, '2008', NULL, NULL, NULL, NULL),
(123, 'Masjid Al-Iklas (Historic, 1988-2004)', '16412 E. Warren Avenue Detroit, MI', NULL, NULL, NULL, NULL, '1995', NULL, NULL, '2005', NULL, NULL, '72157606454092453'),
(124, 'Masjid John Hasan (Historic, 1979-1984)', 'MI', NULL, NULL, NULL, NULL, '1979', NULL, NULL, '1984', NULL, NULL, NULL),
(125, 'Masjid Oak Park (Historic)', '15425 Miller Street Oak Park, MI', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2005', NULL, NULL, NULL),
(126, 'Masjid Saaliheen (Historic)', '22726 Rein Street Eastpointe, MI', NULL, NULL, NULL, NULL, '2000', NULL, NULL, '2004', NULL, NULL, NULL),
(127, 'Moorish Temple of America #4 (Historic, 1929)', '632 Livingstone Avenue Pontiac, MI', NULL, NULL, NULL, NULL, '1929', NULL, NULL, '1940', NULL, NULL, NULL),
(128, 'Moorish Temple of America #4 (Historic, 1929)', '1023 Illinois Street Detroit, MI', NULL, NULL, NULL, NULL, '1927', NULL, NULL, NULL, NULL, NULL, NULL),
(129, 'Moslem Mosque (Historic, 1921)', '242 Victor Street Highland Park, MI', NULL, NULL, NULL, NULL, '1921', NULL, NULL, '1927', NULL, NULL, NULL),
(130, 'Moslem Welfare Society (Historic)', '742 St. Antoine Street Detroit, MI', NULL, NULL, NULL, NULL, '1922', NULL, NULL, '1930', NULL, NULL, NULL),
(131, 'Mosque of the Great Kingdom of God (Historic)', '5684 Campbell Detroit, MI', NULL, NULL, NULL, NULL, '1993', NULL, NULL, '2004', NULL, NULL, NULL),
(132, 'Muhammad\'s Mosque of Islam #1 (Historic)', '1510 Woodward Avenue Detroit, MI', NULL, NULL, NULL, NULL, '1980', NULL, NULL, '1987', NULL, NULL, NULL),
(133, 'Muhammad\'s Temple #1 (Historic)', '3408 Hastings Street Detroit, MI', NULL, NULL, NULL, NULL, '1932', NULL, '1957', NULL, NULL, NULL, NULL),
(134, 'Muslim Brotherhood, U.S.A. (Historic)', '9031 12th Street Detroit, MI', NULL, NULL, 'African American', NULL, '1959', NULL, NULL, '1970', NULL, NULL, NULL),
(135, 'Muslim Community Center of Detroit (Historic)', '5307 Marlborough Street Detroit, MI', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(136, 'New Bagdad Cafe (Historic', '1002 Hastings Street Detroit, MI', NULL, NULL, NULL, NULL, '1930\'s', NULL, NULL, '1940', NULL, NULL, NULL),
(137, 'New Masjid and Islamic Education Center', '17346 Plainview Detroit', NULL, NULL, NULL, NULL, '1994', NULL, NULL, '1997', NULL, NULL, NULL),
(138, 'New Mosque/School Building Fund, Inc. (Masjid Wali Muhammads\' Project 90\'S, Inc.)', '18011 Warrington Detroit', NULL, NULL, 'African American', NULL, '1990', NULL, NULL, '1998', NULL, NULL, NULL),
(139, 'New Oriental Hall (Universal Islamic Society) (Historic, 1926)', '1941 Hastings Street Detroit, MI', NULL, NULL, NULL, NULL, '1925 or 1926?', NULL, NULL, '1940', NULL, NULL, NULL),
(140, 'Progressive Arabian Hashemite Society (Hashemite Hall) (Historic)', '10401 Dix Avenue Dearborn, MI', NULL, NULL, NULL, NULL, '1936', NULL, NULL, '1970\'s', NULL, NULL, NULL),
(141, 'Sacred Mosque (Historic)', '201 Tuxedo Street Highland Park, MI', NULL, NULL, NULL, NULL, '1987', NULL, NULL, '1997', NULL, NULL, NULL),
(142, 'Turkish and Albanian Meeting House (Historic)', '588 St. Antoine Street Detroit, MI', NULL, NULL, 'Arab', NULL, NULL, NULL, NULL, '1960', NULL, NULL, NULL),
(143, 'Turkish Crescent Association', '3048 Salina Dearborn, MI', NULL, NULL, NULL, NULL, '1950\'s', NULL, NULL, NULL, NULL, NULL, NULL),
(144, 'United Citizen\'s Society/Moslem Mosque of Highland Park (Historic)', '97 Victor Avenue Highland Park, MI', NULL, NULL, NULL, NULL, '1937 or 1958?', NULL, NULL, NULL, NULL, NULL, NULL),
(145, 'Universal Consolidation of Islam, Holy Mosque (Historic)', '5683 Maybury Grand Detroit, MI', NULL, NULL, 'African American', NULL, '1964', NULL, NULL, '1977', NULL, NULL, NULL),
(146, 'Tijani Zawiya', '19174 Livernois Avenue Detroit, MI', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(147, 'AAUAA (Historic, 1940\'s)', '986 King Street Detroit, MI', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
