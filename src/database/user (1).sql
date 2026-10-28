-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 27 fév. 2026 à 08:10
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `user`
--

-- --------------------------------------------------------

--
-- Structure de la table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(2, 'App\\Models\\User', 8),
(2, 'App\\Models\\User', 9),
(2, 'App\\Models\\User', 10),
(2, 'App\\Models\\User', 11),
(2, 'App\\Models\\User', 12),
(2, 'App\\Models\\User', 13),
(2, 'App\\Models\\User', 14),
(2, 'App\\Models\\User', 15),
(2, 'App\\Models\\User', 16),
(2, 'App\\Models\\User', 17),
(2, 'App\\Models\\User', 18),
(2, 'App\\Models\\User', 19),
(2, 'App\\Models\\User', 20),
(2, 'App\\Models\\User', 21),
(2, 'App\\Models\\User', 22),
(2, 'App\\Models\\User', 23),
(2, 'App\\Models\\User', 24),
(2, 'App\\Models\\User', 25),
(2, 'App\\Models\\User', 26),
(2, 'App\\Models\\User', 27),
(2, 'App\\Models\\User', 28),
(2, 'App\\Models\\User', 29),
(2, 'App\\Models\\User', 30),
(2, 'App\\Models\\User', 31),
(2, 'App\\Models\\User', 32),
(2, 'App\\Models\\User', 33),
(2, 'App\\Models\\User', 34),
(2, 'App\\Models\\User', 35),
(2, 'App\\Models\\User', 36),
(2, 'App\\Models\\User', 37),
(2, 'App\\Models\\User', 38),
(2, 'App\\Models\\User', 39),
(2, 'App\\Models\\User', 40),
(2, 'App\\Models\\User', 41),
(2, 'App\\Models\\User', 43),
(2, 'App\\Models\\User', 44),
(2, 'App\\Models\\User', 50),
(2, 'App\\Models\\User', 56),
(2, 'App\\Models\\User', 64),
(2, 'App\\Models\\User', 65),
(2, 'App\\Models\\User', 66),
(2, 'App\\Models\\User', 67),
(2, 'App\\Models\\User', 68),
(2, 'App\\Models\\User', 69),
(2, 'App\\Models\\User', 70),
(2, 'App\\Models\\User', 71),
(2, 'App\\Models\\User', 72),
(2, 'App\\Models\\User', 73),
(2, 'App\\Models\\User', 74),
(2, 'App\\Models\\User', 75),
(2, 'App\\Models\\User', 76),
(2, 'App\\Models\\User', 77),
(2, 'App\\Models\\User', 78),
(2, 'App\\Models\\User', 79),
(2, 'App\\Models\\User', 80),
(2, 'App\\Models\\User', 81),
(2, 'App\\Models\\User', 82),
(2, 'App\\Models\\User', 83),
(2, 'App\\Models\\User', 84),
(2, 'App\\Models\\User', 85),
(2, 'App\\Models\\User', 86),
(2, 'App\\Models\\User', 87),
(2, 'App\\Models\\User', 88),
(2, 'App\\Models\\User', 89),
(2, 'App\\Models\\User', 90),
(2, 'App\\Models\\User', 91),
(2, 'App\\Models\\User', 92),
(2, 'App\\Models\\User', 93),
(2, 'App\\Models\\User', 94),
(2, 'App\\Models\\User', 96),
(2, 'App\\Models\\User', 97),
(2, 'App\\Models\\User', 98),
(2, 'App\\Models\\User', 99),
(2, 'App\\Models\\User', 100),
(2, 'App\\Models\\User', 101),
(2, 'App\\Models\\User', 102),
(2, 'App\\Models\\User', 103),
(2, 'App\\Models\\User', 104),
(2, 'App\\Models\\User', 105),
(2, 'App\\Models\\User', 106),
(2, 'App\\Models\\User', 108),
(2, 'App\\Models\\User', 109),
(2, 'App\\Models\\User', 110),
(2, 'App\\Models\\User', 111),
(2, 'App\\Models\\User', 112),
(2, 'App\\Models\\User', 113),
(2, 'App\\Models\\User', 114),
(2, 'App\\Models\\User', 115),
(2, 'App\\Models\\User', 116),
(2, 'App\\Models\\User', 117),
(2, 'App\\Models\\User', 118),
(2, 'App\\Models\\User', 119),
(2, 'App\\Models\\User', 120),
(2, 'App\\Models\\User', 121),
(2, 'App\\Models\\User', 123),
(2, 'App\\Models\\User', 124),
(2, 'App\\Models\\User', 125),
(2, 'App\\Models\\User', 126),
(2, 'App\\Models\\User', 127),
(2, 'App\\Models\\User', 128),
(2, 'App\\Models\\User', 129),
(2, 'App\\Models\\User', 130),
(2, 'App\\Models\\User', 131),
(2, 'App\\Models\\User', 132),
(2, 'App\\Models\\User', 133),
(2, 'App\\Models\\User', 134),
(2, 'App\\Models\\User', 135),
(2, 'App\\Models\\User', 136),
(2, 'App\\Models\\User', 137),
(2, 'App\\Models\\User', 138),
(2, 'App\\Models\\User', 139),
(2, 'App\\Models\\User', 140),
(2, 'App\\Models\\User', 141),
(2, 'App\\Models\\User', 142),
(2, 'App\\Models\\User', 143),
(2, 'App\\Models\\User', 144),
(2, 'App\\Models\\User', 145),
(2, 'App\\Models\\User', 146),
(2, 'App\\Models\\User', 147),
(2, 'App\\Models\\User', 148),
(2, 'App\\Models\\User', 149),
(2, 'App\\Models\\User', 150),
(2, 'App\\Models\\User', 151),
(2, 'App\\Models\\User', 152),
(2, 'App\\Models\\User', 153),
(2, 'App\\Models\\User', 154),
(2, 'App\\Models\\User', 155),
(2, 'App\\Models\\User', 156),
(2, 'App\\Models\\User', 157),
(2, 'App\\Models\\User', 158),
(2, 'App\\Models\\User', 159),
(2, 'App\\Models\\User', 160),
(2, 'App\\Models\\User', 161),
(2, 'App\\Models\\User', 162),
(2, 'App\\Models\\User', 168),
(2, 'App\\Models\\User', 169),
(2, 'App\\Models\\User', 170),
(2, 'App\\Models\\User', 172),
(2, 'App\\Models\\User', 173),
(2, 'App\\Models\\User', 174),
(2, 'App\\Models\\User', 175),
(2, 'App\\Models\\User', 176),
(2, 'App\\Models\\User', 177),
(2, 'App\\Models\\User', 178),
(2, 'App\\Models\\User', 179),
(2, 'App\\Models\\User', 181),
(2, 'App\\Models\\User', 182),
(2, 'App\\Models\\User', 183),
(2, 'App\\Models\\User', 184),
(2, 'App\\Models\\User', 186),
(2, 'App\\Models\\User', 187),
(2, 'App\\Models\\User', 188),
(2, 'App\\Models\\User', 189),
(2, 'App\\Models\\User', 190),
(2, 'App\\Models\\User', 191),
(2, 'App\\Models\\User', 192),
(2, 'App\\Models\\User', 193),
(2, 'App\\Models\\User', 194),
(2, 'App\\Models\\User', 195),
(2, 'App\\Models\\User', 196),
(2, 'App\\Models\\User', 197),
(2, 'App\\Models\\User', 198),
(2, 'App\\Models\\User', 199),
(2, 'App\\Models\\User', 200),
(2, 'App\\Models\\User', 201),
(2, 'App\\Models\\User', 202),
(2, 'App\\Models\\User', 203),
(2, 'App\\Models\\User', 207),
(2, 'App\\Models\\User', 208),
(2, 'App\\Models\\User', 209),
(2, 'App\\Models\\User', 210),
(2, 'App\\Models\\User', 211),
(2, 'App\\Models\\User', 212),
(2, 'App\\Models\\User', 213),
(2, 'App\\Models\\User', 214),
(2, 'App\\Models\\User', 215),
(2, 'App\\Models\\User', 216),
(2, 'App\\Models\\User', 217),
(2, 'App\\Models\\User', 218),
(2, 'App\\Models\\User', 219),
(2, 'App\\Models\\User', 220),
(2, 'App\\Models\\User', 221),
(2, 'App\\Models\\User', 222),
(2, 'App\\Models\\User', 223),
(2, 'App\\Models\\User', 224),
(2, 'App\\Models\\User', 225),
(2, 'App\\Models\\User', 226),
(2, 'App\\Models\\User', 227),
(2, 'App\\Models\\User', 228),
(2, 'App\\Models\\User', 229),
(2, 'App\\Models\\User', 230),
(2, 'App\\Models\\User', 231),
(2, 'App\\Models\\User', 232),
(2, 'App\\Models\\User', 233),
(2, 'App\\Models\\User', 234),
(2, 'App\\Models\\User', 235),
(2, 'App\\Models\\User', 236),
(2, 'App\\Models\\User', 237),
(2, 'App\\Models\\User', 238),
(2, 'App\\Models\\User', 239),
(2, 'App\\Models\\User', 240),
(2, 'App\\Models\\User', 241),
(2, 'App\\Models\\User', 242),
(2, 'App\\Models\\User', 243),
(2, 'App\\Models\\User', 244),
(2, 'App\\Models\\User', 245),
(2, 'App\\Models\\User', 246),
(2, 'App\\Models\\User', 247),
(2, 'App\\Models\\User', 248),
(2, 'App\\Models\\User', 249),
(2, 'App\\Models\\User', 255),
(2, 'App\\Models\\User', 257),
(2, 'App\\Models\\User', 260),
(2, 'App\\Models\\User', 261),
(2, 'App\\Models\\User', 268),
(2, 'App\\Models\\User', 269),
(2, 'App\\Models\\User', 270),
(2, 'App\\Models\\User', 271),
(2, 'App\\Models\\User', 272),
(2, 'App\\Models\\User', 273),
(2, 'App\\Models\\User', 274),
(2, 'App\\Models\\User', 275),
(2, 'App\\Models\\User', 276),
(2, 'App\\Models\\User', 277),
(2, 'App\\Models\\User', 278),
(2, 'App\\Models\\User', 279),
(2, 'App\\Models\\User', 280),
(2, 'App\\Models\\User', 281),
(2, 'App\\Models\\User', 282),
(2, 'App\\Models\\User', 283),
(2, 'App\\Models\\User', 284),
(2, 'App\\Models\\User', 285),
(2, 'App\\Models\\User', 286),
(2, 'App\\Models\\User', 287),
(2, 'App\\Models\\User', 288),
(2, 'App\\Models\\User', 289),
(2, 'App\\Models\\User', 290),
(2, 'App\\Models\\User', 291),
(2, 'App\\Models\\User', 292),
(2, 'App\\Models\\User', 293),
(2, 'App\\Models\\User', 294),
(2, 'App\\Models\\User', 295),
(2, 'App\\Models\\User', 296),
(2, 'App\\Models\\User', 297),
(2, 'App\\Models\\User', 298),
(2, 'App\\Models\\User', 299),
(2, 'App\\Models\\User', 300),
(2, 'App\\Models\\User', 302),
(2, 'App\\Models\\User', 303),
(2, 'App\\Models\\User', 304),
(2, 'App\\Models\\User', 305),
(2, 'App\\Models\\User', 306),
(2, 'App\\Models\\User', 307),
(2, 'App\\Models\\User', 308),
(2, 'App\\Models\\User', 309),
(2, 'App\\Models\\User', 310),
(2, 'App\\Models\\User', 311),
(2, 'App\\Models\\User', 312),
(2, 'App\\Models\\User', 313),
(2, 'App\\Models\\User', 314),
(2, 'App\\Models\\User', 315),
(2, 'App\\Models\\User', 316),
(2, 'App\\Models\\User', 317),
(2, 'App\\Models\\User', 318),
(2, 'App\\Models\\User', 319),
(2, 'App\\Models\\User', 320),
(2, 'App\\Models\\User', 321),
(2, 'App\\Models\\User', 322),
(2, 'App\\Models\\User', 323),
(2, 'App\\Models\\User', 324),
(2, 'App\\Models\\User', 325),
(2, 'App\\Models\\User', 326),
(2, 'App\\Models\\User', 327),
(2, 'App\\Models\\User', 328),
(2, 'App\\Models\\User', 329),
(2, 'App\\Models\\User', 330),
(2, 'App\\Models\\User', 331),
(2, 'App\\Models\\User', 332),
(2, 'App\\Models\\User', 333),
(2, 'App\\Models\\User', 334),
(2, 'App\\Models\\User', 335),
(2, 'App\\Models\\User', 336),
(2, 'App\\Models\\User', 337),
(2, 'App\\Models\\User', 338),
(2, 'App\\Models\\User', 339),
(2, 'App\\Models\\User', 342),
(2, 'App\\Models\\User', 343),
(2, 'App\\Models\\User', 344),
(2, 'App\\Models\\User', 345),
(2, 'App\\Models\\User', 347),
(2, 'App\\Models\\User', 348),
(2, 'App\\Models\\User', 349),
(2, 'App\\Models\\User', 350),
(2, 'App\\Models\\User', 351),
(2, 'App\\Models\\User', 352),
(2, 'App\\Models\\User', 353),
(2, 'App\\Models\\User', 354),
(2, 'App\\Models\\User', 355),
(2, 'App\\Models\\User', 356),
(2, 'App\\Models\\User', 357),
(2, 'App\\Models\\User', 358),
(2, 'App\\Models\\User', 359),
(2, 'App\\Models\\User', 360),
(2, 'App\\Models\\User', 361),
(2, 'App\\Models\\User', 362),
(2, 'App\\Models\\User', 363),
(2, 'App\\Models\\User', 364),
(2, 'App\\Models\\User', 365),
(2, 'App\\Models\\User', 366),
(2, 'App\\Models\\User', 367),
(2, 'App\\Models\\User', 368),
(2, 'App\\Models\\User', 369),
(2, 'App\\Models\\User', 370),
(2, 'App\\Models\\User', 371),
(2, 'App\\Models\\User', 372),
(2, 'App\\Models\\User', 373),
(2, 'App\\Models\\User', 374),
(2, 'App\\Models\\User', 375),
(2, 'App\\Models\\User', 377),
(2, 'App\\Models\\User', 382),
(2, 'App\\Models\\User', 383),
(2, 'App\\Models\\User', 384),
(2, 'App\\Models\\User', 385),
(2, 'App\\Models\\User', 388),
(2, 'App\\Models\\User', 389),
(2, 'App\\Models\\User', 390),
(2, 'App\\Models\\User', 391),
(2, 'App\\Models\\User', 392),
(2, 'App\\Models\\User', 393),
(2, 'App\\Models\\User', 394),
(2, 'App\\Models\\User', 395),
(2, 'App\\Models\\User', 396),
(2, 'App\\Models\\User', 397),
(2, 'App\\Models\\User', 398),
(2, 'App\\Models\\User', 399),
(2, 'App\\Models\\User', 400),
(2, 'App\\Models\\User', 405),
(2, 'App\\Models\\User', 406),
(2, 'App\\Models\\User', 407),
(2, 'App\\Models\\User', 408),
(2, 'App\\Models\\User', 409),
(2, 'App\\Models\\User', 410),
(2, 'App\\Models\\User', 411),
(2, 'App\\Models\\User', 412),
(2, 'App\\Models\\User', 413),
(3, 'App\\Models\\User', 2);

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'Administrateur', 'web', NULL, NULL),
(2, 'Employer', 'web', NULL, NULL),
(3, 'Content_manager', 'web', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `services`
--

CREATE TABLE `services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `libelle` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `direction_parent` int(11) DEFAULT NULL,
  `categorie` varchar(255) DEFAULT NULL,
  `roles_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `services`
--

INSERT INTO `services` (`id`, `libelle`, `code`, `direction_parent`, `categorie`, `roles_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(10, 'Direction Générale', 'DG', NULL, 'DIRECTION', NULL, '2025-12-08 12:52:22', '2025-12-08 12:52:22', NULL),
(11, 'Direction de l\'Audit Interne et de l\'Inspection', 'DAI', 10, 'DIRECTION', NULL, '2025-12-08 12:52:22', '2025-12-08 12:52:22', NULL),
(12, 'Direction Générale Adjointe chargée de Finance et du Patrimoine', 'DGAFP', 10, 'DIRECTION', NULL, '2025-12-08 12:52:22', '2025-12-08 12:52:22', NULL),
(13, 'Direction Financière et Comptable', 'DFC', 10, 'DIRECTION', NULL, '2025-12-08 12:52:22', '2025-12-08 12:52:22', NULL),
(14, 'Direction Générale Adjointe chargée des Risques et Conformité', 'DGARC', 10, 'DIRECTION', NULL, '2025-12-08 12:52:22', '2025-12-08 12:52:22', NULL),
(15, 'Direction des Systèmes d’Information et de la Transformation Numérique', 'DSITN', 10, 'DIRECTION', NULL, '2025-12-08 12:52:22', '2025-12-08 12:52:22', NULL),
(16, 'Direction des Ressources Humaines', 'DRH', 10, 'DIRECTION', NULL, '2025-12-08 12:52:22', '2025-12-08 12:52:22', NULL),
(17, 'Direction de l\'Innovation et du Développement', 'DID', 10, 'DIRECTION', NULL, '2025-12-08 12:52:22', '2025-12-08 12:52:22', NULL),
(18, 'Direction des Opération de Crédit', 'DOC', 10, 'DIRECTION', NULL, '2025-12-08 12:52:22', '2025-12-08 12:52:22', NULL),
(71, 'Direction Commerciale et Réseau\r\n', 'DCR', 10, 'DIRECTION', NULL, NULL, NULL, NULL),
(72, 'Direction des Moyens Généraux\r\n', 'DMG', 10, 'DIRECTION', NULL, NULL, NULL, NULL),
(73, 'Service Immobilisation et Chaîne d\'Approvisionnement', 'SIA', 72, 'SERVICE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(74, 'Service Contrôle', 'SCTRL', 14, 'SERVICE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(75, 'Service de l’Appui et de la Coordination', 'SAC', 71, 'SERVICE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(76, 'Service des Grands Travaux', 'SGT', 12, 'SERVICE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(77, 'Service Archive et Documentation', 'SAD', 72, 'SERVICE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(78, 'Service Juridique et Contentieux', 'SJC', 14, 'SERVICE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(79, 'Responsable des Marchés Publics', 'PRMP', 10, 'SERVICE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(80, 'Service Animation du Réseau', 'SAR', 71, 'SERVICE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(81, 'Service Valorisation du Patrimoine', 'SVP', 72, 'SERVICE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(82, 'Service Logistique et Maintenance', 'SLM', 72, 'SERVICE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(83, 'CEM - WU 001 TSARALALANA', 'CEM 001', 132, 'AGENCE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(84, 'Service Infrastructure et Exploitation', 'SIE', 15, 'SERVICE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(85, 'CEM - WU 002 FIANARANTSOA', 'CEM 002', 132, 'AGENCE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(86, 'CEM - WU 086 TAMATAVE', 'CEM 086', 132, 'AGENCE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(87, 'CEM - WU 049 ANTSAKAVIRO', 'CEM 049', 132, 'AGENCE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(88, 'CEM - WU 003 TAMATAVE', 'CEM 003', 132, 'AGENCE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(89, 'CEM - WU 004 MAJUNGA', 'CEM 004', 132, 'AGENCE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(90, 'CEM - WU 048 ANDRAVOAHANGY', 'CEM 048', 132, 'AGENCE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(91, 'Service Authentification', 'SAUT', 13, 'SERVICE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(92, 'Agence dédiée WU Majunga', 'WU 004', 132, 'AGENCE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(93, 'CEM - WU 028 AMBALAVAO', 'CEM 028', 132, 'AGENCE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(94, 'Service Recherche et Développement des Offres', 'SDO', 17, 'SERVICE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(95, 'CEM - WU 020 TSIROANOMANDIDY', 'CEM 020', 132, 'AGENCE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(96, 'CEM - WU 008 TULEAR', 'CEM 008', 132, 'AGENCE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(97, 'CEM - WU 005 AMBOSITRA', 'CEM 005', 132, 'AGENCE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(98, 'Agence dédiée WU Diégo I', 'WU 006 I', 132, 'AGENCE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(99, 'CEM - WU 006 DIEGO', 'CEM 006', 132, 'AGENCE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(100, 'CEM - WU 019 MORAMANGA', 'CEM 019', 132, 'AGENCE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(101, 'Service de l’Education Financière', 'SEF', 71, 'SERVICE', NULL, '2025-12-09 08:09:55', '2025-12-09 08:09:55', NULL),
(102, 'CEM - WU 017 AMBATONDRAZAKA', 'CEM 017', 132, 'AGENCE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(103, 'Service Comptabilité', 'SCTB', 13, 'SERVICE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(104, 'Service Fiscalité', 'SFISC', 14, 'SERVICE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(105, 'Agence dédiée WU 67ha', 'WU 67', 132, 'AGENCE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(106, 'Service de l\'Administration du Personnel', 'SAP', 16, 'SERVICE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(107, 'CEM - WU 009 ANTSIRABE', 'CEM 009', 132, 'AGENCE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(108, 'Service des Affaires Sociales et Communication Interne', 'SASCI', 16, 'SERVICE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(109, 'Service Engagements', 'SENG', 18, 'SERVICE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(110, 'CEM - WU 016 SAINTE MARIE', 'CEM 016', 132, 'AGENCE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(111, 'Cellule Communication et Relations Publiques', 'CCRP', 10, 'SERVICE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(112, 'Service Trésorerie', 'STRES', 13, 'SERVICE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(113, 'CEM - WU 011 MORONDAVA', 'CEM 011', 132, 'AGENCE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(114, 'CEM - WU 043 AMBANJA', 'CEM 043', 132, 'AGENCE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(115, 'CEM - WU 010 FORT - DAUPHIN', 'CEM 010', 132, 'AGENCE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(116, 'Agence dédiée WU Diégo II', 'WU 006 II', 132, 'AGENCE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(117, 'CEM - WU 029 FANDRIANA', 'CEM 029', 132, 'AGENCE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(118, 'CEM WU 051 ANALAMAHITSY', 'CEM 051', 132, 'AGENCE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(119, 'CEM WU 044 AMBILOBE', 'CEM 044', 132, 'AGENCE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(120, 'CEM - WU 024 AMBATOLAMPY', 'CEM 024', 132, 'AGENCE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(121, 'Service du Développement RH', 'SDRH', 16, 'SERVICE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(122, 'Service Sécurité Informatique', 'SSI', 15, 'SERVICE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(123, 'Service Suivi et Recouvrement', 'SSR', 18, 'SERVICE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(124, 'CEM - WU 046 SAMBAVA', 'CEM 046', 132, 'AGENCE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(125, 'Service Transformation Numérique', 'STN', 15, 'SERVICE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(126, 'CEM - WU 018 MANAKARA', 'CEM 018', 132, 'AGENCE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(127, 'Service Risques et Conformité', 'SRC', 14, 'SERVICE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(128, 'CEM WU 021 ANALAVORY', 'CEM 021', 132, 'AGENCE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(129, 'Service Data et Décisionnel', 'SDD', 15, 'SERVICE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(130, 'Service Contrôle de Gestion et Performance', 'SCGP', 10, 'SERVICE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(131, 'Agence dédiée WU Nosy Be', 'WU 012', 132, 'AGENCE', NULL, '2025-12-09 08:09:56', '2025-12-09 08:09:56', NULL),
(132, 'AGENCE', 'AGENCE', NULL, 'DIRECTION', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `date_naissance` date DEFAULT NULL,
  `sexe` varchar(10) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telephone` varchar(30) DEFAULT NULL,
  `matricule` varchar(255) DEFAULT NULL,
  `categorie` varchar(255) DEFAULT NULL,
  `fonction` varchar(255) DEFAULT NULL,
  `date_embauche` date DEFAULT NULL,
  `date_debauche` date DEFAULT NULL,
  `directions_id` bigint(20) UNSIGNED DEFAULT NULL,
  `services_id` bigint(20) UNSIGNED DEFAULT NULL,
  `statut` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `must_change_password` tinyint(1) NOT NULL DEFAULT 1,
  `email_verified` tinyint(1) NOT NULL DEFAULT 0,
  `premiere_connexion_en_attente` tinyint(1) DEFAULT 0,
  `email_temp` varchar(255) DEFAULT NULL,
  `telephone_temp` varchar(255) DEFAULT NULL,
  `photo_profile` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Index pour la table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `services_roles_id_foreign` (`roles_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_matricule_unique` (`matricule`),
  ADD KEY `idx_users_services_id` (`services_id`),
  ADD KEY `idx_users_directions_id` (`directions_id`),
  ADD KEY `idx_users_prenom` (`prenom`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=415;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `services_roles_id_foreign` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
