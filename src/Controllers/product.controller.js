import Model from "../Models/product.model.js";

const createProduct = (req, res) => {
    const dados = {
        name: req.body.name,
        stock: req.body.stock,
        value: req.body.value,
    }

    Model.createProduct(dados, (err, result) => {
        if (err) {
            return res.status(500).send({errors: err});
        } else {
            return res.status(201).send({message: "Produto cadastrado com sucesso", product_id: result.insertId})
        }
    })
};

const readProduct = (req, res) => {
    Model.readProduct(req.params.productId, (err, result) => {
        if (err) {
            return res.status(500).send({errors: err});
        } else {
            return res.status(200).send(result[0])
        }
    })
};

const updateProduct = (req, res) => {
    const dados = {
        name: req.body.name,
        stock: req.body.stock,
        value: req.body.value,
    }

    Model.updateProduct(req.params.id, dados, (err, result) => {
        if (err) {
            return res.status(500).send({errors: err});
        } else {
            return res.status(200).send({message: "Produto editado com sucesso"});
        }
    })
};

const deleteProduct = (req, res) => {
    Model.deleteProduct(req.params.id, (err, result) => {
        if (err) {
            return res.status(500).send({errors: err});
        } else {
            return res.status(200).send({message: "Produto deletado com sucesso"});
        }
    })
};

const listProducts = (req, res) => {
    Model.listProducts((err, result) => {
        if (err) {
            return res.status(500).send({errors: err});
        } else {
            const response = [];
            for (let i = 0; i < result.length; i++) {
                response.push({
                    id: result[i].id,
                    name: result[i].name,
                    stock: result[i].stock,
                    value: result[i].value
                });
            }

            return res.status(200).send(response);
        }
    })
};

export default {createProduct, readProduct, updateProduct, deleteProduct, listProducts};