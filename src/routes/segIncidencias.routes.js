import {Router} from 'express';
import * as segIncidenciasCtrl from '../controllers/segIncidencias.controller.js'

const router = Router();


router.get('/obtenerListaSolucionSeguimientoIncidencia',segIncidenciasCtrl.getListaSolucionSeg);
router.post('/ingresarSolucionSeguimientoIncidencia',segIncidenciasCtrl.ingresarNuevaSolucion);
router.post('/registrarSeguimientoIncidencia',segIncidenciasCtrl.ingresarNuevaSegmientoIncidencia);





export default  router;