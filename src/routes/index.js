const cartRouter = require('./cart');
const productRouter = require('./product');
const staffController = require('./staff');

function route(app) {
    app.use('/cart', cartRouter);
    app.use('/product', productRouter);
    app.use('/staff', staffController);
}

module.exports = route;
