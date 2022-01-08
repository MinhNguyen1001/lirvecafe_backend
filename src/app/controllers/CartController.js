const db = require('../models/firebaseAdmin')

class CartController{
    //POST
    async createCart(req, res) {
        try {
            await db.collection('carts').doc(cartId)
                    .create({
                        cartId: cartId
                    });
            return res.status(200).json();
        } catch(error) {
            console.log('error');
            return res.status(500).json();
        }  
    }
    //GET
    async getCart(req, res) {
        try {
            const cartId = req.params.id;
            const query = db.collection('carts').doc(cartId).collection('productList');
            const querySnapshot = await query.get();
            const docs = querySnapshot.docs;

            const items = docs.map((doc) => {
                return {
                    productId: doc.data().productId,
                    state: doc.data().state
                }
            });

            return res.status(200).json(items);
        } catch(error) {
            res.status(500).json();
        }
    }
    //DELETE    
    async deleteToCart(req, res) {
        try {
            const productId = req.body.productId;
            const cartId = req.body.cartId;
            await db.collection('carts').doc(cartId).collection('productList').doc(productId).delete({});
            return res.status(200).json();
        } catch(error) {
            return res.status(500).json();
        }
    }
    //DELETE
    async deleteCart(req, res) {
        try {
            const cartId = req.params.id;
            await db.collection('carts').doc(cartId).delete();
            return res.status(200).json();
        } catch(error) {
            return res.status(500).json();
        }
    }
    //PUT
    async updateState(req, res) {
        try {
            const state = req.body.state;
            const productId = req.body.productId;
            const cartId = req.body.cartId;
            await db.collection('carts').doc(cartId)
                    .collection('productList').doc(productId)
                    .update({
                        state: state
                    });
            return res.status(200).json();
        } catch(error) {
            return res.status(500).json();
        }
    }
    //POST
    async addToCart(req, res) {
        try {
            const productId = req.body.productId;
            const cartId = req.body.cartId;

            const query = db.collection('carts').doc(cartId).collection('productList');
            const querySnapshot = await query.get();
            const docs = querySnapshot.docs;

            function isExisted(element) {
                return element.data().productId != productId
            }
            let exist = docs.every(isExisted);

            if (exist == true) {
                await db.collection('carts').doc(cartId)
                        .collection('productList').doc(productId)
                        .create({
                            productId: productId,
                            state: 1
                        });
            }
            return res.status(200).json();
        } catch(error) {
            return res.status(500).json();
        }
    }
}

module.exports = new CartController();
