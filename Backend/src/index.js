import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { app } from './app.js';
import { sequelize } from './config/db.js';
const PORT = process.env.PORT || 5000;
dotenv.config({ path: './.env' }); 
const start = async () => {
  await connectDB();
  await sequelize.sync(); 
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
