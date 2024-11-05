const express = require('express');
const app = express();
app.use(express.json()); 

const path = require('path');
const storeRoutes = require('./routes/storeRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const profileManagementRoutes = require('./routes/profileManagementRoutes');
const talonRoutes = require('./routes/talonRoutes');
const userManagementRoutes = require('./routes/userManagementRoutes');
const userRoutes = require('./routes/userRoutes');


// Middleware para servir arquivos estáticos (CSS e JS)
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Rotas para as páginas HTML
app.use('/', storeRoutes);
app.use('/', dashboardRoutes);
app.use('/', inventoryRoutes);
app.use('/', profileManagementRoutes);
app.use('/', talonRoutes);
app.use('/', userManagementRoutes);
app.use('/', userRoutes);


module.exports = app;
