const express = require('express');
const dotenv = require('dotenv');
const db = require('./models');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const path = require('path')

const authRoutes = require('./routes/auth.route');
const habitsRoutes = require('./routes/habits.route');

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

app.use('/api/auth', authRoutes);
app.use('/api', habitsRoutes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on PORT: ${PORT}`)
    });
})