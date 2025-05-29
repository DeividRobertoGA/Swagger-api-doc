import { db } from '../Config/database.config.js';
import bcrypt from "bcrypt";

const login = (email, callback) => {
    db.query("SELECT id, name, email, password FROM users WHERE email=?", [email], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
};

const register = async (dados, callback) => {
    const cryptPassword = await bcrypt.hash(dados.password, 10);

    db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [dados.name, dados.email, cryptPassword], (err, result) => {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, result);
        }
    })
};

const recoverPassword = async (dados,callback) => {
    const cryptPassword = await bcrypt.hash(dados.password, 10);

    db.query("UPDATE users SET password=? WHERE email=?", [cryptPassword, dados.email], (err, result) => {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, result);
        }
    })
};

export default {login, register, recoverPassword};