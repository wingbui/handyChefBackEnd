const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
dotenv.config();

// middleware
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./connectDB.js');
const authRouter = require('./routes/authRoutes.js');

app.use(cors());
app.options('*', cors());

app.use(express.json());

app.use('/api/v1/auth', authRouter);

app.use(errorHandler);

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
