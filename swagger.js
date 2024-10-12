// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Social Media API',
        version: '1.0.0',
        description: 'API documentation for the Social Media backend',
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
    apis: ['./routes/*.js'], // Path to the route files for API documentation
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
