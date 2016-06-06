-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2016 at 10:30 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `eboutique`
--

-- --------------------------------------------------------

--
-- Table structure for table `komentari`
--

CREATE TABLE IF NOT EXISTS `komentari` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `autorId` int(11) DEFAULT NULL,
  `novostId` int(11) DEFAULT NULL,
  `text` text CHARACTER SET utf8 COLLATE utf8_slovenian_ci,
  `roditeljKomentar` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `autorId` (`autorId`),
  KEY `novostId` (`novostId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `komentari`
--

INSERT INTO `komentari` (`id`, `autorId`, `novostId`, `text`, `roditeljKomentar`) VALUES
(3, 1, 5, 'Ja sam kreirao ovu novost.', 0),
(4, 1, 6, 'Ja sam ovo kreirao.', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `korisnici`
--

CREATE TABLE IF NOT EXISTS `korisnici` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_slovenian_ci NOT NULL,
  `password` varchar(1000) CHARACTER SET utf8 COLLATE utf8_slovenian_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `korisnici`
--

INSERT INTO `korisnici` (`id`, `username`, `password`) VALUES
(1, 'Administrator', '8833b386ec0e5d3a7d216618e91a4410c53f266236f57a5e71befc119468556b'),
(10, 'miljenko', '8833b386ec0e5d3a7d216618e91a4410c53f266236f57a5e71befc119468556b');

-- --------------------------------------------------------

--
-- Table structure for table `novosti`
--

CREATE TABLE IF NOT EXISTS `novosti` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `naslov` varchar(100) CHARACTER SET utf8 COLLATE utf8_slovenian_ci NOT NULL,
  `text` text CHARACTER SET utf8 COLLATE utf8_slovenian_ci NOT NULL,
  `autorId` int(11) NOT NULL,
  `datum` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dozvoljeniKomentari` bit(1) NOT NULL DEFAULT b'1',
  PRIMARY KEY (`id`),
  KEY `autorId` (`autorId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `novosti`
--

INSERT INTO `novosti` (`id`, `naslov`, `text`, `autorId`, `datum`, `dozvoljeniKomentari`) VALUES
(5, 'ALISA U ZEMLJI ČUDA – nova limitirana kolekcija obuće britanskog brenda Irregular Choice', 'Druga kolekcija obuće, nastala u saradnji sa Disneyem, pod imenom Alisa u Zemlji čuda je predstavljena u Irregular Choice trgovini 26. februara u 12 sati u Carnaby ulici u Londonu. Budite bez brige, imaćt ete priliku da u njihovim novim cipelama stignete na vrlo važan “sudar” sa novim filmom Alisa sa druge strane ogledala (Walt Disney Studio) koji će premijerno biti prikazan u maju ove godine.', 1, '2016-06-04 18:30:37', b'1'),
(6, 'Nova kampanja Mare Hoffman priziva ljeto', 'Mara Hoffman zadnjih nekoliko sezona iznimno je popularan brend kupaćih kostima i odjeće za plažu pa smo se obradovali kada smo vidjeli da su i ove sezone pripremili veselu i šarenu poslasticu zbog koje još više priželjkujemo dolazak toplih ljetnih dana.', 1, '2016-06-06 08:56:30', b'1'),
(7, 'TALENTOVANA ZENIČANKA Deniz Nadžaković je profesionalna manekenka sa samo 11 godina!', 'Talentovana mlada Zeničanka Deniz Nadžaković (11) profesionalna je manekenka koja već sada plijeni svojim šarmom i ljepotom. <br>\n						Osim manekenstvom, Deniz se bavi i glumom, plesom i dizajnom. <br>\n						Ovo jedanaestogodišnje "čudo od djeteta" nedavno je u sklopu "Škole manekenstva, plesa i glume" u Dubrovniku održalo malu radionicu dizajnerskih rukotvorina, te svoje znanje prenijela na nove polaznike.', 1, '2016-06-06 08:56:30', b'1'),
(8, 'Belma Tvico predstavila modni film "Diva In You"!', 'Dizajnerica Belma Tvico je u Vijećnici predstavila svoj prvi modni film "Diva In You". Film je kruna njenog dosadašnjeg rada i ulaganja u stvaranje ekskluzivnog bh. brenda visoke mode za žene. Promoviše samopouzdanu i hrabru ženu, zapravo pravu divu.', 10, '2016-06-06 09:27:45', b'1'),
(9, 'TRAGOVI dizajnerice Neire Sinanbašić oživljavaju prošlost ispisanu na stećcima', 'Istražujući potencijal pečata i igrajući se mogućnostima njegove primjene dizajnerica Neira Sinanbašić je kroz svoj magistarski rad nazvan Tragovi nastojala oživjeti djelić prošlosti kao nečega još uvijek prisutnog, pulsirajućeg i modernog.', 10, '2016-06-06 09:27:45', b'1'),
(10, 'Upriličena izložba nakita WearWolf x Sofić S', 'Kreativna i perspektivna mlada dizajnerica Anida Kapo koja stoji iza modnog brenda WearWolf prvu fashion kolekciju predstavila je u aprilu 2013. u galeriji Collegium Artisticum, kada je pobrala odlične kritike, oduševila sve koji su vidjeli kreacije, i uspješno odbranila magistarski rad na Akademiji likovnih umjetnosti. Zatim je u decembru iste godine predstavljena i njena druga kolekcija, a sad imamo priliku uživati u njenoj prvoj kolekciji nakita.', 10, '2016-06-06 09:27:45', b'1'),
(11, '4. Vintage & Art market Mašna: Retro zabavom proslavite početak proljeća', 'U subotu, 16. aprila, u Kinu Bosna će se predstaviti 40 izlagačica na Mašna. Vintage & Art marketu. Ne propustite osjetiti dašak prošlih vremena – dobro se zabaviti, slušati muziku iz perioda ’30-ih, ’40-ih i ’50-ih godina, kupiti unikatne stvari i upoznati veselo društvo. Program marketa će trajati od 11:00 do 17:00 časova, a ulaz će biti besplatan za sve posjetioce. Market će biti prodajnog karaktera te će svi predmeti i odjeća biti na prodaju.', 10, '2016-06-06 09:27:45', b'1'),
(12, 'Perwoll New Generation 2016: Izabrani finalisti konkursa za mlade dizajnere', 'U sklopu 36. Nivea BH Fashion Week Sarajevo koji animira proizvodnju, prodaju, promociju i afirmaciju tekstilne i modne industrije u regiji, održat će se treći onkurs za mlade neafirmirane modne dizajnere "Perwoll New Generation 2016".\r\n						Ovogodišnje teme konkursa su "Fashion a look back" odnosno "Nazad u prošlost" i "Fashion Forward" odnosno "Naprijed u budućnost".', 10, '2016-06-06 09:27:45', b'1'),
(13, 'Proba', 'ovo je tekst novosti ', 10, '2016-06-06 10:23:20', b'0');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `komentari`
--
ALTER TABLE `komentari`
  ADD CONSTRAINT `komentari_ibfk_1` FOREIGN KEY (`autorId`) REFERENCES `korisnici` (`id`),
  ADD CONSTRAINT `komentari_ibfk_2` FOREIGN KEY (`novostId`) REFERENCES `novosti` (`id`);

--
-- Constraints for table `novosti`
--
ALTER TABLE `novosti`
  ADD CONSTRAINT `novosti_ibfk_1` FOREIGN KEY (`autorId`) REFERENCES `korisnici` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
