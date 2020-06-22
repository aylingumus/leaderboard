const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var routes = require("./routes/leaderboard.routes.js");
routes(app);

app.listen(PORT, function () {
  console.log(`Listening on ${ PORT }`);
});

module.exports = app