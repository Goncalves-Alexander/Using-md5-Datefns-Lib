CREATE DATABASE IF NOT EXISTS criptografiaMd5;
USE criptografiaMd5;
 
 CREATE TABLE IF NOT EXISTS usuarios
 (
	ra int primary key auto_increment,
    nome varchar(32),
    sexo char(1),
    email varchar(32),
    senha varchar(32),
    tag varchar(45),
    statusAtividade char(1)
 );
 
 
 SELECT * FROM usuarios;
 
 insert into usuarios(nome,sexo,email,senha,tag,statusAtividade) values ('teste', 'M', 'alexander.barreira@bandtec.com.br', md5('123456'), 203119622, 'A');

ALTER TABLE usuarios MODIFY COLUMN email varchar(100); 
Update usuarios set email = 'alexander.barreira@bandtec.com.br' where ra = 2;

SELECT ra, nome, tag from usuarios 
            WHERE email = 'alexander.barreira@bandtec.com.br' AND senha = md5('123456'); 