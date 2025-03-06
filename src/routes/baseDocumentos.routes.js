import {Router} from 'express';
import * as baseDocumentosCtrl from '../controllers/baseDocumentos.controller.js'

const router = Router();


router.get('/obtenerListaDocumentosPendientes',baseDocumentosCtrl.getListaDocumentosPendientes);
router.get('/obtenerListaDocumentosGenerados',baseDocumentosCtrl.getListaDocumentosGenerados);
router.post('/listaDocumentosPorCodigoIDC',baseDocumentosCtrl.buscarPorCodigoIDC);







export default  router;