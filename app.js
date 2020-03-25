const sqlite3 = require('sqlite3').verbose();
const app = require('express')();
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const moment = require('moment');
const figlet = require('figlet');
const fs = require('fs');

const config = require('./config/config.json');

console.log(figlet.textSync('snappy-short', {font: 'Ogre'}));
console.log('\nSnappy Short is a simple but swift link shortener built on NodeJS and express\n');
console.log('Version:', process.env.npm_package_version);
console.log('GitHub:', process.env.npm_package_homepage);
console.log('Url:', config.url);
console.log('Port:', config.port);
console.log('SSL:', config.enableSSL + '\n');

function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

app.set('view engine', 'pug');

let db = new sqlite3.Database('./links.db');

db.each(fs.readFileSync('./config/db.sql', 'utf8'), (err, row) => {
  if (err) console.error(err.message);
});


app.get('/', (req, res) => {
  db.all(`SELECT * FROM links`, (err, results) => {
    res.render('index', {users: results.length});
  });
});

app.get('/api', (req, res) => {
  if (!req.query.url) {
    res.send({message: 'No url provided', code: 204})
  } if (!validateUrl(req.query.url)) {
    res.send({message: 'Invalid url provided', code: 406})
  } else {
    let code = Math.random().toString(36).substring(7);
    db.all(`INSERT INTO links(date_created, og_url, short_url, code) VALUES ('${moment().format('YYYY-MM-DD HH:mm:ss Z')}', '${req.query.url}', '${config.url}/${code}', '${code}')`, (error, results) => {
      db.all(`SELECT * FROM links WHERE code = '${code}'`, (error, results) => {
        if (!results) {
          res.send({message: 'Could not shorten URL ❌', code: 500})
        } else if (results.length > 0) {
          console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')} | ${req.ip} | Short-link created | ${results[0].id}`);
          res.send({message: 'URL shortened successfuly ✔️', id: results[0].id, original: results[0].og_url, short: results[0].short_url, code: 200});
        }
      });
    });
  }
});

app.get('/:code', (req, res) => {
  let code = req.params.code;
  db.all(`SELECT * FROM links WHERE code = '${code}'`, (error, results) => {
    if (results.length > 0) {
      console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')} | ${req.ip} | Redirect | ${results[0].og_url}`);
      res.redirect(results[0].og_url);
    } else {
      res.redirect('/');
    }
  });
});

http.createServer(app).listen(config.port, '0.0.0.0');
if (config.enableSSL) {
  https.createServer({
    key: fs.readFileSync('./config/certificates/server.key'),
    cert: fs.readFileSync('./config/certificates/server.cert')
  }, app).listen(config.securePort, '0.0.0.0');
}
