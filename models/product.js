
const Cart = require('./cart');
const db = require('../utils/database');





module.exports = class Product {

    constructor(id, title, imageUrl, description, price) {
        this.id = id
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        return db.execute("INSERT INTO node_complete.products (title, price, imageUrl, description) VALUES (?,?,?,?)",
            [this.title, this.price, this.imageUrl, this.description]
        );
    }




    static fetchAll() {
        return db.execute("SELECT * FROM node_complete.products");

    }

    static findById(id) {
        return db.execute("SELECT * FROM node_complete.products WHERE id = ? ", [id]);
    }

    static deleteById(id) {

    }
}