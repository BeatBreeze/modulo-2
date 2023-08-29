const express = require ("express");
const logger = require ("morgan");
const app = express(); 

require ("./config/db.config");
require ("./config/hbs.config");

app.set ("view engine", "hbs");
app.set ("views", `${__dirname}/views`);

app.use (express.urlencoded({extended : true}));

app.use (express.static ("public"));
app.use (logger("dev"));

const router = require ("./config/routes.config");
app.use ("/",router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Ready!");
  });




