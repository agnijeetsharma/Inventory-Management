import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { app } from './app.js';
dotenv.config({ path: './.env' }); 
await connectDB()
  .then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server started at port: ${port}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1); 
  });

