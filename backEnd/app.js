const express = require('express');
const app = express();
app.use(express.json()); 

const path = require('path');
const storeRoutes = require('./routes/store/storeRoutes');
const dashboardRoutes = require('./routes/dashboard/dashboardRoutes');
const inventoryRoutes = require('./routes/inventory/inventoryRoutes');
const profileManagementRoutes = require('./routes/profile/profileManagementRoutes');
const talonRoutes = require('./routes/talon/talonRoutes');
const userManagementRoutes = require('./routes/user/userManagementRoutes');
const userRoutes = require('./routes/user/userRoutes');


// Middleware para servir arquivos estáticos (CSS e JS)
app.use(express.static(path.join(__dirname, '../frontEnd/public')));


// Rotas para as páginas HTML
app.use('/', storeRoutes);
app.use('/', dashboardRoutes);
app.use('/', inventoryRoutes);
app.use('/', profileManagementRoutes);
app.use('/', talonRoutes);
app.use('/', userManagementRoutes);
app.use('/', userRoutes);


module.exports = app;
