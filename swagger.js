const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Employee and Department API',
    description: 'API for managing company staff and departments',
  },
  host: 'cse341w03project.onrender.com',
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);