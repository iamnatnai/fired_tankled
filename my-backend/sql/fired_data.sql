-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 01, 2024 at 11:29 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fired_data`
--

-- --------------------------------------------------------

--
-- Table structure for table `fire_extinguisher`
--

CREATE TABLE `fire_extinguisher` (
  `FCODE` varchar(50) NOT NULL,
  `F_water` varchar(50) NOT NULL,
  `F_located` varchar(200) NOT NULL,
  `image_path` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fire_extinguisher`
--

INSERT INTO `fire_extinguisher` (`FCODE`, `F_water`, `F_located`, `image_path`) VALUES
('FP-FE-08-002', 'FP-FH-08-002', 'ถังดับเพลิงเคมี ในตู้จ่ายน้ำดับเพลิง ชั้น8 ZONE B (หน้าลิฟต์หลังชั้น 8 )\r\n', ''),
('FP.FE52', '-', 'it', '/uploads/FP52.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `fire_extinguisher`
--
ALTER TABLE `fire_extinguisher`
  ADD PRIMARY KEY (`FCODE`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
