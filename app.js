//Importando as dependencias da comunidade
import express from 'express';
import cors from 'cors';
import colors from 'colors';
import dotenv from 'dotenv';
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./src/Config/swagger.json" with { type: "json" };

//Importando os Verificações
import { db } from "./src/Config/database.config.js"

//Importando as Rotas
import UserRoute from "./src/Routes/user.route.js";
import ProductRoute from "./src/Routes/product.route.js";

//Configurações
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 3000;
let DOC_URL = "";
if (process.env.SYSTEM_MODE === 'production') {
    DOC_URL = process.env.BACKEND_URL_PRODUCTION
} else {
    DOC_URL = process.env.BACKEND_URL_DEV
}
swaggerDocs.servers[0].url = process.env.BACKEND_URL_DEV;
swaggerDocs.servers[1].url = process.env.BACKEND_URL_PRODUCTION;
const app = express();


//Configurar os Middlewares
app.use(express.json());
app.use(cors());

//Rotas Internas
app.get('/ping', (req, res) => {res.send("Ping")});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

//Rotas Externas
app.use(UserRoute);
app.use(ProductRoute);

//Iniciando o Servidor
app.listen(PORT, () => {
    console.log("API desenvoldida por Deivid Roberto".cyan);

    setTimeout(() => {
        console.log(`Servidor iniciado na porta: ${PORT}`.blue)
    }, 5000)

    setTimeout(() => {
        db.getConnection((err, connection) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Documentação da API em: ${DOC_URL}/api-docs`.blue);
            }
        })
    }, 7000)

    setTimeout(() => {
        db.getConnection((err, connection) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Conexão com o banco de dados: OK".green);
            }
        })
    }, 9000)
})