const express = require("express");
const db = require("./db.config");

const app = express();

const routes = require("../routes/routes");
routes.initialize(app);

const PORT = 50000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
