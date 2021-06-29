import { Router } from 'express';
import CalamityController from './app/controllers/CalamityController';
import CalamityList from './app/validators/CalamityList';
import CalamityStore from './app/validators/CalamityStore';

const routes = new Router();

routes.get('/calamity/', CalamityList, CalamityController.index);
routes.post('/calamity/', CalamityStore, CalamityController.create);
routes.get('/calamity/:id', CalamityController.show);
routes.put('/calamity/:id', CalamityController.update);
routes.delete('/calamity/:id', CalamityController.delete);

export default routes;
