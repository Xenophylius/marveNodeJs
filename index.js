const express = require("express");
const mustacheExpress = require("mustache-express");
const app = express();
const { connection } = require('./database')
/**
 * Configuration de mustache
 * comme moteur de template
 * pour l'extension .mustache
 */
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

/**
 * Configuration de express
 * pour récupérer les données d'un formulaire
 * et pour servir les fichiers statiques
 * (css, js, images, etc.)
 */
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Routes à ajouter ici

app.get('/', (req, res) => {
    res.send('COUCOU')
})

app.get('/personnages', (req, res) => {
    connection.connect();
    connection.query('SELECT * FROM `personnages`', function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.send('Nom du personnage : ' + results[0].nom)
    });
     
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});