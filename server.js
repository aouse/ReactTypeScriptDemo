
const express = require('express');
const path = require('path');

const app = express();

app.use('/next', express.static(path.join(__dirname, 'build')))
app.use(express.static('build'))

console.log(`server started on port: 8080`);

app.listen(8080)

