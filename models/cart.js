const fs = require('fs');
const path = require('path')

const p = path.join(path.dirname(process.mainModule.filename),
    'data',
    'cart.json',
);

module.exports = class Cart {

    static addProduct(id, productPrice) {
        // Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            // Analyze the cart => find existing product
            const existingIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingIndex];
            let updatedProduct;
            // Add new product/ increase quantity
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            });
        });
    }


    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(p => p.id === id);
            if (!product) {
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(p => p.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                console.log(err);
            });

        });
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if (err) {
                cb(null);
            } else {
                cb(cart);
            }
        });
    }
}