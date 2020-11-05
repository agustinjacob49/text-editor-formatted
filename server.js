const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const controllerDocuments = require("./routes/index.js");
const db = require("./db/index");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const publicPath = path.join(__dirname, 'build');

app.use(express.static(publicPath));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conectado");
  })
  .catch(err => {
    console.log("Error", err);
    process.exit();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

controllerDocuments(app);
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en el puerto ${PORT}.`);
});