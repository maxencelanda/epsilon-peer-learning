-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 09 avr. 2024 à 15:15
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
-- Base de données : `epsilonpeer2peer`
--

-- --------------------------------------------------------

--
-- Structure de la table `apprenant`
--

CREATE TABLE `apprenant` (
  `Id_Apprenant` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mdp` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `apprenant`
--

INSERT INTO `apprenant` (`Id_Apprenant`, `email`, `mdp`) VALUES
(1, 'test@test.com', 'test'),
(2, 'test2@test.com', 'test'),
(3, 'test5@tedd.co', 't'),
(4, 'test@test.test', 'test'),
(5, 'test2@test.test', 'test'),
(6, 'test3@test.com', 't');

-- --------------------------------------------------------

--
-- Structure de la table `bloccompetence`
--

CREATE TABLE `bloccompetence` (
  `Id_BlocCompetence` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `Id_Module` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `choix`
--

CREATE TABLE `choix` (
  `Id_Question` int(11) NOT NULL,
  `Id_Choix` int(11) NOT NULL,
  `intitule` text DEFAULT NULL,
  `bonneReponse` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cours`
--

CREATE TABLE `cours` (
  `Id_Cours` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `Id_Module` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `formation`
--

CREATE TABLE `formation` (
  `Id_Formation` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prerequis` int(11) DEFAULT NULL,
  `Id_BlocCompetence` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `moduleformation`
--

CREATE TABLE `moduleformation` (
  `Id_Module` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `moduleformation`
--

INSERT INTO `moduleformation` (`Id_Module`, `nom`) VALUES
(1, 'Test');

-- --------------------------------------------------------

--
-- Structure de la table `participationcours`
--

CREATE TABLE `participationcours` (
  `Id_Apprenant` int(11) NOT NULL,
  `Id_Cours` int(11) NOT NULL,
  `aValide` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `passageqcm`
--

CREATE TABLE `passageqcm` (
  `Id_Apprenant` int(11) NOT NULL,
  `Id_QCM` int(11) NOT NULL,
  `choix` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `prerequis`
--

CREATE TABLE `prerequis` (
  `Id_Module` int(11) NOT NULL,
  `Id_Module_Prerequis` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `publication`
--

CREATE TABLE `publication` (
  `Id_Publication` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `Id_Module` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `publication`
--

INSERT INTO `publication` (`Id_Publication`, `nom`, `Id_Module`) VALUES
(1, 'test', 1),
(2, 'Capture d\'écran 2023-09-20 095914.png', 1),
(3, 'Capture d\'écran 2023-09-20 095914.png', 1),
(4, 'Capture d\'écran 2023-09-20 095914.png', 1),
(5, 'Capture d\'écran 2023-09-20 095914.png', 1),
(6, 'Capture d\'écran 2023-09-20 095914.png', 1),
(7, 'Capture d\'écran 2023-09-20 095914.png', 1),
(8, 'Capture d\'écran 2023-10-31 145624.png', 1),
(9, 'Capture d\'écran 2023-09-20 095914.png', 1),
(10, 'Capture d\'écran 2023-09-20 095914.png', 1),
(11, 'Capture d\'écran 2023-09-20 105117.png', 1),
(12, 'Capture d\'écran 2023-09-19 172233.png', 1);

-- --------------------------------------------------------

--
-- Structure de la table `qcm`
--

CREATE TABLE `qcm` (
  `Id_QCM` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `Id_Module` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `question`
--

CREATE TABLE `question` (
  `Id_Question` int(11) NOT NULL,
  `intitule` text DEFAULT NULL,
  `Id_QCM` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `rendu`
--

CREATE TABLE `rendu` (
  `Id_Apprenant` int(11) NOT NULL,
  `Id_Publication` int(11) NOT NULL,
  `statut1` int(11) DEFAULT NULL,
  `statut2` int(11) DEFAULT NULL,
  `statut3` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `rendu`
--

INSERT INTO `rendu` (`Id_Apprenant`, `Id_Publication`, `statut1`, `statut2`, `statut3`) VALUES
(1, 5, 1, 2, 0),
(1, 6, 0, 0, 0),
(1, 7, 0, 0, 0),
(1, 8, 0, 0, 0),
(2, 12, 0, 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `suivi`
--

CREATE TABLE `suivi` (
  `Id_Module` int(11) NOT NULL,
  `Id_Apprenant` int(11) NOT NULL,
  `estValide` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `apprenant`
--
ALTER TABLE `apprenant`
  ADD PRIMARY KEY (`Id_Apprenant`);

--
-- Index pour la table `bloccompetence`
--
ALTER TABLE `bloccompetence`
  ADD PRIMARY KEY (`Id_BlocCompetence`),
  ADD KEY `Id_Module` (`Id_Module`);

--
-- Index pour la table `choix`
--
ALTER TABLE `choix`
  ADD PRIMARY KEY (`Id_Question`,`Id_Choix`);

--
-- Index pour la table `cours`
--
ALTER TABLE `cours`
  ADD PRIMARY KEY (`Id_Cours`),
  ADD KEY `Id_Module` (`Id_Module`);

--
-- Index pour la table `formation`
--
ALTER TABLE `formation`
  ADD PRIMARY KEY (`Id_Formation`),
  ADD KEY `Id_BlocCompetence` (`Id_BlocCompetence`);

--
-- Index pour la table `moduleformation`
--
ALTER TABLE `moduleformation`
  ADD PRIMARY KEY (`Id_Module`);

--
-- Index pour la table `participationcours`
--
ALTER TABLE `participationcours`
  ADD PRIMARY KEY (`Id_Apprenant`,`Id_Cours`),
  ADD KEY `Id_Cours` (`Id_Cours`);

--
-- Index pour la table `passageqcm`
--
ALTER TABLE `passageqcm`
  ADD PRIMARY KEY (`Id_Apprenant`,`Id_QCM`),
  ADD KEY `Id_QCM` (`Id_QCM`);

--
-- Index pour la table `prerequis`
--
ALTER TABLE `prerequis`
  ADD PRIMARY KEY (`Id_Module`,`Id_Module_Prerequis`);

--
-- Index pour la table `publication`
--
ALTER TABLE `publication`
  ADD PRIMARY KEY (`Id_Publication`),
  ADD KEY `Id_Module` (`Id_Module`);

--
-- Index pour la table `qcm`
--
ALTER TABLE `qcm`
  ADD PRIMARY KEY (`Id_QCM`),
  ADD KEY `Id_Module` (`Id_Module`);

--
-- Index pour la table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`Id_Question`),
  ADD KEY `Id_QCM` (`Id_QCM`);

--
-- Index pour la table `rendu`
--
ALTER TABLE `rendu`
  ADD PRIMARY KEY (`Id_Apprenant`,`Id_Publication`),
  ADD KEY `Id_Publication` (`Id_Publication`);

--
-- Index pour la table `suivi`
--
ALTER TABLE `suivi`
  ADD PRIMARY KEY (`Id_Module`,`Id_Apprenant`),
  ADD KEY `Id_Apprenant` (`Id_Apprenant`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `apprenant`
--
ALTER TABLE `apprenant`
  MODIFY `Id_Apprenant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `bloccompetence`
--
ALTER TABLE `bloccompetence`
  MODIFY `Id_BlocCompetence` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `cours`
--
ALTER TABLE `cours`
  MODIFY `Id_Cours` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `formation`
--
ALTER TABLE `formation`
  MODIFY `Id_Formation` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `moduleformation`
--
ALTER TABLE `moduleformation`
  MODIFY `Id_Module` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `publication`
--
ALTER TABLE `publication`
  MODIFY `Id_Publication` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `qcm`
--
ALTER TABLE `qcm`
  MODIFY `Id_QCM` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `question`
--
ALTER TABLE `question`
  MODIFY `Id_Question` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `bloccompetence`
--
ALTER TABLE `bloccompetence`
  ADD CONSTRAINT `bloccompetence_ibfk_1` FOREIGN KEY (`Id_Module`) REFERENCES `moduleformation` (`Id_Module`);

--
-- Contraintes pour la table `choix`
--
ALTER TABLE `choix`
  ADD CONSTRAINT `choix_ibfk_1` FOREIGN KEY (`Id_Question`) REFERENCES `question` (`Id_Question`);

--
-- Contraintes pour la table `cours`
--
ALTER TABLE `cours`
  ADD CONSTRAINT `cours_ibfk_1` FOREIGN KEY (`Id_Module`) REFERENCES `moduleformation` (`Id_Module`);

--
-- Contraintes pour la table `formation`
--
ALTER TABLE `formation`
  ADD CONSTRAINT `formation_ibfk_1` FOREIGN KEY (`Id_BlocCompetence`) REFERENCES `bloccompetence` (`Id_BlocCompetence`);

--
-- Contraintes pour la table `participationcours`
--
ALTER TABLE `participationcours`
  ADD CONSTRAINT `participationcours_ibfk_1` FOREIGN KEY (`Id_Apprenant`) REFERENCES `apprenant` (`Id_Apprenant`),
  ADD CONSTRAINT `participationcours_ibfk_2` FOREIGN KEY (`Id_Cours`) REFERENCES `cours` (`Id_Cours`);

--
-- Contraintes pour la table `passageqcm`
--
ALTER TABLE `passageqcm`
  ADD CONSTRAINT `passageqcm_ibfk_1` FOREIGN KEY (`Id_Apprenant`) REFERENCES `apprenant` (`Id_Apprenant`),
  ADD CONSTRAINT `passageqcm_ibfk_2` FOREIGN KEY (`Id_QCM`) REFERENCES `qcm` (`Id_QCM`);

--
-- Contraintes pour la table `prerequis`
--
ALTER TABLE `prerequis`
  ADD CONSTRAINT `prerequis_ibfk_1` FOREIGN KEY (`Id_Module`) REFERENCES `moduleformation` (`Id_Module`);

--
-- Contraintes pour la table `publication`
--
ALTER TABLE `publication`
  ADD CONSTRAINT `publication_ibfk_1` FOREIGN KEY (`Id_Module`) REFERENCES `moduleformation` (`Id_Module`);

--
-- Contraintes pour la table `qcm`
--
ALTER TABLE `qcm`
  ADD CONSTRAINT `qcm_ibfk_1` FOREIGN KEY (`Id_Module`) REFERENCES `moduleformation` (`Id_Module`);

--
-- Contraintes pour la table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`Id_QCM`) REFERENCES `qcm` (`Id_QCM`);

--
-- Contraintes pour la table `rendu`
--
ALTER TABLE `rendu`
  ADD CONSTRAINT `rendu_ibfk_1` FOREIGN KEY (`Id_Apprenant`) REFERENCES `apprenant` (`Id_Apprenant`),
  ADD CONSTRAINT `rendu_ibfk_2` FOREIGN KEY (`Id_Publication`) REFERENCES `publication` (`Id_Publication`);

--
-- Contraintes pour la table `suivi`
--
ALTER TABLE `suivi`
  ADD CONSTRAINT `suivi_ibfk_1` FOREIGN KEY (`Id_Module`) REFERENCES `moduleformation` (`Id_Module`),
  ADD CONSTRAINT `suivi_ibfk_2` FOREIGN KEY (`Id_Apprenant`) REFERENCES `apprenant` (`Id_Apprenant`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
