import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from "express-session";
import passport from "passport";
import cloudinary from 'cloudinary';
import MongoStore from 'connect-mongo';

import notificationRoutes from "./backend/routes/notification.route.js";
import "./backend/passport.js";
import authRoute from './backend/routes/auth.route.js';
import userRoute from './backend/routes/user.route.js';
import postRoute from './backend/routes/post.route.js';
import connectDB from './backend/controllers/db/connectDB.js';

dotenv.config();
const app = express();

connectDB();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret_key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    collectionName: 'sessions',
    dbName: 'new-clone',
  }),
  cookie: {
    secure: false, 
    httpOnly: true,
    sameSite: "lax"
  }
}));

app.use(passport.initialize());
app.use(passport.session());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
