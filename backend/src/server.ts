import dotenv from 'dotenv';
import app from './app';
import connectDB from './config/database';
// import './@types/express';

dotenv.config();

const PORT = process.env.PORT || 5000;

console.log('ENV JWT:', process.env.JWT_ACCESS_SECRET);

// Database connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
