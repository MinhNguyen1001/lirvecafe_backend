const cartRouter = require('./cart');
const productRouter = require('./product');
const staffController = require('./staff');
const reportController = require('./report');
const eventController = require('./event');

function route(app) {
    // app.use('/cart', cartRouter);
    app.use('/product', productRouter);
    app.use('/staff', staffController);
    app.use('/report', reportController);
    app.use('/event', eventController);
}

module.exports = route;
