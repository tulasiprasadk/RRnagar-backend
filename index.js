const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { initDb } = require('./models');
const routes = require('./routes');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);

const PORT = process.env.PORT || 4000;

(async () => {
  await initDb();
  app.listen(PORT, () => {
    console.log(`RRnagar backend running on http://localhost:${PORT}`);
  });
})();