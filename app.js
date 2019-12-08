const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');

const config = require('./config.json');

const app = express();

function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

const connection = mysql.createConnection(config.database);

connection.on('error', (err) => {
  if(err.code === 'PROTOCOL_CONNECTION_LOST') {
		console.log("Lost database connection");
		setInterval(() => {process.exit()}, 100);
  } else {
		console.log("Database error");
	  setInterval(() => {process.exit()}, 100);
	}
});

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/create', (req, res) => {
  if (!req.query.url) {
    res.send('No url provided')
  } if (!validateUrl(req.query.url)) {
    res.send('Invalid url provided')
  } else {
    let code = Math.random().toString(36).substring(7);
    connection.query(`INSERT INTO links(date_created, og_url, short_url, code) VALUES ('${moment().format('YYYY-MM-DD HH:mm:ss Z')}', '${req.query.url}', '${config.url}/${code}', '${code}')`, (error, results, fields) => {
      connection.query(`SELECT * FROM links WHERE code = '${code}'`, (error, results, fields) => {
        if (!results) {
          res.send({message: "Could not shorten URL ❌", code: 500})
        } else if (results.length > 0) {
          res.send({message: "URL shortened successfuly ✔️", id: results[0].id, original: results[0].og_url, short: results[0].short_url});
        }
      });
    });
  }
});

app.get('/:code', (req, res) => {
  let code = req.params.code;
  connection.query(`SELECT * FROM links WHERE code = '${code}'`, (error, results, fields) => {
    if (results.length > 0) {
      res.redirect(results[0].og_url);
    } else {
      res.redirect("/");
    }
  });
});

app.listen(80, function() {
  console.log('Serving on port', this.address().port);
});
