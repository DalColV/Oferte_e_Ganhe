require('dotenv').config();

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');

app.use(express.json()); 
app.use(cookieParser());

// para servir arquivos estáticos (CSS e JS)
app.use(express.static(path.join(__dirname, '../frontEnd/public')));

//cors global
const corsMiddleware = require('./middlewares/corsMiddleware');

const viewRoutes = require('./routes/view/viewRoutes');
const storeRoutes = require('./routes/store/storeRoutes');
const inventoryRoutes = require('./routes/inventory/inventoryRoutes');
const profileManagementRoutes = require('./routes/profile/profileManagementRoutes');
const talonRoutes = require('./routes/talon/talonRoutes');
const userRoutes = require('./routes/user/userRoutes');
const authRoutes = require('./routes/auth/authRoutes');


app.use(corsMiddleware);


app.use('/', storeRoutes);
app.use('/', viewRoutes);
app.use('/', inventoryRoutes);
app.use('/', profileManagementRoutes);
app.use('/', talonRoutes);
app.use('/', userRoutes);
app.use('/', authRoutes);


module.exports = app;
