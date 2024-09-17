import { Router } from 'express';
import CouponsController from '../controller/couponsController.js'
import RoutesAuth from '../middleware/routesAuth.js';

const router = Router();
const controller = new CouponsController()
const middleware = new RoutesAuth()

// router.get('/', middleware.handleValidateToken, controller.handleGetAllItems);
// router.post('/', middleware.handleValidateToken, controller.handleCreateItem);
// router.get('/:id', middleware.handleValidateToken, controller.handleGetItem);
// router.put('/:id', middleware.handleValidateToken, controller.handleUpdateItem);
// router.delete('/:id', middleware.handleValidateToken, controller.handleDeleteItem);

router.get('/', controller.handleGetAllItems);
router.post('/', controller.handleCreateItem);
router.get('/:id', controller.handleGetItem);
router.put('/:id', controller.handleUpdateItem);
router.delete('/:id', controller.handleDeleteItem);

export default router;
