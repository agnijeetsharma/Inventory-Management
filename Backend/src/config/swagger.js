import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Inventory Management API',
      version: '1.0.0',
      description: 'API documentation for managing users and products',
    },
    servers: [
      {
        url: 'http://localhost:8080/api/v1',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    // No global security here
  },
 apis: ["./src/docs/*.swagger.js"],
};



const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;