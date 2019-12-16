# Snappy Short ⚡

Snappy Short is a link shortener built on Express.js utilizing mySQL  
Simple but fast and reliable 💨💪

![screenshot](https://media.discordapp.net/attachments/609854271810306049/653322876824322049/Screenshot_1.png?width=1027&height=467)

# Run it yourself

**Step 1**  
Clone Snappy Short and install the dependencies
```sh
$ git clone https://github.com/TasosY2K/SwearBot.git
$ npm install
```
**Step 2**  
Copy the contents of `db.sql`, create a database from your prefered enviroment then run the SQL
```sh
mysql> 
CREATE TABLE links (
    id int NOT NULL AUTO_INCREMENT,
    date_created varchar(255) NOT NULL,
    og_url varchar(255) NOT NULL,
    short_url varchar(255) NOT NULL,
    code varchar(255) NOT NULL,
    PRIMARY KEY (id)
);
```
**Step 3**  
Open `config.json` and insert the required info
```sh
{
  "url" : "http://yoursite",
  "database" : {
    "host" : "host",
    "user" : "user",
    "password" : "password",
    "database" : "database"
  }
}
 ```
 **Step 4**  
 Run `app.js` and navigate to your sites domain
 ```sh
 $ node app.js
 $ Serving on port 80 
 ```

That's it

## Live demo

[https://snpy.glitch.me](https://snpy.glitch.me)
