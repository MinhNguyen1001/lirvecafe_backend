const db = require('../models/firebaseAdmin');

class ProductController{
    //GET
    async getProducts(req, res){
        try {
            const query = db.collection('products');
            const querySnapshot = await query.get();
            const docs = querySnapshot.docs;

            var items = docs.map(function(product) {
                return {
                    productId: product.id,
                    name: product.data().name,
                    price: product.data().price,
                    image: product.data().image,
                    description: product.data().description,
                    stock: product.data().stock,
                    type: product.data().type
                }
            });

            console.log(items);
            return res.status(200).send(items);
        } catch (error) {
            return res.status(500).send(error);
        }
    }
    // PUT
    async setProductStock(req, res){
        try {
            const stock = req.body.stock;
            const productId = req.body.productId;

            await db.collection('products')
                    .doc(productId)
                    .update({
                        stock: stock
                    });

            return res.status(200);
        } catch (error) {
            return res.status(500).send(error);
        }
    }
    // POST
    async addProduct(req, res){
        try {
            const product = req.body;

            await db.collection('products')
                    .add({
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        description: product.description,
                        stock: product.stock,
                        type: product.type
                    });

            return res.status(200);
        } catch(error){
            return res.status(500).send(error);
        }
    }
    // DELETE
    async deleteProduct(req, res){
        try {
            const productId = req.params.productId;
            console.log(typeof(productId));

            await db.collection('products').doc(productId).delete({});

            return res.status(200);
        } catch(error) {
            return res.status(500).send(error);
        }
    }
    // PUT
    async updateProductType(req, res){
        try {
            const type = req.body.type;
            const productId = req.body.id;

            await db.collection('products')
                    .doc(productId)
                    .update({
                        type: type
                    });

            return res.status(200);
        } catch (error) {
            return res.status(500).send(error);
        }
    }
    // GET
    async searchProduct(req, res){
        try {
            const name = req.params.name;
            console.log(name);

            const snapshot = await db.collection('products').where('name', '>=', name).get();
            //console.log(snapshot);

            const products = []
            snapshot.forEach(doc => {
                let tmp = {}
                tmp.productId = doc.id,
                tmp.name = doc.data().name,
                tmp.price = doc.data().price,
                tmp.image = doc.data().image,
                tmp.description = doc.data().description,
                tmp.stock = doc.data().stock,
                tmp.type = doc.data().type
                products.push(tmp);
            });

            //console.log(product);
            return res.status(200).send(products);
        } catch(error) {
            return res.status(500).send(error);
        }
    }
    // GET
    async checkQuantity(req, res){
        try {
            const id = req.params.productId;
            const stock = req.params.stock;

            const query = db.collection('products');
            const querySnapshot = await query.get();
            const docs = querySnapshot.docs;

            var product = docs.find(function(doc) {
                return doc.data().productId === id;
            })

            if (stock <= product.data().stock) {
                return res.status(200).send('True');
            } else {
                return res.status(200).send('False');
            }
        } catch(error) {
            return res.status(500).send(error);
        }
    }
}

module.exports = new ProductController();
