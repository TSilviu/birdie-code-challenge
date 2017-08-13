import * as path from 'path';
import * as express from 'express';

const app = express();

app.use("/build", express.static(__dirname + '/build'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(3000);
console.log('Visit localhost:3000');
