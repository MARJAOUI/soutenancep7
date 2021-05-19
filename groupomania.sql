-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 17 mai 2021 à 18:56
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `contenu` varchar(255) NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `userId`, `titre`, `contenu`, `imageUrl`, `createdAt`, `updatedAt`) VALUES
(6, 134, 'fdfdf', 'fdfdfdfdfdf', 'http://localhost:3000/foot.jpg1620756857593.jpg', '2021-05-11 18:14:17', '2021-05-11 18:14:17'),
(7, 134, 'fhgfhgfh', 'gfhgfhgfh', 'http://localhost:3000/versailles.jpeg1620756869921.jpg', '2021-05-11 18:14:29', '2021-05-11 18:14:29'),
(8, 127, 'azazaz', 'sfsfsfd\nsfsf\nsf\nsf\nsf', 'http://localhost:3000/foot.jpg1620770526794.jpg', '2021-05-11 22:02:06', '2021-05-11 22:02:06'),
(9, 139, 'Marhaba', 'vous etes invites au mariage de notre fils', 'http://localhost:3000/versailles.jpeg1621173975175.jpg', '2021-05-16 14:06:15', '2021-05-16 14:06:15');

-- --------------------------------------------------------

--
-- Structure de la table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20210325203612-create-user.js'),
('20210325203903-create-message.js');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` varchar(5) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `nom`, `prenom`, `email`, `password`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(127, 'Legrand6', 'jujube6', 'legrand6@test.f', '$2b$05$mpKdceirPrXBc6pLQwIpye6rkhJ46jpMH8x7nNj73mY5k3AsGbIm2', '0', '2021-05-09 17:39:47', '2021-05-12 14:01:42'),
(134, 'daladier3', 'dada3', 'daladier3@test.fr', '$2b$05$DVp4Qxh396/hMcWpkycrfuzqa8Q/CnCqQ7fwHC3RV7YycY.cRukZ2', '0', '2021-05-10 17:41:52', '2021-05-12 17:09:56'),
(137, 'dupont', 'maxime', 'Dupont@test.fr', '$2b$05$0AMBCloGOkrF2IF8uZ0j4Oy6bdSk37B907UcpDYOPSZhjD.6L3Eii', '0', '2021-05-12 17:30:39', '2021-05-12 17:30:39'),
(138, 'pandapol', 'panda', 'pandapol@test.fr', '$2b$05$KA0WAcShU.qpaOkWh6zN6u0p.Hjr98Q3bkpt1SmumaRoLo0EMCxku', '0', '2021-05-12 17:53:46', '2021-05-12 17:53:46'),
(139, 'truchot', 'maxime', 'truchot@test.fr', '$2b$05$q9eZa7j0Kfxt5vMWRhqnLeQiHPw9AYdppQwDOSp48P8ppHLWf5ffK', '0', '2021-05-12 17:55:41', '2021-05-12 17:55:41');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
