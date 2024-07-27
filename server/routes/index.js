import express from "express";
import apiRoutes from './api/index.js';
import homeRoutes from './homeRoutes.js';

const routes = express.Router();

routes.use('/api', apiRoutes);
routes.use('/', homeRoutes);

export default routes;