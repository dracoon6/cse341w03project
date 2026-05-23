const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Employee and Department API',
    description: 'API for managing company staff and departments',
  },
  host: 'localhost:3000',
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);