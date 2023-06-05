/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 100424
 Source Host           : localhost:3306
 Source Schema         : unibookstore

 Target Server Type    : MySQL
 Target Server Version : 100424
 File Encoding         : 65001

 Date: 06/06/2023 05:56:27
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for buku
-- ----------------------------
DROP TABLE IF EXISTS `buku`;
CREATE TABLE `buku`  (
  `id` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `kategori` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `nama` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `harga` int NULL DEFAULT NULL,
  `stok` int NULL DEFAULT NULL,
  `id_penerbit` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of buku
-- ----------------------------
INSERT INTO `buku` VALUES ('36885', 'laborum', 'Lab Kimia', 844066, 586, '33', NULL, '2023-06-05 22:30:57');
INSERT INTO `buku` VALUES ('38105', 'sunt', 'Natus rerum velit non temporibus.', 788412, 399, '3671', NULL, NULL);
INSERT INTO `buku` VALUES ('41415', 'voluptates', 'Sapiente sunt cupiditate sed reprehenderit.', 312401, 316, '740', NULL, NULL);
INSERT INTO `buku` VALUES ('432', 'saepe', 'Culpa ab inventore dolorem.', 489323, 212, '3126', NULL, NULL);
INSERT INTO `buku` VALUES ('44704', 'eos', 'Quam porro laboriosam.', 983837, 1, '8715', NULL, NULL);
INSERT INTO `buku` VALUES ('4873', 'quia', 'Quia dolore possimus exercitationem ut.', 536168, 572, '9689', NULL, NULL);
INSERT INTO `buku` VALUES ('49086', 'ad', 'Sit laudantium optio cupiditate et.', 510815, 358, '5836', NULL, NULL);
INSERT INTO `buku` VALUES ('6896', 'doloremque', 'Reprehenderit voluptas molestiae quis.', 647032, 245, '5062', NULL, NULL);
INSERT INTO `buku` VALUES ('6925', 'dolor', 'Harum culpa et in.', 65258, 370, '7864', NULL, NULL);
INSERT INTO `buku` VALUES ('70718', 'corporis', 'Quia ratione perspiciatis.', 178129, 498, '7864', NULL, NULL);
INSERT INTO `buku` VALUES ('72272', 'assumenda', 'Deleniti aliquam et nobis iste.', 372948, 643, '3315', NULL, NULL);
INSERT INTO `buku` VALUES ('73842', 'molestiae', 'Distinctio ut quibusdam atque esse dolore.', 149106, 95, '76', NULL, NULL);
INSERT INTO `buku` VALUES ('76090', 'fuga', 'Autem sed velit repellat.', 187342, 836, '8715', NULL, NULL);
INSERT INTO `buku` VALUES ('77127', 'harum', 'Earum est a voluptatem dolores perspiciatis.', 959299, 106, '9374', NULL, NULL);
INSERT INTO `buku` VALUES ('78849', 'excepturi', 'Sequi possimus modi nostrum.', 340482, 929, '3381', NULL, NULL);
INSERT INTO `buku` VALUES ('82358', 'quae', 'Aut vel nihil quibusdam et et.', 73950, 842, '8248', NULL, NULL);
INSERT INTO `buku` VALUES ('82918', 'nihil', 'Et tenetur qui non dolorem nobis.', 100962, 700, '77', NULL, NULL);
INSERT INTO `buku` VALUES ('89335', 'ut', 'Esse vel tempore incidunt commodi sed.', 991440, 5, '7766', NULL, NULL);
INSERT INTO `buku` VALUES ('93719', 'sit', 'Non vel dolor unde velit dicta.', 567208, 214, '5248', NULL, NULL);
INSERT INTO `buku` VALUES ('94149', 'praesentium', 'Ullam praesentium hic.', 75288, 62, '3126', NULL, NULL);
INSERT INTO `buku` VALUES ('94338', 'qui', 'Voluptatem nesciunt suscipit veniam qui id.', 909640, 442, '8248', NULL, NULL);
INSERT INTO `buku` VALUES ('DA123', 'Pelajaran', 'Matematika Dasar', 90000, 99, '4294', '2023-06-05 22:19:48', '2023-06-05 22:19:48');

-- ----------------------------
-- Table structure for penerbit
-- ----------------------------
DROP TABLE IF EXISTS `penerbit`;
CREATE TABLE `penerbit`  (
  `id` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `alamat` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `kota` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `telpon` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of penerbit
-- ----------------------------
INSERT INTO `penerbit` VALUES ('1123', 'Wanda Dani', '4637 Pfeffer Ferry Apt. 852', 'Chloefort', '303.463.4097', NULL, '2023-06-05 22:47:14');
INSERT INTO `penerbit` VALUES ('3126', 'Dr. Columbus Goyette DVM', '782 Thiel Shoal Suite 689', 'Jaronhaven', '(742)766-7027x5', NULL, NULL);
INSERT INTO `penerbit` VALUES ('3381', 'Dr. Jess Waters DVM', '7322 Durgan Turnpike Suite 632', 'Wehnermouth', '+37(5)670376714', NULL, NULL);
INSERT INTO `penerbit` VALUES ('3671', 'Savion Muller', '19867 Ritchie Mall Suite 667', 'Lonnyview', '658.385.0835x06', NULL, NULL);
INSERT INTO `penerbit` VALUES ('4017', 'Miss Stella Barton IV', '843 Lang Fields Suite 082', 'South Alexanne', '(957)759-9601x5', NULL, NULL);
INSERT INTO `penerbit` VALUES ('4294', 'Madelyn Medhurst', '335 McClure Meadow', 'Ofeliaburgh', '(741)090-2802x6', NULL, NULL);
INSERT INTO `penerbit` VALUES ('47', 'Agustina Gibson DVM', '3525 Stracke Crossing', 'Tanyamouth', '+77(7)402676118', NULL, NULL);
INSERT INTO `penerbit` VALUES ('5062', 'Corene Wehner DVM', '1417 Cruickshank Hill', 'East Melissa', '+82(7)893784774', NULL, NULL);
INSERT INTO `penerbit` VALUES ('5248', 'Prof. Santa Trantow MD', '191 Daniel Springs', 'Zemlakhaven', '1-320-216-4149', NULL, NULL);
INSERT INTO `penerbit` VALUES ('5836', 'Alia Grady', '597 Lang Grove', 'West Rachelletown', '756-392-7980x43', NULL, NULL);
INSERT INTO `penerbit` VALUES ('651', 'Kade Langosh', '370 Gerry Canyon Suite 054', 'Port Orland', '611.518.7453x47', NULL, NULL);
INSERT INTO `penerbit` VALUES ('7', 'Xzavier Considine', '0778 Rosalyn Ways Apt. 596', 'West Kaileebury', '358.109.9703', NULL, NULL);
INSERT INTO `penerbit` VALUES ('740', 'Lamont Schimmel', '25467 Gerard Road Suite 784', 'South Adaline', '(113)027-1575', NULL, NULL);
INSERT INTO `penerbit` VALUES ('76', 'Alfredo Toy', '0753 Mason Manors', 'Kellymouth', '(014)027-9371x0', NULL, NULL);
INSERT INTO `penerbit` VALUES ('77', 'Ms. Georgiana Murray PhD', '153 Hazel Walk Suite 679', 'South Ethelview', '576.300.8935x57', NULL, NULL);
INSERT INTO `penerbit` VALUES ('7766', 'Mr. Marley Grady MD', '22788 Roob Prairie', 'Georgemouth', '744-588-9140', NULL, NULL);
INSERT INTO `penerbit` VALUES ('7864', 'Abby Vandervort', '15777 Josie Fields', 'South Delia', '856.322.8348', NULL, NULL);
INSERT INTO `penerbit` VALUES ('8248', 'Angeline Jerde', '16784 Jaskolski Loop', 'Bartonstad', '+47(8)840487476', NULL, NULL);
INSERT INTO `penerbit` VALUES ('8715', 'Palma Jacobs V', '8394 Herzog Wall Apt. 866', 'South Kirkstad', '(479)533-1896', NULL, NULL);
INSERT INTO `penerbit` VALUES ('8806', 'Dr. Lafayette Murray', '3043 Armstrong Walk', 'New Astridfurt', '05754492848', NULL, NULL);
INSERT INTO `penerbit` VALUES ('9374', 'Lester Hackett', '34113 Madonna Corners Apt. 510', 'Estelbury', '916-826-0302', NULL, NULL);
INSERT INTO `penerbit` VALUES ('9506', 'Beulah Pollich', '6097 Hane Forks Apt. 628', 'Port Gennaroport', '969-697-6595x84', NULL, NULL);
INSERT INTO `penerbit` VALUES ('9689', 'Mr. Faustino Anderson PhD', '04473 Moore Hill Suite 725', 'East Makennashire', '(667)335-7439x6', NULL, NULL);
INSERT INTO `penerbit` VALUES ('9822', 'Elody Quitzon', '873 Annabell Mill Suite 925', 'Lake Cordelia', '737.639.1982', NULL, NULL);
INSERT INTO `penerbit` VALUES ('AD01', 'Ahmad Print', 'Jl. Cigalong', 'Bandung', '02291831', '2023-06-05 22:39:52', '2023-06-05 22:39:52');
INSERT INTO `penerbit` VALUES ('PA00', 'Sygma Corp', 'Jl. Babakansari', 'Kota Bandung', '02270129381', '2023-06-05 19:22:54', '2023-06-05 19:22:54');

SET FOREIGN_KEY_CHECKS = 1;
