# Snappy Short ⚡

Snappy Short is a link shortener built on Express.js utilizing SQLite3  
Simple but fast and reliable 💨💪

![screenshot](https://media.discordapp.net/attachments/609854271810306049/653322876824322049/Screenshot_1.png?width=1027&height=467)

# Run it yourself

**Step 1**  
Clone Snappy Short and install the dependencies
```sh
$ git clone -b SQLite --single-branch https://github.com/TasosY2K/snappy-short.git
$ npm install
```

**Step 2**  
Open `config.json` and insert your info
```json
{
  "url" : "http://yoursite",
  "port" : "80",
  "SSLport" :  "443",
  "enableSSL" : "false"
}
```

**Step 3 [Optional]**  
If you want SSL enabled create a folder in `/congig` named `/certificates`
```sh
$ mkdir certificates
```
And place you `server key` and `server certificate` with the name `server.key` and `server.cert` ,after that you can enable SSL by editing `config.json`
```json
  "enableSSL" : "false"
```

**Step 4**  
Run `app.js` and navigate to your sites domain
```sh
$ npm start
```

That's it

## Live demo

[https://snpy.xyz](https://snpy.xyz)
