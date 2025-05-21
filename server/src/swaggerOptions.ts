const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A simple API',
    },
  },
  apis: ['./src/routes/*.ts', './src/app.ts'], // Path to the API routes
};

export default options;