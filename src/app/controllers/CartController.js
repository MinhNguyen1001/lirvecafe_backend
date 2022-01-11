const db = require('../models/firebaseAdmin');
const carts = db.collection('carts');

class CartsController {

    async getCart(req, res) {
        const id = req.session.passport.user;
        await carts.doc(id).get()
        .then(cart => {
            if(!cart.exists) {
                res.send('chưa có gì trong giỏ hàng')
            }
            res.send(cart.data());
        })
        .catch(err => {
            console.error('err', err);
            res.status(400).json({ error: err.message });
        })
    }

    async deleteFromCart(req, res) {
        const id = req.session.passport.user;
        const cart = carts.doc(id);
        await cart.collection('productList').doc(req.body.id).get()
        .then(product => {
            product.ref.delete().then(() => {return cart.get()});
        })
        .then(doc => {
            res.send(doc.data())
        })
        .catch(err => {
            console.error('err', err);
            res.status(400).json({ error: err.message });
        })
    }

    async addToCart(req, res) {
        const id = req.session.passport.user;
        let doc = carts.doc(id).collection('productList').doc(req.body.id);
        await carts.doc(id).get()
        .then(cart => {
            if(!cart.exists) {
                console.log('1')
                carts.doc(id).set({
                    number: 1,
                })
            }
            return doc.get()
        })
        .then(product => {
            if(!product.exists)
                return product.ref.set({
                    number: 1,
                })
            else return product.ref.update({
                number: product.data().number += 1,
            })
        })    
        .then(() => {
            return doc.get()
        })
        .then(doc => {
            res.send(doc.data())
        })
        .catch(err => {
            console.error('err', err);
            res.status(400).json({ error: err.message });
        })
    }

    async removeFromCart(req, res) {
        const id = req.session.passport.user;
        const cart = carts.doc(id);
        await cart.collection('productList').doc(req.body.id).get()
        .then(product => {
            if(product.data().number == 1)
                product.ref.delete();
            else product.ref.update({
                number: this.number -= 1,
            }).then(() => {
                return cart.get()
            })     
        })
        .then(doc => {
            res.send(doc.data())
        })
        .catch(err => {
            console.error('err', err);
            res.status(400).json({ error: err.message });
        })
    }
}

module.exports = new CartsController;
