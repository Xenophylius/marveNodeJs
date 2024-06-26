const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Swagger Test',
        version: '1.0.0',
        description: 'On test Swagger API-DOC',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./index.js']
}
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;