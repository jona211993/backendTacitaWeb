import {Router} from 'express';
import * as segIncidenciasCtrl from '../controllers/segIncidencias.controller.js'

const router = Router();


router.get('/obtenerListaSolucionSeguimientoIncidencia',segIncidenciasCtrl.getListaSolucionSeg);





export default  router;