-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.1.25-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win32
-- HeidiSQL Versão:              9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para selecao
CREATE DATABASE IF NOT EXISTS `selecao` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `selecao`;

-- Copiando estrutura para tabela selecao.en_status
CREATE TABLE IF NOT EXISTS `en_status` (
  `seq_status` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`seq_status`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela selecao.en_status: ~3 rows (aproximadamente)
DELETE FROM `en_status`;
/*!40000 ALTER TABLE `en_status` DISABLE KEYS */;
INSERT INTO `en_status` (`seq_status`, `name`) VALUES
	(1, 'Aberto'),
	(2, 'Andamento'),
	(3, 'Finalizado');
/*!40000 ALTER TABLE `en_status` ENABLE KEYS */;

-- Copiando estrutura para tabela selecao.en_task
CREATE TABLE IF NOT EXISTS `en_task` (
  `seq_task` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL DEFAULT '0',
  `description` varchar(500) NOT NULL DEFAULT '0',
  `seq_en_status` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`seq_task`),
  KEY `FK_en_task_en_task` (`seq_en_status`),
  CONSTRAINT `FK_en_task_en_task` FOREIGN KEY (`seq_en_status`) REFERENCES `en_task` (`seq_task`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela selecao.en_task: ~0 rows (aproximadamente)
DELETE FROM `en_task`;
/*!40000 ALTER TABLE `en_task` DISABLE KEYS */;
/*!40000 ALTER TABLE `en_task` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
