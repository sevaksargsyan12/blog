import dotenv from 'dotenv';
import express, { Response, Request, NextFunction } from 'express';
import cors from 'cors';
import sequelize from './config';

import postsRoutes from './api/routes/postRoute';

dotenv.config();

const app = express();
app.use(cors());

// Use express.json() to parse JSON request bodies
app.use(express.json());

app.use('/api', postsRoutes);

// Global error handling middleware.
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err.stack, next);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
