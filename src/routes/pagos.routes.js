import {Router} from 'express';
import * as pagosCtrl from '../controllers/pagos.controlllers.js'


const router = Router();

// Para Pagos
router.post('/buscarPagosNOR',pagosCtrl.getBusquedaNOR );
router.post('/buscarPagosREC',pagosCtrl.getBusquedaREC );
// Para canales
router.get('/listarCanales',pagosCtrl.getCanales);
// Para Carteras
router.post('/listarCarteras',pagosCtrl.getCarteras);

// Para Reconocer CONCEPTO PAGO
router.post('/reconocerConceptoPago',pagosCtrl.reconocerConceptoPago);
// Para Reconocer PAGO
router.post('/reconocerPago',pagosCtrl.reconocerPago);



export default  router;