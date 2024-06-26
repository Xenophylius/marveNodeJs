const express = require("express");
const mustacheExpress = require("mustache-express");
const app = express();
const { connection } = require('./database')
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
let bodyParser = require("body-parser");

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes à ajouter ici

/**
* @swagger
* components:
*   schemas: 
*     Annonce:
*       type: object
*       properties: 
*         id: 
*           type: integer                
*         nom:
*           type: string
*         description: 
*           type: string
*         photo: 
*           type: string
*       required: 
*         - nom
*         - description
*/

/**
* @swagger
* /:
*   get:
*     summary: Accueil
*     description: Welcome Home
*     responses:
*       200:
*         description: Successful response
*/
app.get('/', (req, res) => {
    res.send('COUCOU')
})

/**
* @swagger
* /annonces:
*   get:
*     summary: Get ALL Annonces
*     description: Get ALL Personnages
*     responses:
*       200:
*         description: Successful response
*         content: 
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Annonce'
*/
app.get('/annonces', (req, res) => {
    connection.query('SELECT * FROM `personnages`', function (error, results, fields) {
      if (error) throw error;
      res.json({ results })
    });
})

/**
* @swagger
* /annonces/{id}:
*   get:
*     summary: Get annonce by ID
*     description: Get annonce by ID
*     parameters: 
*       - in: path
*         name: id
*         required: true
*         description: Numeric ID required
*         schema:
*           type: integer
*     responses:
*       200:
*         description: Get annonce by ID
*         content: 
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Annonce'
*               
*/
app.get('/annonces/:id', (req, res) => {
    const sqlReq = 'SELECT * FROM `personnages` WHERE id=' + req.params.id
    connection.query(sqlReq, function (error, results, fields) {
      if (error) throw error;
      res.json({ results })
  });
})

/**
* @swagger
* /annonces/post:
*   post:
*     summary: Add a annonce
*     description: Add a annonce
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Annonce'
*     responses:
*       200:
*         description: Add a annonce
*         content: 
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties: 
*                   message: 
*                     type: string                  
*/
app.post('/annonces/post', (req, res) => {
  const sqlReq = "INSERT INTO `personnages` (`nom`, `description`) VALUES ('" + req.body.nom + "', '" + req.body.description + "')"  
  connection.query(sqlReq, function (error, results, fields) {
    if (error) throw error;
    res.json({ 'message': 'Post ajouté.' })
});
})



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});