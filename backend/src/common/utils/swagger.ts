import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { Express } from 'express';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Nawy Apartment API',
            version: '1.0.0',
            description: 'API documentation for Nawy Apartment Task',
        },
    },
    apis: [
        process.env.NODE_ENV === 'production'
            ? './dist/**/*.js'
            : './src/**/*.ts'
    ],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);

export function setupSwagger(app: Express) {
  app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}