import {Router} from 'express';
import * as baseDocumentosCtrl from '../controllers/baseDocumentos.controller.js'

const router = Router();


router.get('/obtenerListaDocumentosPendientes',baseDocumentosCtrl.getListaDocumentosPendientes);






export default  router;