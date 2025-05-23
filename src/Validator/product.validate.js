import {db, executeQuery} from "../Config/database.config.js";

const createProduct = async (req, res, next) => {
    let errors = [];

    !req.body.name && errors.push("Nome não informado");
    !req.body.stock && errors.push("Estoque não informada");
    !req.body.value && errors.push("Valorn não informado")

    if (req.body.name) {
        let productExists = await executeQuery(db, "SELECT name FROM products WHERE name = ? ", [req.body.name]);
        console.log(productExists);

        productExists.length > 0 && errors.push("Produto já cadastrado");
    }

    if (errors.length > 0) {
        res.status(401).json({errors: errors.join(", ")});
    } else {
        next();
    }
};

const updateProduct = async (req, res, next) => {
    let errors = [];

    !req.body.name && errors.push("Nome não informado");
    !req.body.stock && errors.push("Estoque não informada");
    !req.body.value && errors.push("Valorn não informado")

    let productExists = await executeQuery(db, "SELECT id FROM products WHERE id = ? ", [req.params.id]);

    productExists.length < 1 && errors.push("Produto não cadastrado");

    if (errors.length > 0) {
        res.status(401).json({errors: errors.join(", ")});
    } else {
        next();
    }
};


export default {createProduct, updateProduct};