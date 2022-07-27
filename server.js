const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
dotenv.config();

// middleware
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./connectDB.js');

// routes
const authRouter = require('./routes/authRoutes.js');
const chefServiceRouter = require('./routes/chefServiceRoutes');
const dishRouter = require('./routes/dishRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const userRouter = require('./routes/userRoutes');
const paymentRouter = require('./routes/paymentRoutes');
const notificationRouter = require('./routes/notificationRoutes');

app.options('*', cors());
app.use(cors());

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/chefServices', chefServiceRouter);
app.use('/api/v1/dishes', dishRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/payment', paymentRouter);
app.use('/api/v1/notifications', notificationRouter);

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
