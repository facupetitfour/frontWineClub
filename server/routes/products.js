import { Router } from 'express';
import ProductsController from '../controller/productsController.js'
import RoutesAuth from '../middleware/routesAuth.js';

const router = Router();
const controller = new ProductsController()
const middleware = new RoutesAuth()

router.get('/', middleware.handleValidateToken, controller.handleGetAllItems);
router.post('/', middleware.handleValidateToken, controller.handleCreateItem);
router.get('/:id', middleware.handleValidateToken, controller.handleGetItem);
router.put('/:id', middleware.handleValidateToken, controller.handleUpdateItem);
router.delete('/:id', middleware.handleValidateToken, controller.handleDeleteItem);

export default router;
