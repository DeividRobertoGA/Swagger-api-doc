import { db } from '../Config/database.config.js';
import bcrypt from "bcrypt";

const login = (mail, callback) => {
    db.query("SELECT id, name, mail, password FROM users WHERE mail=?", [mail], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
};

const register = async (dados, callback) => {
    const cryptPassword = await bcrypt.hash(dados.password, 10);

    db.query("INSERT INTO users (name, mail, password) VALUES (?, ?, ?)", [dados.name, dados.mail, cryptPassword], (err, result) => {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, result);
        }
    })
};

const recoverPassword = async (dados,callback) => {
    const cryptPassword = await bcrypt.hash(dados.password, 10);

    db.query("UPDATE users SET password=? WHERE mail=?", [cryptPassword, dados.mail], (err, result) => {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, result);
        }
    })
};

export default {login, register, recoverPassword};