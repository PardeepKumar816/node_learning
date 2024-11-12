const Product = require("../models/product");
const Cart = require("../models/cart");





exports.getProducts = (req, res, next) => {

    Product.findAll().
        then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products',

            });
        }).
        catch(err => { console.log(err); });


}




exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findAll({ where: { id: prodId } })
        .then((products) => {

            if (products[0]) {
                res.render('shop/product-detail', {
                    product: products[0],
                    pageTitle: products[0].title,
                    path: '/products'
                });
            }
        }).
        catch(err => { console.log(err); });

    // Product.findByPk(prodId).then((product) => {

    //     if (product) {
    //         res.render('shop/product-detail', {
    //             product: product,
    //             pageTitle: product.title,
    //             path: '/products'
    //         });
    //     }
    // }).
    //     catch(err => { console.log(err); });



}

exports.getIndex = (req, res, next) => {
    Product.findAll().
        then(products => {
            res.render('shop/index', {
                prods: products,
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


