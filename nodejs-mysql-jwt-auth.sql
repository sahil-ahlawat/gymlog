-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 02, 2023 at 01:41 AM
-- Server version: 5.7.24
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs-mysql-jwt-auth`
--

-- --------------------------------------------------------

--
-- Table structure for table `app`
--

CREATE TABLE `app` (
  `id` bigint(20) NOT NULL,
  `userid` int(11) DEFAULT NULL,
  `appid` text NOT NULL,
  `uip` varchar(20) DEFAULT NULL,
  `uproxyip` varchar(20) DEFAULT NULL,
  `useragent` varchar(100) DEFAULT NULL,
  `location` text,
  `status` text,
  `devicetoken` text,
  `meta` text,
  `createdat` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `app`
--

INSERT INTO `app` (`id`, `userid`, `appid`, `uip`, `uproxyip`, `useragent`, `location`, `status`, `devicetoken`, `meta`, `createdat`, `updatedat`) VALUES
(1, NULL, 'lc6ldc5agcwmw4ou4l', '::1', NULL, 'PostmanRuntime/7.29.2', NULL, 'active', NULL, NULL, '2022-12-27 18:58:45', '2022-12-27 18:58:45'),
(2, NULL, 'lc6leqgfsdooawz6c5', '::1', NULL, 'PostmanRuntime/7.29.2', NULL, 'active', NULL, NULL, '2022-12-27 18:59:50', '2022-12-27 18:59:50'),
(3, NULL, 'lc6lerb3x8hd72bip4', '::1', NULL, 'PostmanRuntime/7.29.2', NULL, 'active', NULL, NULL, '2022-12-27 18:59:51', '2022-12-27 18:59:51'),
(4, NULL, 'lc6lerxmed924u1aph', '::1', NULL, 'PostmanRuntime/7.29.2', NULL, 'active', NULL, NULL, '2022-12-27 18:59:52', '2022-12-27 18:59:52'),
(5, NULL, 'lc6lesm3a7h83te0hig', '::1', NULL, 'PostmanRuntime/7.29.2', NULL, 'active', NULL, NULL, '2022-12-27 18:59:53', '2022-12-27 18:59:53'),
(6, NULL, 'lc6letaw5e0vm8ua64q', '::1', NULL, 'PostmanRuntime/7.29.2', NULL, 'active', NULL, NULL, '2022-12-27 18:59:54', '2022-12-27 18:59:54'),
(7, NULL, 'lc6letzm2pkjipn9zme', '::1', NULL, 'PostmanRuntime/7.29.2', NULL, 'active', NULL, NULL, '2022-12-27 18:59:55', '2022-12-27 18:59:55'),
(8, NULL, 'lc6leuspjqkestp43mc', '::1', NULL, 'PostmanRuntime/7.29.2', NULL, 'active', NULL, NULL, '2022-12-27 18:59:56', '2022-12-27 18:59:56'),
(9, NULL, 'lc6lfr3znjank6ffrbf', '::1', NULL, 'PostmanRuntime/7.29.2', NULL, 'active', NULL, NULL, '2022-12-27 19:00:38', '2022-12-27 19:00:38'),
(10, NULL, 'lc6lklcbdbygpy1bbmp', '::1', NULL, 'PostmanRuntime/7.29.2', NULL, 'active', NULL, NULL, '2022-12-27 19:04:23', '2022-12-27 19:04:23'),
(11, NULL, 'lc6llu5qjlelofpr33r', '::1', NULL, 'PostmanRuntime/7.29.2', NULL, 'active', NULL, NULL, '2022-12-27 19:05:21', '2022-12-27 19:05:21'),
(12, NULL, 'lcavdvchh8k2vrn118b', '::1', NULL, 'PostmanRuntime/7.29.2', NULL, 'active', NULL, NULL, '2022-12-30 18:50:11', '2022-12-30 18:50:11'),
(13, NULL, 'lcavqgnvbn0ha38z3l7', '::1', NULL, 'PostmanRuntime/7.29.2', 'Gurgaon', 'active', NULL, NULL, '2022-12-30 18:59:58', '2022-12-30 19:16:10');

-- --------------------------------------------------------

--
-- Table structure for table `exercise`
--

CREATE TABLE `exercise` (
  `id` int(11) NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `slug` varchar(200) NOT NULL,
  `description` text,
  `featured_image` text,
  `excerpt` text,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `exercise_meta`
--

CREATE TABLE `exercise_meta` (
  `id` int(11) NOT NULL,
  `exercise_id` int(11) DEFAULT NULL,
  `meta_key` varchar(200) DEFAULT NULL,
  `meta_value` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `url` text,
  `type` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `bio` text,
  `profilepic` text,
  `gender` varchar(5) DEFAULT NULL,
  `gym` varchar(50) DEFAULT NULL,
  `sportscat` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_on` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `bio`, `profilepic`, `gender`, `gym`, `sportscat`, `country`, `address`, `state`, `city`, `location`, `email`, `password`, `created_on`) VALUES
(1, 'Sahil', 'Ahlawat', 'This is some bio', 'https://somepicurl.com/xyz.jpg', 'Male', '1,2', '1,2,3', 'USA', 'H no 144, Village Gangtan', 'Haryana', 'Jhajjar', 'Gangtan', 'sahilahlawat2@gmail.com', '$2a$10$LmGeTG/rpdYdJCE/nbq2yu85UP2E9H7yKqvEbXajdRj88fu0PfGL2', '2022-12-21 13:15:39.000000');

-- --------------------------------------------------------

--
-- Table structure for table `user_exercise_rel`
--

CREATE TABLE `user_exercise_rel` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `exercise_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_exercise_rel_meta`
--

CREATE TABLE `user_exercise_rel_meta` (
  `id` int(11) NOT NULL,
  `user_exercise_rel_id` int(11) DEFAULT NULL,
  `meta_key` varchar(200) DEFAULT NULL,
  `meta_value` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_meta`
--

CREATE TABLE `user_meta` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `meta_key` varchar(200) DEFAULT NULL,
  `meta_value` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_meta`
--

INSERT INTO `user_meta` (`id`, `user_id`, `meta_key`, `meta_value`, `created_at`, `updated_at`) VALUES
(1, 1, 'receivenotification', 'true', '2022-12-31 18:48:57', '2022-12-31 18:53:30'),
(2, 1, 'privacysetting', 'private', '2022-12-31 18:48:57', '2022-12-31 18:53:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `app`
--
ALTER TABLE `app`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exercise`
--
ALTER TABLE `exercise`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exercise_meta`
--
ALTER TABLE `exercise_meta`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_exercise_rel`
--
ALTER TABLE `user_exercise_rel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_exercise_rel_meta`
--
ALTER TABLE `user_exercise_rel_meta`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_meta`
--
ALTER TABLE `user_meta`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `app`
--
ALTER TABLE `app`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `exercise`
--
ALTER TABLE `exercise`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `exercise_meta`
--
ALTER TABLE `exercise_meta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_exercise_rel`
--
ALTER TABLE `user_exercise_rel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_exercise_rel_meta`
--
ALTER TABLE `user_exercise_rel_meta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_meta`
--
ALTER TABLE `user_meta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
