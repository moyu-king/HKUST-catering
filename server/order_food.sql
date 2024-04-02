/*
 Navicat Premium Data Transfer

 Source Server         : database_local
 Source Server Type    : MySQL
 Source Server Version : 80300 (8.3.0)
 Source Host           : 127.0.0.1:3306
 Source Schema         : order_food

 Target Server Type    : MySQL
 Target Server Version : 80300 (8.3.0)
 File Encoding         : 65001

 Date: 03/04/2024 03:04:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_as_cs NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_as_cs NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_as_cs NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_as_cs NULL DEFAULT NULL,
  `alias` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_as_cs NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_as_cs NULL DEFAULT NULL,
  `shop_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_as_cs NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bg_0900_as_cs ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for coupon
-- ----------------------------
DROP TABLE IF EXISTS `coupon`;
CREATE TABLE `coupon`  (
  `coupon_id` int(10) UNSIGNED ZEROFILL NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_as_cs NULL DEFAULT NULL,
  `limit` int NULL DEFAULT NULL,
  `create_time` bigint NULL DEFAULT NULL,
  `expireIn` bigint(13) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  PRIMARY KEY (`coupon_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bg_0900_as_cs ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for food
-- ----------------------------
DROP TABLE IF EXISTS `food`;
CREATE TABLE `food`  (
  `food_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_as_cs NOT NULL,
  `food_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_as_cs NULL DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_as_cs NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_as_cs NULL DEFAULT NULL,
  `price` float(10, 2) NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_as_cs NULL DEFAULT NULL,
  PRIMARY KEY (`food_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bg_0900_as_cs ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for food_menu
-- ----------------------------
DROP TABLE IF EXISTS `food_menu`;
CREATE TABLE `food_menu`  (
  `food_menu_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_as_cs NOT NULL,
  `food_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_as_cs NOT NULL,
  `date` bigint(13) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `number` int(10) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  PRIMARY KEY (`food_menu_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bg_0900_as_cs ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for order_food
-- ----------------------------
DROP TABLE IF EXISTS `order_food`;
CREATE TABLE `order_food`  (
  `order_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_as_cs NOT NULL,
  `food_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_as_cs NOT NULL,
  `number` int NULL DEFAULT NULL,
  PRIMARY KEY (`order_id`, `food_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bg_0900_as_cs ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `order_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_as_cs NOT NULL,
  `student_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_as_cs NOT NULL,
  `admin_phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_as_cs NULL DEFAULT NULL,
  `status` int NULL DEFAULT NULL,
  `create_time` bigint(13) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `order_type` int NULL DEFAULT NULL,
  `price` int NULL DEFAULT NULL,
  `discount` int NULL DEFAULT NULL,
  PRIMARY KEY (`order_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bg_0900_as_cs ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_as_cs NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_as_cs NOT NULL,
  `student_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_as_cs NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_as_cs NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_as_cs NULL DEFAULT NULL,
  `payment_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_as_cs NULL DEFAULT NULL,
  `wlallet` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_as_cs NULL DEFAULT NULL,
  `avatart` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_as_cs NULL DEFAULT NULL,
  PRIMARY KEY (`student_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bg_0900_as_cs ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
