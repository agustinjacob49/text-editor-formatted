const express = require("express");
const bodyParser = require("body-parser");
const controllerDocuments = require("./routes/index.js");
const db = require("./db/index");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor en el puerto ${PORT}.`);
});