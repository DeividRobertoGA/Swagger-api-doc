//Importando as dependencias da comunidade
import mysql from "mysql";
import dotenv from "dotenv";

//Configurações
dotenv.config({ path: "./config.env" });

//Criando a conexão com o Banco de Dados
const db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

//Criando uma função de execução de Queries
const executeQuery = async (connection, ssql, parameters) => {
    return new Promise((resolve, reject) => {
        connection.query(ssql, parameters, (error, result) => {
            if (error) {
                return reject(error);
            } else {
                return resolve(result);
            }
        });
    });
};

export {db, executeQuery};