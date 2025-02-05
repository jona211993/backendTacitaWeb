import {Router} from 'express';
import * as basesCtrl from '../controllers/bases.controller.js'

const router = Router();

// Para ver bases manualeas
router.post('/bases/Manuales',basesCtrl.getBasesManuales );

// Para ver seg PDP
router.post('/bases/seguimientoPDP',basesCtrl.getSeguimientoPDP);

// Para ver seg VLL
router.post('/bases/seguimientoVLL',basesCtrl.getSeguimientoVLL);




export default  router;