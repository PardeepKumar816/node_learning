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
            if (!err) {

            }
        });
    }
}