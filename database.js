// Importer le module MySQL
const mysql = require("mysql");

// Créer une connexion à la base de données en utilisant les paramètres de connexion
// https://www.npmjs.com/package/mysql#introduction


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'marvel'
  });


// Établir la connexion à la base de données

// Exporter la connexion pour pouvoir l'utiliser dans d'autres modules
module.exports = { connection };