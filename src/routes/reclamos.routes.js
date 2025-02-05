import {Router} from 'express';
import * as reclamosCtrl from '../controllers/reclamos.controllers.js'

const router = Router();

// Para ver reclamos
router.get('/reclamos',reclamosCtrl.getReclamos );

// Para ver ViaReclamos
router.get('/listaViaReclamo',reclamosCtrl.getListaViaReclamo);
// Para registrar el reclamo
router.post('/crearReclamo',reclamosCtrl.crearReclamo);
router.delete('/eliminarReclamo',reclamosCtrl.eliminarReclamo);

//Para Validar el documento
router.post('/validarDocumento',reclamosCtrl.validarDocumento);


export default  router;