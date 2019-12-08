CREATE TABLE links (
    id int NOT NULL AUTO_INCREMENT,
    date_created varchar(255) NOT NULL,
    og_url varchar(255) NOT NULL,
    short_url varchar(255) NOT NULL,
    code varchar(255) NOT NULL,
    PRIMARY KEY (id)
);
