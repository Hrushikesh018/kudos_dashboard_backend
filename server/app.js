// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose.connect(`${process.env.MONGO_URI}`, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

// // Start Server
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });


import express from "express"
import cors from "cors"
import kudosRouter from './routes/kudosRoutes.js'
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js'
import metricRouter from './routes/metricRoutes.js'
const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))

//routes
app.use('/api/kudos',kudosRouter)
app.use('/api/users', userRouter);
app.use('/api/login',authRouter)
app.use('/api',metricRouter)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong!' });
});

export { app }