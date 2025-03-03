import {Router} from 'express';
import * as incidenciasCtrl from '../controllers/incidencias.controller.js'

const router = Router();

router.post('/listarIncidencias',incidenciasCtrl.getListaIncidencias);
router.get('/obtenerTipos',incidenciasCtrl.getTipos);
router.post('/obtenerSubTipos',incidenciasCtrl.getSubTipo);
router.post('/enviarCorreo',incidenciasCtrl.enviarCorreo);
router.post('/registrarIncidencia',incidenciasCtrl.registrarIncidencia);




export default  router;