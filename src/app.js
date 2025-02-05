import express from 'express'; 
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'

import authRoutes from './routes/auth.routes.js';
import clientesRoutes from './routes/clientes.routes.js';
import pagosRoutes from './routes/pagos.routes.js';
import reclamosRoutes from './routes/reclamos.routes.js'
import excepcionesRoutes from './routes/excepciones.routes.js'
import basesRoutes from './routes/bases.routes.js'


const app = express();
app.use(morgan('dev'));
app.use(express.json());
// Lista de orígenes permitidos
const allowedOrigins = [
    'https://tacitaweb.pages.dev',
    'http://localhost:5173' ,
    'https://00fafffa.tacitaweb.pages.dev'
];
app.use(cookieParser());
const corsOptions = {
    origin: function (origin, callback) {
        
        // Permitir solicitudes sin origen (como las hechas desde Postman o cURL)
        if (!origin)  return callback(null, true);
        // Verificar si el origen está en la lista de permitidos
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true // Permitir el uso de credenciales
};

app.use(cors(corsOptions));

// Rutas
app.get('/', (req, res) => {
    res.send('HOLA EXPERTIS');
});
app.use('/', authRoutes);
app.use('/', clientesRoutes);
app.use('/', pagosRoutes);
app.use('/', reclamosRoutes);
app.use('/', excepcionesRoutes);
app.use('/', basesRoutes);

export default app;