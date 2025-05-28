import { db } from "../Config/database.config.js";

const createProduct = (dados, callback) => {
    db.query("INSERT INTO products (name, stock, value) VALUES (?, ?, ?)", [dados.name, dados.stock, dados.value], (err, result) => {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, result);
        }
    })
};

const readProduct = (id, callback) => {
    db.query("SELECT * from products WHERE id=?", [id], (err, result) => {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, result);
        }
    })
};

const updateProduct = (id, dados, callback) => {
    db.query("UPDATE products SET name=?, stock=?, value=? WHERE id = ?", [dados.name, dados.stock, dados.value, id], (err, result) => {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, result);
        }
    })
};

const deleteProduct = (id, callback) => {
    db.query("DELETE FROM products WHERE id=?", [id], (err, result) => {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, result);
        }
    })
};

const listProducts = (callback) => {
    db.query("SELECT * FROM products", [], (err, result) => {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, result);
        }
    })
};

export default {createProduct, readProduct, updateProduct, deleteProduct, listProducts};