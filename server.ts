import * as path from 'path';
import * as express from 'express';
import * as sql from 'sqlite3';

const dbpath = path.join(__dirname + '/us-census.db');
const db = new sql.Database(dbpath);

const app = express();

app.use("/build", express.static(__dirname + '/build'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/columns', (req, res) => {
  db.all('select * from census_learn_sql limit 1', (err, columns) => {
    res.send(Object.keys(columns[0]));
  })
});

app.listen(3000);
console.log('Visit localhost:3000');
