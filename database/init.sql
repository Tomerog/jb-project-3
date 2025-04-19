-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Apr 19, 2025 at 11:07 PM
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
('3a47882a-5757-411c-8b2d-0daed5dc43c7', '0e8f48af-232f-4f4c-b63f-e25f04a5117b', '2025-04-19 23:07:05', '2025-04-19 23:07:05'),
('3a47882a-5757-411c-8b2d-0daed5dc43c7', '29d25c2c-058e-11f0-95ef-0242ac110002', '2025-04-19 23:07:09', '2025-04-19 23:07:09'),
('3a47882a-5757-411c-8b2d-0daed5dc43c7', '5ee50db0-058e-11f0-95ef-0242ac110002', '2025-04-19 23:07:08', '2025-04-19 23:07:08'),
('3a47882a-5757-411c-8b2d-0daed5dc43c7', '5ee51362-058e-11f0-95ef-0242ac110002', '2025-04-19 23:07:06', '2025-04-19 23:07:06'),
('3a47882a-5757-411c-8b2d-0daed5dc43c7', '5ee514a0-058e-11f0-95ef-0242ac110002', '2025-04-19 23:07:07', '2025-04-19 23:07:07'),
('3a47882a-5757-411c-8b2d-0daed5dc43c7', '5ee51544-058e-11f0-95ef-0242ac110002', '2025-04-19 23:07:12', '2025-04-19 23:07:12'),
('3a47882a-5757-411c-8b2d-0daed5dc43c7', '5ee5165f-058e-11f0-95ef-0242ac110002', '2025-04-19 23:07:04', '2025-04-19 23:07:04'),
('3a47882a-5757-411c-8b2d-0daed5dc43c7', '5ee516cf-058e-11f0-95ef-0242ac110002', '2025-04-19 23:07:08', '2025-04-19 23:07:08'),
('3a47882a-5757-411c-8b2d-0daed5dc43c7', '5ee51712-058e-11f0-95ef-0242ac110002', '2025-04-19 23:07:07', '2025-04-19 23:07:07'),
('3a47882a-5757-411c-8b2d-0daed5dc43c7', '5ee51741-058e-11f0-95ef-0242ac110002', '2025-04-19 23:07:11', '2025-04-19 23:07:11'),
('3a47882a-5757-411c-8b2d-0daed5dc43c7', '5ee517ac-058e-11f0-95ef-0242ac110002', '2025-04-19 23:07:04', '2025-04-19 23:07:04'),
('3a47882a-5757-411c-8b2d-0daed5dc43c7', '5ee517d2-058e-11f0-95ef-0242ac110002', '2025-04-19 23:07:06', '2025-04-19 23:07:06'),
('8d12b84f-465a-4491-b4c3-40b74debcc9d', '29d25c2c-058e-11f0-95ef-0242ac110002', '2025-04-19 19:44:34', '2025-04-19 19:44:34'),
('8d12b84f-465a-4491-b4c3-40b74debcc9d', '5ee50db0-058e-11f0-95ef-0242ac110002', '2025-04-19 19:44:34', '2025-04-19 19:44:34'),
('8d12b84f-465a-4491-b4c3-40b74debcc9d', '5ee51362-058e-11f0-95ef-0242ac110002', '2025-04-19 12:39:59', '2025-04-19 12:39:59'),
('8d12b84f-465a-4491-b4c3-40b74debcc9d', '5ee514a0-058e-11f0-95ef-0242ac110002', '2025-04-19 19:44:43', '2025-04-19 19:44:43'),
('8d12b84f-465a-4491-b4c3-40b74debcc9d', '5ee51544-058e-11f0-95ef-0242ac110002', '2025-03-30 09:53:49', '2025-03-30 09:53:49'),
('8d12b84f-465a-4491-b4c3-40b74debcc9d', '5ee5165f-058e-11f0-95ef-0242ac110002', '2025-04-19 19:44:29', '2025-04-19 19:44:29'),
('8d12b84f-465a-4491-b4c3-40b74debcc9d', '5ee516cf-058e-11f0-95ef-0242ac110002', '2025-04-19 19:44:43', '2025-04-19 19:44:43'),
('8d12b84f-465a-4491-b4c3-40b74debcc9d', '5ee51712-058e-11f0-95ef-0242ac110002', '2025-04-19 12:40:03', '2025-04-19 12:40:03'),
('8d12b84f-465a-4491-b4c3-40b74debcc9d', '5ee51741-058e-11f0-95ef-0242ac110002', '2025-03-29 13:24:26', '2025-03-29 13:24:26'),
('8d12b84f-465a-4491-b4c3-40b74debcc9d', '5ee517ac-058e-11f0-95ef-0242ac110002', '2025-04-19 19:38:48', '2025-04-19 19:38:48'),
('8d12b84f-465a-4491-b4c3-40b74debcc9d', '5ee517d2-058e-11f0-95ef-0242ac110002', '2025-04-19 19:44:30', '2025-04-19 19:44:30'),
('92132db8-4478-44c2-ae8e-75bb1e9dde90', '0e8f48af-232f-4f4c-b63f-e25f04a5117b', '2025-04-19 21:18:45', '2025-04-19 21:18:45'),
('92132db8-4478-44c2-ae8e-75bb1e9dde90', '5ee50db0-058e-11f0-95ef-0242ac110002', '2025-04-19 21:18:47', '2025-04-19 21:18:47'),
('92132db8-4478-44c2-ae8e-75bb1e9dde90', '5ee51362-058e-11f0-95ef-0242ac110002', '2025-04-19 21:18:44', '2025-04-19 21:18:44'),
('92132db8-4478-44c2-ae8e-75bb1e9dde90', '5ee514a0-058e-11f0-95ef-0242ac110002', '2025-04-19 21:18:48', '2025-04-19 21:18:48'),
('92132db8-4478-44c2-ae8e-75bb1e9dde90', '5ee5165f-058e-11f0-95ef-0242ac110002', '2025-04-19 21:18:45', '2025-04-19 21:18:45'),
('92132db8-4478-44c2-ae8e-75bb1e9dde90', '5ee51741-058e-11f0-95ef-0242ac110002', '2025-04-19 21:18:43', '2025-04-19 21:18:43'),
('92132db8-4478-44c2-ae8e-75bb1e9dde90', '5ee517ac-058e-11f0-95ef-0242ac110002', '2025-04-19 21:18:46', '2025-04-19 21:18:46'),
('a93aa170-a520-4ba9-b37d-16ecd2fbdf96', '0e8f48af-232f-4f4c-b63f-e25f04a5117b', '2025-04-19 21:18:20', '2025-04-19 21:18:20'),
('a93aa170-a520-4ba9-b37d-16ecd2fbdf96', '29d25c2c-058e-11f0-95ef-0242ac110002', '2025-04-19 21:18:23', '2025-04-19 21:18:23'),
('a93aa170-a520-4ba9-b37d-16ecd2fbdf96', '5ee50db0-058e-11f0-95ef-0242ac110002', '2025-04-19 21:18:23', '2025-04-19 21:18:23'),
('a93aa170-a520-4ba9-b37d-16ecd2fbdf96', '5ee51362-058e-11f0-95ef-0242ac110002', '2025-04-19 21:18:21', '2025-04-19 21:18:21'),
('a93aa170-a520-4ba9-b37d-16ecd2fbdf96', '5ee514a0-058e-11f0-95ef-0242ac110002', '2025-04-19 21:18:22', '2025-04-19 21:18:22'),
('a93aa170-a520-4ba9-b37d-16ecd2fbdf96', '5ee51544-058e-11f0-95ef-0242ac110002', '2025-04-19 21:18:25', '2025-04-19 21:18:25'),
('a93aa170-a520-4ba9-b37d-16ecd2fbdf96', '5ee5165f-058e-11f0-95ef-0242ac110002', '2025-04-19 21:18:20', '2025-04-19 21:18:20'),
('a93aa170-a520-4ba9-b37d-16ecd2fbdf96', '5ee516cf-058e-11f0-95ef-0242ac110002', '2025-04-19 21:18:23', '2025-04-19 21:18:23'),
('a93aa170-a520-4ba9-b37d-16ecd2fbdf96', '5ee51712-058e-11f0-95ef-0242ac110002', '2025-04-19 21:18:22', '2025-04-19 21:18:22'),
('a93aa170-a520-4ba9-b37d-16ecd2fbdf96', '5ee51741-058e-11f0-95ef-0242ac110002', '2025-04-19 21:18:26', '2025-04-19 21:18:26'),
('a93aa170-a520-4ba9-b37d-16ecd2fbdf96', '5ee517ac-058e-11f0-95ef-0242ac110002', '2025-04-19 21:18:19', '2025-04-19 21:18:19'),
('a93aa170-a520-4ba9-b37d-16ecd2fbdf96', '5ee517d2-058e-11f0-95ef-0242ac110002', '2025-04-19 21:18:21', '2025-04-19 21:18:21');

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
('3a47882a-5757-411c-8b2d-0daed5dc43c7', 'test', 'test', 'test@gmail.com', '3bc8878e73e4a8ed1847f91b3fec96f025fe6e4854575bba13de8971de8f35a0', 0, '2025-04-19 23:07:01', '2025-04-19 23:07:01'),
('768be3ec-acba-4c86-96ad-80e8827285a5', 'cfir', 'kfir', 'timtum@tumtim.com', '3bc8878e73e4a8ed1847f91b3fec96f025fe6e4854575bba13de8971de8f35a0', 0, '2025-03-26 13:48:20', '2025-03-26 13:48:20'),
('8d12b84f-465a-4491-b4c3-40b74debcc9d', 'timtim', 'tumtum', 'tomer@boopbeep.com', '3bc8878e73e4a8ed1847f91b3fec96f025fe6e4854575bba13de8971de8f35a0', 0, '2025-03-21 17:43:40', '2025-03-21 17:43:40'),
('8e02ccee-0bcf-4369-a223-a8e752bb11ae', 'Admin', 'User', 'Admin@user.com', '7cb8f6d3768e4cb2adcc1232697b1284f6739fac04a0a6d2935b2bf9b50acdf4', 1, '2025-04-19 21:17:08', '2025-04-19 21:17:08'),
('91aafc6a-2da4-41dc-957a-fc04e491e2b1', 'tomer', 'ognistoff', 'tomer@gmail.com', '3bc8878e73e4a8ed1847f91b3fec96f025fe6e4854575bba13de8971de8f35a0', 1, '2025-03-21 17:14:51', '2025-03-21 17:14:51'),
('92132db8-4478-44c2-ae8e-75bb1e9dde90', 'Alice', 'Brown', 'Alice@brown.com', '3bc8878e73e4a8ed1847f91b3fec96f025fe6e4854575bba13de8971de8f35a0', 0, '2025-04-19 21:18:41', '2025-04-19 21:18:41'),
('a93aa170-a520-4ba9-b37d-16ecd2fbdf96', 'jane', 'smith', 'jane@smith.com', '7427e50550ec345e2afac00c0c064edb86726fab8abed12c1d9c809351a4bb94', 0, '2025-04-19 21:18:18', '2025-04-19 21:18:18'),
('d56d8461-ddc5-4700-b371-b20500b98b68', 'John', 'Doe', 'John@doe.com', '7427e50550ec345e2afac00c0c064edb86726fab8abed12c1d9c809351a4bb94', 0, '2025-04-19 21:17:56', '2025-04-19 21:17:56');

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
('0e8f48af-232f-4f4c-b63f-e25f04a5117b', 'South Tel-Aviv, Israel', 'If your budget is low and expectations are lower, south Tel-Aviv is your go to place', '2025-04-20 00:00:00', '2025-04-21 00:00:00', 4, 'http://127.0.0.1:4566/il.co.johnbryce.tomerogn/d7e5c167-f851-415d-838a-dcd329ba134d.jpg', '2025-04-19 21:15:28', '2025-04-19 23:00:23'),
('29d25c2c-058e-11f0-95ef-0242ac110002', 'Paris, France', 'Explore the City of Lights and its famous landmarks.', '2025-06-10 00:00:00', '2025-06-20 00:00:00', 1201, 'http://127.0.0.1:4566/il.co.johnbryce.tomerogn/0bfdd272-de1c-46cd-ae2f-f28296370425.png', '2025-03-20 13:20:05', '2025-04-19 23:05:29'),
('5ee50db0-058e-11f0-95ef-0242ac110002', 'Tokyo, Japan', 'Experience the blend of modern and traditional culture in Tokyo.', '2025-07-15 00:00:00', '2025-07-25 00:00:00', 1801, 'http://127.0.0.1:4566/il.co.johnbryce.tomerogn/678dc2fc-dd24-40a8-8f5b-338906e37429.png', '2025-03-20 13:22:28', '2025-04-19 23:05:33'),
('5ee51362-058e-11f0-95ef-0242ac110002', 'New York, USA', 'Discover the iconic skyline and diverse culture of NYC.', '2025-05-01 00:00:00', '2025-05-10 00:00:00', 1501, 'http://127.0.0.1:4566/il.co.johnbryce.tomerogn/d06da886-5790-433e-b99c-a1e0d8e3d0db.jpg', '2025-03-20 13:22:28', '2025-04-19 23:05:25'),
('5ee514a0-058e-11f0-95ef-0242ac110002', 'Rome, Italy', 'Step into history and enjoy the amazing Italian cuisine.', '2025-09-10 00:00:00', '2025-09-20 00:00:00', 1350, 'http://127.0.0.1:4566/il.co.johnbryce.tomerogn/54c593e8-6070-45d3-8a31-029fc4dd1c0a.png', '2025-03-20 13:22:28', '2025-04-19 23:05:41'),
('5ee51544-058e-11f0-95ef-0242ac110002', 'Sydney, Australia', 'Visit the Opera House and relax on Bondi Beach.', '2025-11-05 00:00:00', '2025-11-15 00:00:00', 2101, 'http://127.0.0.1:4566/il.co.johnbryce.tomerogn/814bf5fe-ef48-4f17-ab0a-a2ad915e1b51.png', '2025-03-20 13:22:28', '2025-04-19 23:05:56'),
('5ee5165f-058e-11f0-95ef-0242ac110002', 'Dubai, UAE', 'Luxury shopping, ultramodern architecture, and vibrant nightlife.', '2025-04-10 00:00:00', '2025-04-20 00:00:00', 2500, 'http://127.0.0.1:4566/il.co.johnbryce.tomerogn/8e3c1205-b35f-482e-bc7d-eadd14030c3a.png', '2025-03-20 13:22:28', '2025-04-19 23:05:20'),
('5ee516cf-058e-11f0-95ef-0242ac110002', 'Bali, Indonesia', 'Relax in tropical paradise with stunning beaches.', '2025-08-15 00:00:00', '2025-08-25 00:00:00', 1100, 'http://127.0.0.1:4566/il.co.johnbryce.tomerogn/5cb42e26-bf58-4c36-a75c-b515dc09c785.jpg', '2025-03-20 13:22:28', '2025-04-19 23:05:37'),
('5ee51712-058e-11f0-95ef-0242ac110002', 'London, UK', 'Enjoy a mix of history, culture, and modern attractions.', '2025-10-01 00:00:00', '2025-10-10 00:00:00', 1600, 'http://127.0.0.1:4566/il.co.johnbryce.tomerogn/f3219086-3870-4dd8-80e0-a00b9b7d9812.png', '2025-03-20 13:22:28', '2025-04-19 23:05:45'),
('5ee51741-058e-11f0-95ef-0242ac110002', 'Cape Town, South Africa', 'Explore breathtaking landscapes and unique wildlife.', '2025-12-05 00:00:00', '2025-12-15 00:00:00', 1401, 'http://127.0.0.1:4566/il.co.johnbryce.tomerogn/54dab4e9-8e03-4873-8649-6cbab9e6e374.png', '2025-03-20 13:22:28', '2025-04-19 23:05:51'),
('5ee517ac-058e-11f0-95ef-0242ac110002', 'Bangkok, Thailand', 'Discover exotic street food and beautiful temples.', '2025-03-28 00:00:00', '2025-03-31 00:00:00', 900, 'http://127.0.0.1:4566/il.co.johnbryce.tomerogn/cb6bd074-56ae-4d45-af3d-7fee33a22436.jpg', '2025-03-20 13:22:28', '2025-04-19 23:06:26'),
('5ee517d2-058e-11f0-95ef-0242ac110002', 'Athens, Greece', 'Walk through ancient ruins and enjoy stunning sunsets.', '2025-04-22 00:00:00', '2025-07-10 00:00:00', 1300, 'http://127.0.0.1:4566/il.co.johnbryce.tomerogn/d29cfc1e-7faa-4f55-99e6-dfc17fa14bc5.png', '2025-03-20 13:22:28', '2025-04-19 23:05:14');

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
