import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import sequelize from './config/db.js';
import authRoutes from './routes/auth.route.js';
import habitsRoutes from './routes/habits.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', habitsRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

const initializeApp = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');

        await sequelize.sync({ alter: true });
        console.log('Database synchronized.');

        app.listen(PORT, () => {
            console.log(`Server running on PORT: ${PORT}`);
        });
    } catch (error) {
        console.error('Error during database initialization:', error);
    }
};

initializeApp();
