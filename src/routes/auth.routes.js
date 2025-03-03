import {Router} from 'express';
import * as authCtrl from '../controllers/auth.controller.js'
import { verifyUser } from '../midelware/autenticacion.js';

const router = Router();
/*
router.get('/verificacion',verifyUser,(req, res) =>{
 return res.json({Status: "Success" , name: req.name})    
})*/


router.post('/login' , authCtrl.login);
//Para mostrarEmpleado
router.post('/mostrarEmpleado' , authCtrl.mostrarEmpleado);
router.get('/logout' , authCtrl.logout);
router.get('/verificacion', authCtrl.verificar);

export default  router;
