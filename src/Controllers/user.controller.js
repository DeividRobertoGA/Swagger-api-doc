import Model from "../Models/user.model.js"
import { createJWT } from "../Config/token.config.js";
import bcrypt from "bcrypt";

const login = (req, res) => {
    Model.login(req.body.mail, async (err, result) => {
        if (err) {
            res.status(500).send({errors: err});
        } else {
            if (await bcrypt.compare(req.body.password, result[0].password)) {
                let response = result[0];
                delete response.password;
                response['token'] = createJWT(response.id);

                res.status(200).send(response);
            } else {
                res.status(401).send({errors: "E-mail e/ou Senha incorretos"});
            }
        }
    })
};

const register = (req, res) => {
    const dados = {
        name: req.body.name,
        mail: req.body.mail,
        password: req.body.password,
    }

    Model.register(dados, (err, result) => {
        if (err) {
            return res.status(500).send({errors: err});
        } else {
            return res.status(201).send({message: "Usuário cadastrado com sucesso"});
        }
    })
};

const recoverPassword = (req, res) => {
    const dados = {
        mail: req.body.mail,
        password: req.body.password,
    }

    Model.recoverPassword(dados, (err, result) => {
        if (err) {
            return res.status(500).send({errors: err});
        } else {
            return res.status(200).send({message: "Senha alterada com sucesso"});
        }
    })
};

export default {login, register, recoverPassword}