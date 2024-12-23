const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const noteRoutes = require('./routes/noteRoutes');

// Middleware
app.use(express.json());

app.use('/api/notes', noteRoutes);

// Test database connection
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Database connection failed:', err));

// Sync models with database
sequelize.sync();

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));