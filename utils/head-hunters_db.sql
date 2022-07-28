-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Wersja serwera:               10.4.24-MariaDB - mariadb.org binary distribution
-- Serwer OS:                    Win64
-- HeidiSQL Wersja:              11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Zrzut struktury bazy danych head_hunters
CREATE DATABASE IF NOT EXISTS `head_hunters` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `head_hunters`;

-- Zrzut struktury tabela head_hunters.admin
CREATE TABLE IF NOT EXISTS `admin` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullName` varchar(75) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roleId` enum('admin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'admin',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Zrzucanie danych dla tabeli head_hunters.admin: ~0 rows (około)
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` (`id`, `email`, `fullName`, `password`, `roleId`) VALUES
	('cbb17b14-09cf-11ed-9ccb-fc4596691c4b', 'admin@gmail.com', 'Admin Adminowski', 'admin', 'admin');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

-- Zrzut struktury tabela head_hunters.hr_coordinator
CREATE TABLE IF NOT EXISTS `hr_coordinator` (
  `email` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullName` varchar(75) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(82) COLLATE utf8mb4_unicode_ci NOT NULL,
  `maxReservedStudents` int(3) unsigned NOT NULL DEFAULT 1,
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roleId` enum('hr') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'hr',
  `registerToken` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hrStatus` enum('active','inactive') COLLATE utf8mb4_unicode_ci DEFAULT 'inactive',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `registerToken` (`registerToken`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Zrzucanie danych dla tabeli head_hunters.hr_coordinator: ~0 rows (około)
/*!40000 ALTER TABLE `hr_coordinator` DISABLE KEYS */;
INSERT INTO `hr_coordinator` (`email`, `fullName`, `company`, `maxReservedStudents`, `id`, `password`, `roleId`, `registerToken`, `hrStatus`) VALUES
	('grazyna.boska@gmail.com', 'Grażyna Boska', 'MegaK', 1, 'c8f93a51-09d2-11ed-9ccb-fc4596691c4b', 'UmC%7P&nJ9U2', 'hr', 'j3L3hYnYsMuRwekPfthsEbMFDH8Fghf1D946dQwICM6YE7rdqq965lr0WLhWpLSq5zZeFs3HPwM9SWBVv3Qv0T3DUz04n3', 'active'),
	('jan.kowalski@gmail.com', 'Jan Kowalski', 'Escola', 1, 'd4ba1e6f-09cc-11ed-9ccb-fc4596691c4b', 'rs$9PTHUn4M5', 'hr', 'bvzgnydlilhvpitkawudvndarvkvpzhisxpxqiypmpgumjciksxdindjovjvnqomlgbtybsz', 'active');
/*!40000 ALTER TABLE `hr_coordinator` ENABLE KEYS */;

-- Zrzut struktury tabela head_hunters.students
CREATE TABLE IF NOT EXISTS `students` (
  `email` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `courseCompletion` tinyint(1) unsigned NOT NULL,
  `courseEngagment` tinyint(1) unsigned NOT NULL,
  `projectDegree` decimal(3,2) unsigned NOT NULL DEFAULT 0.00,
  `teamProjectDegree` tinyint(1) unsigned NOT NULL,
  `bonusProjectUrls` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `password` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hrId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `roleId` enum('student') COLLATE utf8mb4_unicode_ci DEFAULT 'student',
  `registerToken` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `studentStatus` enum('active','inactive','reserved') COLLATE utf8mb4_unicode_ci DEFAULT 'inactive',
  `phone` bigint(11) unsigned DEFAULT NULL,
  `firstName` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(55) COLLATE utf8mb4_unicode_ci NOT NULL,
  `githubUsername` varchar(39) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `portfolioUrls` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `projectUrls` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expectedTypeWork` enum('Na miejscu','Gotowość do przeprowadzki','Wyłącznie zdalnie','Hybrydowo','Bez znaczenia') COLLATE utf8mb4_unicode_ci DEFAULT 'Bez znaczenia',
  `targetWorkCity` varchar(58) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expectedContractType` enum('Tylko UoP','Możliwe B2B','Możliwe UZ/UoD','Brak preferencji') COLLATE utf8mb4_unicode_ci DEFAULT 'Brak preferencji',
  `expectedSalary` decimal(7,2) unsigned DEFAULT NULL,
  `canTakeApprenticeship` enum('Y','N') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'N',
  `monthsOfCommercialExp` tinyint(2) unsigned NOT NULL DEFAULT 0,
  `education` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `workExperience` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `courses` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reservedAt` datetime DEFAULT NULL,
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `githubUsername` (`githubUsername`),
  KEY `hrId` (`hrId`),
  CONSTRAINT `FK_students_hr_coordinator` FOREIGN KEY (`hrId`) REFERENCES `hr_coordinator` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Zrzucanie danych dla tabeli head_hunters.students: ~8 rows (około)
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` (`email`, `courseCompletion`, `courseEngagment`, `projectDegree`, `teamProjectDegree`, `bonusProjectUrls`, `password`, `hrId`, `roleId`, `registerToken`, `studentStatus`, `phone`, `firstName`, `lastName`, `githubUsername`, `portfolioUrls`, `projectUrls`, `bio`, `expectedTypeWork`, `targetWorkCity`, `expectedContractType`, `expectedSalary`, `canTakeApprenticeship`, `monthsOfCommercialExp`, `education`, `workExperience`, `courses`, `reservedAt`) VALUES
	('adamsik83@wp.pl', 2, 1, 1.37, 1, 'https://github.com/adamski83/Todo__MegaK', '4QUy7p&55rR3', NULL, 'student', 'b73d1hAG4yV2nrO94jCdLxC9JHmv5zWMSsM07H88PEJ616AAcCbzSD6z6ikV63v855', 'active', 517485240, 'Adam', 'Kopeć', 'adamski83', NULL, 'https://github.com/adamski83/Todo__MegaK', 'Neque doloremque temporibus debitis magnam laudantium sunt obcaecati esse corporis eum cumque. Corporis velit impedit, atque quas ab ad praesentium ex beatae accusamus, cum esse, nemo asperiores est non eius.', 'Wyłącznie zdalnie', 'Wrocław', 'Możliwe B2B', 4000.00, 'Y', 0, 'Zespół Szkół Budowlanych w Bolesławcu- Technik Buddownictwa', 'Illo, iusto. Quasi sed minima illum consectetur id dolor, est natus eos autem quo. Eveniet, debitis dicta placeat unde saepe voluptatum vitae. Ducimus nemo aut minus doloremque. Error, aut unde.', 'The Complete JavaScript Course 2022: From Zero to Expert! Johnas Schmedtmann, 100 Daays of Code - 2011 Web Development Bootcamp', NULL),
	('eddy122394@gmail.com', 3, 3, 4.14, 3, 'https://github.com/AdrianeZ', '64Jb*M8Rc6!#', NULL, 'student', '4V8yLZkRta951U97Jrvl3tzW0zeYtt71f99mfcDY47RYEwy7w6BD838zkhr0guzTJ49b14YX8xTPy5SRe2wQeR4EN0rVuskQ9wMxfz', 'active', 667442838, 'Adrian', 'Zapłata', 'AdrianeZ', NULL, 'https://github.com/AdrianeZ/Expense-Tracker-Backend', 'Consequuntur eaque error, facere soluta nam impedit! Harum nesciunt enim veniam ut eius ipsum eaque non quaerat blanditiis facere laboriosam unde perspiciatis atque sed neque, numquam at veritatis repellat recusandae.', 'Wyłącznie zdalnie', 'Poznań', 'Tylko UoP', 4300.00, 'N', 0, NULL, NULL, NULL, NULL),
	('grzesionmax@gmail.com', 2, 4, 3.11, 3, 'https://github.com/MegaK-group-1/head-hunter-frontend https://github.com/MegaK-group-1/head-hunter-backend', '6Ncw8k7!3c%c', NULL, 'student', 'bC4oZKF8xtoBwO2g63RNV35Nk7scdodUkEF5Zi1eWuPh65rrKf18ecJDrrfpLr2eVDmVkEz', 'active', 777777777, 'Grzegorz', 'Strzelecki', 'g-strzelecki', 'https://github.com/g-strzelecki/MemoriesFE https://github.com/g-strzelecki/MemoriesBE', 'https://github.com/g-strzelecki', 'Exercitationem consectetur adipisci placeat quod tempora cum mollitia ea suscipit laudantium neque, sit itaque explicabo deserunt. Iusto id deserunt dolor neque vitae eaque, maiores obcaecati aut illum, cumque, facilis illo.', 'Hybrydowo', NULL, 'Tylko UoP', 5500.00, 'N', 0, 'Wyższe techniczne', 'Explicabo architecto praesentium nulla! Veritatis labore corporis ad aliquam sed sit excepturi minima amet nam enim id vitae, sint consequuntur, ullam laudantium. Dolore fugit, a consequuntur et aperiam quos magni!', 'SamurajProgramowania FE six pack, MegaK', NULL),
	('j.biernat955@gmail.com', 2, 2, 3.25, 3, 'https://github.com/j.biernat955', '', NULL, 'student', '', 'inactive', NULL, '', '', NULL, NULL, NULL, NULL, 'Bez znaczenia', NULL, 'Brak preferencji', NULL, 'N', 0, NULL, NULL, NULL, NULL),
	('oohajo@gmail.com', 3, 3, 2.84, 3, 'https://github.com/oohajo', 'hw7AJ$3*27n9', NULL, 'student', 'E6B2435PajL3Zh07EfwNGUJEf0Bg5wt5B14MJzO7OE0oOjp6m5cZ938KyyGJw3Les51jCql35lfDPsQx9', 'active', 519387222, 'Diana', 'Kalinowska', 'oohajo', 'https://pbn.nauka.gov.pl/core/#/person/view/5e7094c0878c28a0473c30a8/24c09256-0a80-475e-a404-d92b75260da7 https://www.behance.net/dianakalinowska1 https://pixabay.com/users/oohajo-6450309/', 'https://github.com/oohajo', 'Provident fugit accusamus voluptate maxime, magnam culpa saepe velit placeat excepturi, hic harum iste voluptates similique cupiditate facere aperiam error id. Commodi debitis soluta quibusdam doloremque magnam quod sunt facere.', 'Hybrydowo', 'Warszawa', 'Brak preferencji', 4500.00, 'N', 0, 'wyższe doktorskie - Instytut Fizyki Polskiej Akademii Nauk; podyplomowe - Centrum kształcenia Kadr Lotnictwa Cywilnego Europy Środkowo-Wschodniej Politechniki Śląskiej', 'Quisquam ipsam tempore saepe minus exercitationem aliquam dolores doloremque ratione dolore labore, libero dicta, perspiciatis aliquid inventore quo rem nihil, voluptate autem quae molestias? Sapiente tenetur suscipit eligendi esse nobis.', 'Platforma Udemy: Wprowadzenie do Git i GiHub Samuraj Programowania, Programowanie w JavaScript Samuraj Programowania, Web developer od podstaw w 15 dni Samuraj Programowania, Front-end zaawansowany w 15 dni Samuraj Programowania; MegaK (https://www.megak.pl/); ZaJavka (https://www.zajavka.pl/); Platforma StudiujęIT: Podstawy Web Developmentu, Fundamenty programowania', NULL),
	('patrykkeska4@gmail.com', 4, 4, 3.95, 4, 'https://github.com/PatrykKeska/company_management_app_front', '5$BU2P49y@Hb', NULL, 'student', 'xfN6FHtcqSn3oK37lFMKKb9ht1XzJkEpEagjb5821eMD8M9Mqzg03aA7BlU80KSYG0ajLoKOI12', 'active', 795832736, 'Patrytk', 'Keska', 'PatrykKeska4', NULL, 'https://github.com/PatrykKeska4', 'Alias beatae dicta ducimus voluptatem similique dolorum, dolorem ratione fuga, quos blanditiis temporibus et saepe modi voluptatum quas magni veniam, pariatur ipsum. Incidunt facilis placeat esse hic, deserunt accusantium necessitatibus.', 'Hybrydowo', 'Kraków', 'Możliwe B2B', 4500.00, 'Y', 0, 'Średnie Wyższe', 'Temporibus, maiores. Sint placeat cupiditate aliquid odio fugiat alias, laborum saepe magni illo iure reiciendis sunt rerum et eveniet quibusdam maiores quaerat est voluptatum animi suscipit aliquam ipsum incidunt perferendis.', 'MegaK', NULL),
	('pgawzynski.backup@gmail.com', 4, 4, 3.53, 4, 'https://github.com/PwGawzynski/HR_APP_BACKEND.git', '', NULL, 'student', '', 'inactive', NULL, '', '', NULL, NULL, NULL, NULL, 'Bez znaczenia', NULL, 'Brak preferencji', NULL, 'N', 0, 'Wyższa Szkoła Oficerska Sił Powietrznych w Dęblinie; Magister inżynier 2017 - 2018 - Wydział Lotnictwa i Kosmonautyki, kierunek: Nawigacja', 'Illo placeat qui saepe, blanditiis et delectus, quam repellendus quas deserunt itaque voluptates odio ea magnam laudantium sunt nostrum dolor pariatur odit. Vitae ex labore sed consequuntur reiciendis nemo eaque.', 'Wprowadzenie do Git i GiHub Samuraj Programowania – 01.2022 Programowanie w JavaScript Samuraj Programowania – 01-03.2022 Web developer od podstaw w 15 dni Samuraj Programowania – 04.2022 Front-end zaawansowany w 15 dni Samuraj Programowania – 05.2022 JavaScript - Jedyny Kurs, Którego Potrzebujesz! Udemy – 03.2022', NULL),
	('zannien94@gmail.com', 4, 0, 4.84, 4, 'https://github.com/zannien94/flight-app-backend https://github.com/zannien94/flight-app-frontend', '87*yChj%8%7S', NULL, 'student', 'X3pTcQbC3NGfCSzVaG5UEoDxqSML1LW5mJtvzSYG7pY8DGy2e2ve3O0QHYlC9H2bUw15zSFQE82KWYF33oEnRnTeLu2wPz7', 'active', 888444333, 'Żaneta', 'Niezabitowska', 'zannien94', 'https://github.com/zannien94/flight-app-backend https://github.com/zannien94', 'https://github.com/zannien94/flight-app-backend https://github.com/zannien94/flight-app-frontend', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit, molestias adipisci minus quisquam aliquam quas, possimus porro atque sit aspernatur aperiam maiores laboriosam consectetur. Deleniti quas similique culpa exercitationem unde.', 'Wyłącznie zdalnie', 'Lublin', 'Możliwe B2B', 4000.00, 'Y', 2, 'Technik Mechatronik', 'Exercitationem cum nisi blanditiis saepe sunt nam voluptatem enim nemo amet facere sit perferendis, deleniti eveniet suscipit? Quia cum, perspiciatis consectetur dolores, nemo ea neque, recusandae libero quaerat odio ad!', NULL, NULL);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
