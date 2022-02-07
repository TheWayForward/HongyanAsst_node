-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 07, 2022 at 10:02 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hongyanasst`
--

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `id` int(11) NOT NULL COMMENT '编号',
  `title` varchar(40) NOT NULL COMMENT '标题文字',
  `url` varchar(50) NOT NULL COMMENT 'URL',
  `news_id` int(11) DEFAULT NULL COMMENT '对应资讯id',
  `event_id` int(11) DEFAULT NULL COMMENT '对应活动id',
  `create_time` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '创建时间',
  `valid` tinyint(4) NOT NULL DEFAULT 1 COMMENT '是否有效'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`id`, `title`, `url`, `news_id`, `event_id`, `create_time`, `valid`) VALUES
(1, '#鸿雁骑行_banner1#', '/public/images/banner/banner_1.jpg', NULL, NULL, '2022-02-04 16:38:29', 1),
(2, '#鸿雁骑行_banner2#', '/public/images/banner/banner_2.jpg', NULL, NULL, '2022-02-04 16:38:29', 1),
(3, '#鸿雁骑行_banner3#', '/public/images/banner/banner_3.jpg', NULL, NULL, '2022-02-04 16:38:30', 1),
(4, '#鸿雁骑行_banner4#', '/public/images/banner/banner_4.jpg', NULL, NULL, '2022-02-04 16:38:31', 1);

-- --------------------------------------------------------

--
-- Table structure for table `bicycle`
--

CREATE TABLE `bicycle` (
  `id` int(11) NOT NULL COMMENT '编号',
  `brand` varchar(20) NOT NULL COMMENT '品牌',
  `type` varchar(40) NOT NULL COMMENT '类型',
  `nickname` varchar(20) NOT NULL COMMENT '昵称',
  `cover` varchar(200) NOT NULL COMMENT '封面图片',
  `user_id` int(11) NOT NULL COMMENT '车主id',
  `distance` decimal(10,0) NOT NULL COMMENT '总里程',
  `locked` tinyint(4) NOT NULL COMMENT '是否锁定',
  `date_modified` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '最近修改时间',
  `valid` tinyint(1) NOT NULL COMMENT '是否可用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bicycle`
--

INSERT INTO `bicycle` (`id`, `brand`, `type`, `nickname`, `cover`, `user_id`, `distance`, `locked`, `date_modified`, `valid`) VALUES
(1, '捷安特', 'XTC-ADV 1-E', '我的单车', '/public/images/bicycle/bicycle_1.jpeg', 1, '7500', 0, '2022-02-06 17:26:33', 1);

-- --------------------------------------------------------

--
-- Table structure for table `bike_sale`
--

CREATE TABLE `bike_sale` (
  `id` int(11) NOT NULL COMMENT '编号',
  `bicycle_id` int(11) NOT NULL COMMENT '对应车辆id',
  `seller_id` int(11) NOT NULL COMMENT '卖家id',
  `buyer_id` int(11) DEFAULT NULL COMMENT '买家id',
  `price` decimal(10,2) NOT NULL COMMENT '价格',
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '创建时间',
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp() COMMENT '最近改动时间',
  `state` tinyint(4) NOT NULL DEFAULT 1 COMMENT '交易状态',
  `valid` tinyint(4) NOT NULL DEFAULT 1 COMMENT '是否有效'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `captcha`
--

CREATE TABLE `captcha` (
  `id` int(11) NOT NULL COMMENT '验证码编号',
  `send_to` varchar(10) NOT NULL COMMENT '发送至（手机、邮箱）',
  `content` varchar(20) NOT NULL COMMENT '验证码内容',
  `tel` char(11) DEFAULT NULL COMMENT '发送至手机',
  `email` varchar(50) DEFAULT NULL COMMENT '发送至邮箱',
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '时间戳'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `captcha`
--

INSERT INTO `captcha` (`id`, `send_to`, `content`, `tel`, `email`, `timestamp`) VALUES
(1, 'phone', '666666', '18810559476', '', '2022-02-03 15:50:01'),
(2, 'phone', '748502', '18810559476', '', '2022-02-03 15:47:54'),
(3, 'phone', '836253', '18810559476', '', '2022-02-04 01:20:30'),
(4, 'phone', '183784', '18810559476', '', '2022-02-04 04:03:50'),
(5, 'phone', '750317', '18810559476', '', '2022-02-04 04:36:40'),
(6, 'phone', '153063', '18810559476', '', '2022-02-06 13:55:19'),
(7, 'phone', '711312', '13041096151', '', '2022-02-06 18:26:10'),
(8, 'email', '914700', '', '375960470@qq.com', '2022-02-07 08:42:34'),
(9, 'email', '610001', '', '375960470@qq.com', '2022-02-07 08:43:36');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL COMMENT '编号',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `content` int(11) NOT NULL COMMENT '评论内容',
  `date_modified` int(11) NOT NULL COMMENT '提交时间',
  `event_id` int(11) NOT NULL COMMENT '活动编号',
  `news_id` int(11) NOT NULL COMMENT '资讯编号',
  `moment_id` int(11) NOT NULL COMMENT '对应动态id',
  `valid` tinyint(4) NOT NULL DEFAULT 1 COMMENT '是否有效'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `community`
--

CREATE TABLE `community` (
  `id` int(11) NOT NULL COMMENT '编号',
  `name` varchar(20) NOT NULL COMMENT '名称',
  `user_id` int(11) NOT NULL COMMENT '创建者id',
  `max_size` int(11) NOT NULL DEFAULT 100 COMMENT '最大人数',
  `detail` varchar(1000) NOT NULL COMMENT '简介',
  `cover` varchar(200) NOT NULL COMMENT '封面图片URL',
  `locked` tinyint(4) NOT NULL COMMENT '是否锁定',
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '创建时间',
  `date_modified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '最近修改时间',
  `valid` int(11) NOT NULL COMMENT '是否有效'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `community`
--

INSERT INTO `community` (`id`, `name`, `user_id`, `max_size`, `detail`, `cover`, `locked`, `date_created`, `date_modified`, `valid`) VALUES
(1, '鸿雁车协', 1, 100, '鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协鸿雁车协', '/public/images/community/community_1.png', 0, '2022-02-06 17:43:08', '2022-02-06 17:43:27', 1);

-- --------------------------------------------------------

--
-- Table structure for table `develop`
--

CREATE TABLE `develop` (
  `id` int(11) NOT NULL COMMENT '编号',
  `date` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '发布时间',
  `version` varchar(10) NOT NULL COMMENT '版本号',
  `content` int(11) NOT NULL COMMENT '内容'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `id` int(11) NOT NULL COMMENT '编号',
  `cover` varchar(200) NOT NULL COMMENT '封面图片URL',
  `start_point` longtext NOT NULL COMMENT '起点',
  `end_point` longtext NOT NULL COMMENT '终点',
  `point_list` longtext NOT NULL COMMENT '途经地点',
  `start_time` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '起始时间',
  `end_time` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '结束时间',
  `distance` decimal(10,2) NOT NULL COMMENT '预计里程',
  `detail` varchar(1000) NOT NULL COMMENT '活动详情',
  `author_id` int(11) NOT NULL COMMENT '发布活动的用户id',
  `leader_id` int(11) NOT NULL COMMENT '领骑id'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id`, `cover`, `start_point`, `end_point`, `point_list`, `start_time`, `end_time`, `distance`, `detail`, `author_id`, `leader_id`) VALUES
(1, 'http://www.idongsports.com/news/pics/20200513/1589361727.jpg', '{\"coordinate\": \"GCJ-02\", \"longitude\": 121.366961,\"latitude\": 31.190049}', '{\"coordinate\": \"GCJ-02\", \"longitude\": 121.366861,\"latitude\": 31.190049}', '[{\"coordinate\": \"GCJ-02\", \"longitude\": 121.366861,\"latitude\": 31.190049},{\"coordinate\": \"GCJ-02\", \"longitude\": 121.366761,\"latitude\": 31.190049}]', '2022-02-07 02:04:09', '2022-02-07 11:04:09', '123.23', '沿途一路风光旖旎,还点缀着零星的古村庄,越山岭、穿隧道、环山绕湖,犹如在田园诗般的画境里,条条大道皆美景,湖光,山色,蓝天,白云...沿途一路风光旖旎,还点缀着零星的古村庄,越山岭、穿隧道、环山绕湖,犹如在田园诗般的画境里,条条大道皆美景,湖光,山色,蓝天,白云...沿途一路风光旖旎,还点缀着零星的古村庄,越山岭、穿隧道、环山绕湖,犹如在田园诗般的画境里,条条大道皆美景,湖光,山色,蓝天,白云...', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `event_image`
--

CREATE TABLE `event_image` (
  `id` int(11) NOT NULL COMMENT '编号',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `event_id` int(11) NOT NULL COMMENT '活动id',
  `image` varchar(200) NOT NULL COMMENT '图片URL',
  `location` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '地理位置（GeoPoint）',
  `valid` tinyint(4) NOT NULL DEFAULT 1 COMMENT '是否有效'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `event_image`
--

INSERT INTO `event_image` (`id`, `user_id`, `event_id`, `image`, `location`, `valid`) VALUES
(1, 1, 1, 'public/images/banner/banner_1.jpg', '{\"coordinate\": \"GCJ-02\", \"longitude\": 121.366961,\"latitude\": 31.190049}', 1);

-- --------------------------------------------------------

--
-- Table structure for table `event_signin`
--

CREATE TABLE `event_signin` (
  `id` int(11) NOT NULL COMMENT '编号',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `event_id` int(11) NOT NULL COMMENT '活动id',
  `date` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '报名时间',
  `valid` tinyint(4) NOT NULL DEFAULT 1 COMMENT '是否有效'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `event_signin`
--

INSERT INTO `event_signin` (`id`, `user_id`, `event_id`, `date`, `valid`) VALUES
(1, 1, 1, '2022-02-06 02:07:11', 1);

-- --------------------------------------------------------

--
-- Table structure for table `moment`
--

CREATE TABLE `moment` (
  `id` int(11) NOT NULL COMMENT '编号',
  `user_id` int(11) NOT NULL COMMENT '发布动态的用户编号',
  `content` varchar(1000) NOT NULL COMMENT '动态内容',
  `image` varchar(200) NOT NULL COMMENT '图片URL',
  `event_id` int(11) DEFAULT NULL COMMENT '对应活动id',
  `valid` tinyint(4) NOT NULL DEFAULT 1 COMMENT '是否有效'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL COMMENT '编号',
  `user_id` int(11) NOT NULL COMMENT '发布资讯的用户id',
  `date_modified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '最近改动时间',
  `content` longtext NOT NULL COMMENT '内容（富文本）',
  `event_id` int(11) DEFAULT NULL COMMENT '对应活动id',
  `valid` tinyint(4) NOT NULL DEFAULT 1 COMMENT '是否有效'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL COMMENT '用户id',
  `username` varchar(20) NOT NULL COMMENT '用户名',
  `nickname` varchar(20) NOT NULL COMMENT '昵称',
  `address` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '\'{"provinceName":"北京市","provinceId":"110000","cityName":"北京城区","cityId":"110100","areaName":"东城区","areaId":"110101"}\'' COMMENT '现居地',
  `email` varchar(50) NOT NULL COMMENT '电子邮箱',
  `tel` char(11) NOT NULL COMMENT '手机',
  `avatar` varchar(100) NOT NULL DEFAULT '/public/images/default_avatar.png' COMMENT '头像URL',
  `password` varchar(20) NOT NULL COMMENT '密码',
  `credit` int(11) NOT NULL DEFAULT 600 COMMENT '信用积分',
  `date_modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '最近修改时间',
  `is_manager` tinyint(4) NOT NULL DEFAULT 0 COMMENT '是否为管理员',
  `detail` varchar(1000) NOT NULL DEFAULT '这个人很懒，TA什么也没有说' COMMENT '用户签名',
  `valid` tinyint(4) NOT NULL DEFAULT 1 COMMENT '是否有效'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `nickname`, `address`, `email`, `tel`, `avatar`, `password`, `credit`, `date_modified`, `is_manager`, `detail`, `valid`) VALUES
(1, 'android1', 'TrWyFowrd', '{\"provinceName\":\"北京市\",\"provinceId\":\"110000\",\"cityName\":\"北京城区\",\"cityId\":\"110100\",\"areaName\":\"东城区\",\"areaId\":\"110101\"}', '951947409@qq.com', '18810559476', '/public/images/avatar/default_avatar.png', 'Sam_2019', 600, '2022-02-07 10:18:41', 1, '这个人很懒，TA什么也没有说这个人很懒，TA什么也没有说这个人很懒，TA什么也没有说', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bicycle`
--
ALTER TABLE `bicycle`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bike_sale`
--
ALTER TABLE `bike_sale`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `captcha`
--
ALTER TABLE `captcha`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `community`
--
ALTER TABLE `community`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event_image`
--
ALTER TABLE `event_image`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event_signin`
--
ALTER TABLE `event_signin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `moment`
--
ALTER TABLE `moment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `tel` (`tel`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
