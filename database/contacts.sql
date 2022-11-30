DROP DATABASE IF EXISTS contacts;
CREATE DATABASE contacts CHARACTER SET utf8;
USE contacts;

DROP TABLE IF EXISTS contact;

CREATE TABLE contact (
    id_contact      INT       NOT NULL AUTO_INCREMENT,
    contact_name    CHAR(100) NOT NULL,
    contact_phone   CHAR(25)  NOT NULL,
    contact_email   CHAR(100) NOT NULL,
                    CONSTRAINT pk_contact
                    PRIMARY KEY (id_contact)
);
