import sql from "mssql";
import dotenv from 'dotenv';

dotenv.config();

const dbSettings = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false,  // Puedes ajustar esto según tus necesidades
        trustServerCertificate: true, // Puedes ajustar esto según tus necesidades
        dateStrings: true,
    }
};

export const getConnection= async () => {
    try {
        console.log(dbSettings)
        const pool = await sql.connect(dbSettings);
        return pool;        
    } catch (error) {
        console.error(error);
    }
}

