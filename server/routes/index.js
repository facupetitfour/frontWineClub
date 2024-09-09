import { Router } from 'express';
import RoutesAuth from '../middleware/routesAuth.js';

const router = Router();
const middleware = new RoutesAuth()

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.status(200).json({ title: 'Express' });
// });
router.get('/', middleware.handleValidateToken, (req,res)=>{
  res.status(200).json(req.body)
});


export default router;
