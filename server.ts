import * as path from 'path';
import * as express from 'express';
import * as sql from 'sqlite3';
import * as _ from 'lodash';

export interface IDataElement {
  columnName: string;
  count: number;
  age: number;
}

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

app.get('/values/name=:name', (req, res) => {
  const column = req.params.name;
  const query = constructColumnAndAgeQuery(column);
  db.all(query, (err, table) => {
    const data: IDataElement[] = resolveColumnData(table);
    res.send(_.orderBy(data, 'age', 'desc'));
    ;
  });
});

app.listen(3000);
console.log('Visit localhost:3000');

const constructColumnAndAgeQuery = (column: string): string => {
  return 'select `' + `${column}` + '`, `age` from census_learn_sql';
}

const resolveColumnData = (table: any): IDataElement[] => {
  const data: IDataElement[] = []

  const notNullTable = table.filter( (e) => e[Object.keys(e)[0]] !== null );
  let index = 0;
  while ( data.length < 100 && index < notNullTable.length) {
    const element = notNullTable[index];
    if ( !data.find( (e) => e.columnName == element[Object.keys(element)[0]] )) {
      const sameValue = notNullTable.filter( (e) => e[Object.keys(e)[0]] === element[Object.keys(element)[0]]);
      const reduced = sameValue
        .reduce( (acc, cur) => {
          const age = acc.age + cur.age;
          return { ...acc, age};
        });
      data.push( 
        {
          columnName: element[Object.keys(element)[0]], 
          count: sameValue.length, 
          age: reduced.age/sameValue.length
        } 
      );
    }
    index++;
  }
  return data;
}