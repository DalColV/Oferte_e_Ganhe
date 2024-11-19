require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json()); 

const path = require('path');

const viewRoutes = require('./routes/view/viewRoutes');
const storeRoutes = require('./routes/store/storeRoutes');
const inventoryRoutes = require('./routes/inventory/inventoryRoutes');
const profileManagementRoutes = require('./routes/profile/profileManagementRoutes');
const talonRoutes = require('./routes/talon/talonRoutes');
const userRoutes = require('./routes/user/userRoutes');
const authRoutes = require('./routes/auth/authRoutes')


// Middleware para servir arquivos estáticos (CSS e JS)
app.use(express.static(path.join(__dirname, '../frontEnd/public')));


// Rotas para as páginas HTML
app.use('/', storeRoutes);
app.use('/', viewRoutes);
app.use('/', inventoryRoutes);
app.use('/', profileManagementRoutes);
app.use('/', talonRoutes);
app.use('/', userRoutes);
app.use('/', authRoutes)


module.exports = app;
