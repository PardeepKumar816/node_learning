const Product = require("../models/product");
const Cart = require("../models/cart");





exports.getProducts = (req, res, next) => {
    Product.fetchAll().
        then(([rows, fieldData]) => {
            res.render('shop/product-list', {
                prods: rows,
                pageTitle: 'All Products',
                path: '/products',
                // hasProducts: products.length > 0,
                // activeShop: true,
                // productCSS: true
            });
        }).catch(err => {
            console.log(err);
        });
}




exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId).then(([rows, fieldData]) => {
        console.log(rows);
        if (rows[0]) {
            res.render('shop/product-detail', {
                product: rows[0],
                pageTitle: rows[0].title,
                path: '/products'
            });
        }
    }).
        catch(err => { console.log(err); });



}

exports.getIndex = (req, res, next) => {
    Product.fetchAll().
        then(([rows, fieldData]) => {
            console.log(rows);
            res.render('shop/index', {
                prods: rows,
                pageTitle: 'Shop',
                path: '/',
            });
        }).
        catch(err => { console.log(err); });


}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    });
    // console.log(prodId);
    res.redirect('/cart');
}


exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(p => p.id === product.id);
                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty })
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts
            });
        });
    });

}

exports.postDeleteCartProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
}

exports.getOrder = (req, res, next) => {
    res.render('shop/order', {
        path: '/order',
        pageTitle: "Order"
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
}


