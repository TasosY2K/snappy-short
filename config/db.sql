CREATE TABLE IF NOT EXISTS links (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    date_created varchar(255) NOT NULL,
    og_url varchar(255) NOT NULL,
    short_url varchar(255) NOT NULL,
    code varchar(255) NOT NULL
);
