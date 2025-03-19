const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Image Uploader API',
            version: '1.0.0',
            description: 'API for upload download Image',
        },
        servers: [
            {
                url: 'https://image-uploader-production-fcc9.up.railway.app/',
                description: 'Production server',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
