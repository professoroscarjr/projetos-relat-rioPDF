create database crud_mvc;

use crud_mvc;

CREATE TABLE `users` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	`email` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`fone` VARCHAR(16) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`pass` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`endereco` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`username` VARCHAR(30) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`dtnasc` DATETIME NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=16
;


//comandos git
git init 
git add .
git commit -m "relatorio cidade"
git push origin main
