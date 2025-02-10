import {Router} from 'express';
import * as agendadosCtrl from '../controllers/agendados.controller.js'

const router = Router();


router.post('/agendadosSup',agendadosCtrl.getAgendadosSupervisor);

router.post('/agendados',agendadosCtrl.getAgendados);


export default  router;