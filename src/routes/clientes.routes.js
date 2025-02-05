import {Router} from 'express';
import * as clientesCtrl from '../controllers/clientes.controllers.js'
// import { verifyUser } from '../midelware/autenticacion.js';

const router = Router();

router.get('/obtenerCliente/:documento',clientesCtrl.getClienteByCodigoIDC);
router.get('/obtenerClientePorTelefono/:telefono',clientesCtrl.getClienteByTelefono);
router.get('/obtenerClientePorNombreApellido',clientesCtrl.getClienteByNombres_Apellidos);
// Para el ver Mensaje
router.post('/verMensaje',clientesCtrl.getMensaje);

router.get('/obtenerDatosTitular/:idDeudor',clientesCtrl.getDatosTitularPorIDdeudor);
router.post('/obtenerDatosProductos',clientesCtrl.getDatosProductosPorIDdeudorAndEntidad);
router.post('/obtenerDatosPagosCliente',clientesCtrl.getPagosPorIDdeudorAndEntidad);
router.post('/obtenerDatosGestionesCliente',clientesCtrl.getGestionesPorDocumentoAndCartera);
router.post('/obtenerDatosExcepcionesCliente',clientesCtrl.getExcepcionesPorIDdeudorAndEntidad);
// Para lo de nivel 3 y 4
router.post('/obtenerListaNivel3',clientesCtrl.getListaNivel3);
router.post('/obtenerListaNivel4',clientesCtrl.getListaNivel4);

//Insertar gestiones:
// 1. PDP:
router.post('/insertarGestionesPDP',clientesCtrl.insertarGestionPDP); 
// 2. PDP:
router.post('/insertarGestionesNoPDP',clientesCtrl.insertarGestionNoSonPDP); 

//Detalle Cuentas:
router.post('/obtenerDetalleCuentas',clientesCtrl.getDetallesCuentas); 

// Insertar Mensaje:
router.post('/insertarMensaje',clientesCtrl.insertarMensaje); 

// Insertar Excepcion:
router.post('/insertarExcepcion',clientesCtrl.registrarExepcion); 

//SOLICITUD DE DOCUMENTOS
// Obtener el num de solicitudes Totales
router.post('/obtenerNumSolicitudesTotales',clientesCtrl.getNumSolicitudesTotales); 

//consultarDireccionCarta
router.post('/obtenerDireccionCarta',clientesCtrl.getDireccionCarta); 


// CARTA DE NO ADEUDO
router.post('/validarCartaDeNoAdeudo',clientesCtrl.getValidarCartaNA);
router.post('/validarSegundaCDNA',clientesCtrl.getValidarSegundaCDNA);
//1.1 Registrar CDNA - Tipo Correo
router.post('/registrarCDNATipoCorreo',clientesCtrl.registrarCDNATipoCorreo);
//1.2 Registrar CDNA - Tipo WhatsApp
router.post('/registrarCDNATipoWsp',clientesCtrl.registrarCDNATipoWsp); 
//1.3 Registrar CDNA - Tipo Oficina
router.post('/registrarCDNATipoOficina',clientesCtrl.registrarCDNATipoOficina); 
//1.4 Registrar CDNA - Tipo Courier
router.post('/registrarCDNATipoCourier',clientesCtrl.registrarCDNATipoCourier); 

// CARTA DE NOTIFICACION
//1.1 Registrar Carta Notificacion - Tipo Correo
router.post('/registrarNotificacionTipoCorreo',clientesCtrl.registrarCartaNotificacionTipoCorreo);
//1.2 Registrar Carta Notificacion - Tipo WhatsApp
router.post('/registrarNotificacionTipoWsp',clientesCtrl.registrarCartaNotificacionTipoWsp); 
//1.3 Registrar Carta Notificacion - Tipo Oficina
router.post('/registrarNotificacionTipoOficina',clientesCtrl.registrarCartaNotificacionTipoOficina); 
//1.4 Registrar Carta Notificacion - Tipo Courier
router.post('/registrarNotificacionTipoCourier',clientesCtrl.registrarCartaNotificacionTipoCourier); 


// COMPROMISO DE PAGO
//Para Validacion
router.post('/obtenerDatosByValidacionCompromiso',clientesCtrl.getDatosValidacion); 
//1.1 Registrar Compromiso de pago - Tipo Correo
router.post('/registrarCompromisoTipoCorreo',clientesCtrl.registrarCompromisoTipoCorreo); 
//1.2 Registrar Compromiso de pago - Tipo WhatsApp
router.post('/registrarCompromisoTipoWsp',clientesCtrl.registrarCompromisoTipoWsp); 
//1.3 Registrar Compromiso de pago - Tipo Oficina
router.post('/registrarCompromisoTipoOficina',clientesCtrl.registrarCompromisoTipoOficina); 
//1.4 Registrar Compromiso de pago- Tipo Courier
router.post('/registrarCompromisoTipoCourier',clientesCtrl.registrarCompromisoTipoCourier); 

// CRONOGRAMA DE PAGO
//Para Validacion
router.post('/obtenerDatosByValidacionCronograma',clientesCtrl.getDatosValidacionCronograma); 
//1.1 Registrar Cronograma de  pago - Tipo Correo
router.post('/registrarCronogramaTipoCorreo',clientesCtrl.registrarCronogramaTipoCorreo);
//1.2 Registrar Cronograma de  pago - Tipo WhatsApp
router.post('/registrarCronogramaTipoWsp',clientesCtrl.registrarCronogramaTipoWsp); 
//1.3 Registrar Cronograma de  pago - Tipo Oficina
router.post('/registrarCronogramaTipoOficina',clientesCtrl.registrarCronogramaTipoOficina); 
//1.4 Registrar Cronograma  de  pago- Tipo Courier
router.post('/registrarCronogramaTipoCourier',clientesCtrl.registrarCronogramaTipoCourier); 


// ESTADO DE CUENTA
//1.1 Registrar EECC - Tipo Correo
router.post('/registrarEECCTipoCorreo',clientesCtrl.registrarEstadoCuentaTipoCorreo); 
//1.2 Registrar EECC - Tipo WhatsApp
router.post('/registrarEECCTipoWsp',clientesCtrl.registrarEstadoCuentaTipoWsp); 
//1.3 Registrar EECC de pago - Tipo Oficina
router.post('/registrarEECCTipoOficina',clientesCtrl.registrarEstadoCuentaTipoOficina); 
//1.4 Registrar EECC  - Tipo Courier
router.post('/registrarEECCTipoCourier',clientesCtrl.registrarEstadoCuentaTipoCourier);

// CARTA CAMPAÑA
//1.1 Registrar CCAMPAÑA - Tipo Correo
router.post('/registrarCCampanaTipoCorreo',clientesCtrl.registrarCCampanaTipoCorreo); 
//1.2 Registrar CCAMPAÑA - Tipo WhatsApp
router.post('/registrarCCampanaTipoWsp',clientesCtrl.registrarCCampanaTipoWsp); 
//1.3 Registrar CCAMPAÑA - Tipo Oficina
router.post('/registrarCCampanaTipoOficina',clientesCtrl.registrarCCampanaTipoOficina); 
//1.4 Registrar CCAMPAÑA  - Tipo Courier
router.post('/registrarCCampanaTipoCourier',clientesCtrl.registrarCCampanaTipoCourier);

// CARTA PLANILLA
// VALIDACION DE CARTA PLANILLA
router.post('/validacionCartaPlanilla',clientesCtrl.consultaCartaPlanilla); 
//1.1 Registrar CPLANILLA - Tipo Correo
router.post('/registrarCPlanillaTipoCorreo',clientesCtrl.registrarCPlanillaTipoCorreo); 
//1.2 Registrar CPLANILLA - Tipo WhatsApp
router.post('/registrarCPlanillaTipoWsp',clientesCtrl.registrarCPlanillaTipoWsp); 
//1.3 Registrar CPLANILLA - Tipo Oficina
router.post('/registrarCPlanillaTipoOficina',clientesCtrl.registrarCPlanillaTipoOficina); 
//1.4 Registrar CPLANILLA  - Tipo Courier
router.post('/registrarCPlanillaTipoCourier',clientesCtrl.registrarCPlanillaTipoCourier);

// CARTA AGRESIVA
// VALIDACION DE CARTA AGRESIVA PARA EL VALOR
router.post('/validacionCartaAgresiva',clientesCtrl.consultaCartaAgresiva); 
//1.1 Registrar CAGRESIVA - Tipo Correo
router.post('/registrarCAgresivaTipoCorreo',clientesCtrl.registrarCAgresivaTipoCorreo); 
//1.2 Registrar CAGRESIVA - Tipo WhatsApp
router.post('/registrarCAgresivaTipoWsp',clientesCtrl.registrarCAgresivaTipoWsp); 
//1.3 Registrar CAGRESIVA - Tipo Oficina
router.post('/registrarCAgresivaTipoOficina',clientesCtrl.registrarCAgresivaTipoOficina); 
//1.4 Registrar CAGRESIVA  - Tipo Courier
router.post('/registrarCAgresivaTipoCourier',clientesCtrl.registrarCAgresivaTipoCourier);

// AGENDAMIENTO
//1.1 Registrar Agendamiento
router.post('/registrarAgendamiento',clientesCtrl.registrarAgendamiento); 


// MODIFICAR GESTION
router.put('/modificarGestion',clientesCtrl.modificarGestion); 


export default  router;