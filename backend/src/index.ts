import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import registerRoutes from './routes/registerRoutes.js';
import { db } from './database/db.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const getSwaggerDocument = (host: string) => ({
  openapi: '3.0.0',
  info: {
    title: 'QA Playground API',
    version: '1.0.0',
    description: 'API for QA Playground registration form'
  },
  servers: [
    { url: host }
  ],
  paths: {
    '/api/register': {
      post: {
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password', 'age', 'terms'],
                properties: {
                  email: { type: 'string', example: 'user@example.com' },
                  password: { type: 'string', example: 'password123' },
                  age: { type: 'number', example: 25 },
                  terms: { type: 'boolean', example: true }
                }
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'User registered successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'User registered successfully' },
                    userId: { type: 'string', example: 'uuid-string' }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Validation error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: false },
                    errors: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          field: { type: 'string' },
                          code: { type: 'string' },
                          message: { type: 'string' }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: false },
                    message: { type: 'string', example: 'Internal server error' }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
});

app.use('/api/docs', swaggerUi.serve, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const host = `${req.protocol}://${req.get('host')}`;
  swaggerUi.setup(getSwaggerDocument(host))(req, res, next);
});
app.use('/api', registerRoutes);

async function start() {
  await db.init();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
