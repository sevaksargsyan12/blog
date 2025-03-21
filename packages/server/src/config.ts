import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment variables');
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true, // This ensures that SSL is required
      rejectUnauthorized: false, // This will disable certificate validation (use with caution)
    },
  },
});

export default sequelize;
