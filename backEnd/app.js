require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const { authMiddleware } = require('./middlewares/authMiddleware')
;

app.use(express.json()); 
app.use(cookieParser());


const path = require('path');

const viewRoutes = require('./routes/view/viewRoutes');
const storeRoutes = require('./routes/store/storeRoutes');
const inventoryRoutes = require('./routes/inventory/inventoryRoutes');
const profileManagementRoutes = require('./routes/profile/profileManagementRoutes');
const talonRoutes = require('./routes/talon/talonRoutes');
const userRoutes = require('./routes/user/userRoutes');
const authRoutes = require('./routes/auth/authRoutes');


//  para servir arquivos estáticos (CSS e JS)
app.use(express.static(path.join(__dirname, '../frontEnd/public')));


// Rotas para as páginas HTML
app.use('/', authMiddleware, storeRoutes);
app.use('/', authMiddleware, viewRoutes);
app.use('/', authMiddleware, inventoryRoutes);
app.use('/', authMiddleware, profileManagementRoutes);
app.use('/', authMiddleware, talonRoutes);
app.use('/', userRoutes);
app.use('/', authRoutes);


module.exports = app;
