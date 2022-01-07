require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');



const bootstrap = () => {
  const port = process.env.PORT || 3000;
  const app = express();

  // Middlewares
  app.use(express.json());

  // Routes
  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);
  
  // Startup
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
};

bootstrap();


