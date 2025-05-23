import { db, executeQuery } from "../Config/database.config.js";

const login = async (req, res, next) => {
    let errors = [];

    !req.body.mail && errors.push("E-Mail não informado");
    !req.body.password && errors.push("Senha não informada");

    if (req.body.mail) {
        let mailExists = await executeQuery(db, "SELECT mail FROM users WHERE mail = ? ", [req.body.mail]);

        mailExists.length < 1 && errors.push("E-mail e/ou Senha incorretos");
    }

    if (errors.length > 0) {
        res.status(401).json({errors: errors.join(", ")});
    } else {
        next();
    }
};

const register = async (req, res, next) => {
    let errors = [];

    !req.body.name && errors.push("Nome não informado");
    !req.body.mail && errors.push("E-Mail não informado");
    !req.body.password && errors.push("Senha não informada");

    if (req.body.mail) {
        let mailExists = await executeQuery(db, "SELECT mail FROM users WHERE mail = ? ", [req.body.mail]);

        mailExists.length > 0 && errors.push("Usuário já existe");
    }

    if (errors.length > 0) {
        res.status(401).json({errors: errors.join(", ")});
    } else {
        next();

    };
};

const recoverPassword = async (req, res, next) => {
    let errors = [];

    !req.body.mail && errors.push("E-Mail não informado");
    !req.body.password && errors.push("Senha não informada");

    if (req.body.mail) {
        let mailExists = await executeQuery(db, "SELECT mail FROM users WHERE mail = ? ", [req.body.mail]);

        mailExists.length < 1 && errors.push("E-mail não existe");
    }

    if (errors.length > 0) {
        res.status(401).json({errors: errors.join(", ")});
    } else {
        next();
    }
};

export default {login, register, recoverPassword}