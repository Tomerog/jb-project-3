-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Mar 20, 2025 at 03:28 PM
-- Server version: 9.2.0
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--
CREATE DATABASE IF NOT EXISTS `vacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `vacations`;

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `vacation_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `follows`
--

INSERT INTO `follows` (`user_id`, `vacation_id`, `created_at`, `updated_at`) VALUES
('ed7f7008-058e-11f0-95ef-0242ac110002', '5ee516cf-058e-11f0-95ef-0242ac110002', '2025-03-20 13:26:39', '2025-03-20 13:26:39'),
('ed7f7547-058e-11f0-95ef-0242ac110002', '29d25c2c-058e-11f0-95ef-0242ac110002', '2025-03-20 13:26:39', '2025-03-20 13:26:39'),
('ed7f7547-058e-11f0-95ef-0242ac110002', '5ee517ac-058e-11f0-95ef-0242ac110002', '2025-03-20 13:26:39', '2025-03-20 13:26:39'),
('ed7f773b-058e-11f0-95ef-0242ac110002', '5ee5177b-058e-11f0-95ef-0242ac110002', '2025-03-20 13:26:39', '2025-03-20 13:26:39'),
('ed7f773b-058e-11f0-95ef-0242ac110002', '5ee517ac-058e-11f0-95ef-0242ac110002', '2025-03-20 13:26:39', '2025-03-20 13:26:39');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `first_name` varchar(40) NOT NULL,
  `last_name` varchar(40) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(64) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `is_admin`, `created_at`, `updated_at`) VALUES
('ed7f7008-058e-11f0-95ef-0242ac110002', 'John', 'Doe', 'john.doe@example.com', 'password123', 0, '2025-03-20 13:26:27', '2025-03-20 13:26:27'),
('ed7f7547-058e-11f0-95ef-0242ac110002', 'Jane', 'Smith', 'jane.smith@example.com', 'password123', 0, '2025-03-20 13:26:27', '2025-03-20 13:26:27'),
('ed7f76b4-058e-11f0-95ef-0242ac110002', 'Admin', 'User', 'admin.user@example.com', 'adminpassword', 1, '2025-03-20 13:26:27', '2025-03-20 13:26:27'),
('ed7f773b-058e-11f0-95ef-0242ac110002', 'Alice', 'Brown', 'alice.brown@example.com', 'password123', 0, '2025-03-20 13:26:27', '2025-03-20 13:26:27');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `destination` varchar(64) NOT NULL,
  `description` text NOT NULL,
  `vacation_start` datetime NOT NULL,
  `vacation_end` datetime NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `destination`, `description`, `vacation_start`, `vacation_end`, `price`, `image_url`, `created_at`, `updated_at`) VALUES
('29d25c2c-058e-11f0-95ef-0242ac110002', 'Paris, France', 'Explore the City of Lights and its famous landmarks.', '2025-06-10 00:00:00', '2025-06-20 00:00:00', 1201, 'https://example.com/paris.jpg', '2025-03-20 13:20:05', '2025-03-20 13:20:05'),
('5ee50db0-058e-11f0-95ef-0242ac110002', 'Tokyo, Japan', 'Experience the blend of modern and traditional culture in Tokyo.', '2025-07-15 00:00:00', '2025-07-25 00:00:00', 1801, 'https://example.com/tokyo.jpg', '2025-03-20 13:22:28', '2025-03-20 13:22:28'),
('5ee51362-058e-11f0-95ef-0242ac110002', 'New York, USA', 'Discover the iconic skyline and diverse culture of NYC.', '2025-05-01 00:00:00', '2025-05-10 00:00:00', 1500, 'https://example.com/nyc.jpg', '2025-03-20 13:22:28', '2025-03-20 13:22:28'),
('5ee514a0-058e-11f0-95ef-0242ac110002', 'Rome, Italy', 'Step into history and enjoy the amazing Italian cuisine.', '2025-09-10 00:00:00', '2025-09-20 00:00:00', 1350, 'https://example.com/rome.jpg', '2025-03-20 13:22:28', '2025-03-20 13:22:28'),
('5ee51544-058e-11f0-95ef-0242ac110002', 'Sydney, Australia', 'Visit the Opera House and relax on Bondi Beach.', '2025-11-05 00:00:00', '2025-11-15 00:00:00', 2101, 'https://example.com/sydney.jpg', '2025-03-20 13:22:28', '2025-03-20 13:22:28'),
('5ee5165f-058e-11f0-95ef-0242ac110002', 'Dubai, UAE', 'Luxury shopping, ultramodern architecture, and vibrant nightlife.', '2025-04-10 00:00:00', '2025-04-20 00:00:00', 2500, 'https://example.com/dubai.jpg', '2025-03-20 13:22:28', '2025-03-20 13:22:28'),
('5ee516cf-058e-11f0-95ef-0242ac110002', 'Bali, Indonesia', 'Relax in tropical paradise with stunning beaches.', '2025-08-15 00:00:00', '2025-08-25 00:00:00', 1100, 'https://example.com/bali.jpg', '2025-03-20 13:22:28', '2025-03-20 13:22:28'),
('5ee51712-058e-11f0-95ef-0242ac110002', 'London, UK', 'Enjoy a mix of history, culture, and modern attractions.', '2025-10-01 00:00:00', '2025-10-10 00:00:00', 1600, 'https://example.com/london.jpg', '2025-03-20 13:22:28', '2025-03-20 13:22:28'),
('5ee51741-058e-11f0-95ef-0242ac110002', 'Cape Town, South Africa', 'Explore breathtaking landscapes and unique wildlife.', '2025-12-05 00:00:00', '2025-12-15 00:00:00', 1401, 'https://example.com/capetown.jpg', '2025-03-20 13:22:28', '2025-03-20 13:22:28'),
('5ee5177b-058e-11f0-95ef-0242ac110002', 'Rio de Janeiro, Brazil', 'Enjoy the famous beaches and vibrant nightlife.', '2025-02-10 00:00:00', '2025-02-20 00:00:00', 1250, 'https://example.com/rio.jpg', '2025-03-20 13:22:28', '2025-03-20 13:22:28'),
('5ee517ac-058e-11f0-95ef-0242ac110002', 'Bangkok, Thailand', 'Discover exotic street food and beautiful temples.', '2025-03-15 00:00:00', '2025-03-25 00:00:00', 900, 'https://example.com/bangkok.jpg', '2025-03-20 13:22:28', '2025-03-20 13:22:28'),
('5ee517d2-058e-11f0-95ef-0242ac110002', 'Athens, Greece', 'Walk through ancient ruins and enjoy stunning sunsets.', '2025-07-01 00:00:00', '2025-07-10 00:00:00', 1301, 'https://example.com/athens.jpg', '2025-03-20 13:22:28', '2025-03-20 13:22:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`user_id`,`vacation_id`),
  ADD UNIQUE KEY `follows_vacationId_userId_unique` (`user_id`,`vacation_id`),
  ADD KEY `vacation_id` (`vacation_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email` (`email`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
