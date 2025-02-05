import {Router} from 'express';
import * as excepcionesCtrl from '../controllers/excepciones.controller.js'

const router = Router();

// Para ver excepciones segun usuario
router.post('/excepciones/listaExcepciones',excepcionesCtrl.getExcepciones );

// Para ver excepciones historicas de un asesor
router.post('/excepciones/listaExcepcionesHistoricaAsesor',excepcionesCtrl.getExcepcionesPorAsesor );

// Para evaluar la excepcion 
router.post('/excepciones/evaluarExcepcion',excepcionesCtrl.evaluarExcepcion );

export default  router;