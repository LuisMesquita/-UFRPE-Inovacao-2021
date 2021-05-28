import { Router } from 'express';
import CalamityController from './app/controllers/CalamityController';

const routes = new Router();

routes.get('/calamity/', CalamityController.index);
routes.post('/calamity/', CalamityController.create);
routes.get('/calamity/:id', CalamityController.show);
routes.put('/calamity/:id', CalamityController.update);
routes.delete('/calamity/:id', CalamityController.delete);

export default routes;
