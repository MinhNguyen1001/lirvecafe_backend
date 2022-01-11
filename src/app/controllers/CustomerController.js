const db = require('../models/firebaseAdmin');
const customers = db.collection('customers');
const hash = require('../config/hash');


class CustomersController {

    async createCustomer(req, res) {
        let phone = req.body.phone;
        await customers.where('phone', '==', `${phone}`).get()
        .then(user => {
            if(user.empty) {
                const password = hash.hash(req.body.password);
                customers.add({
                    phone: phone,
                    password: password,
                    name: req.body.name,
                    mail: req.body.mail,
                    address: req.body.address,
                    point: 0,
                })
                res.redirect('/users/login')
            }
            else res.send('user already exists');
        })
        .catch(err => {
            console.error(err);
        })
    }

    async updateCustomer(req, res) {
        if (req.body.password != "") {
            const password = hash.hash(req.body.password);
        }  
        await customers.doc(req.user.id).get()
        .then(doc => {
            if(!doc.exists) {
                res.send('damn door');
            }
            else{
                doc.update({
                    name: req.body.name || this.name,
                    phone: req.body.phone || this.phone,
                    address: req.body.address || this.address,
                    password: password || this.password,
                })
                res.redirect('users/info')
            }
        })
        .catch(err => {
            console.error('err', err);
            res.status(400).json({ error: err.message });
        })
    }

    async getUserInfo(req, res, next) {
        await customers.doc(req.user.id).get()
        .then(doc => {
            if(!doc.exists) {
                res.send('damn door');
            }
            res.send(doc.data());
        })
        .catch(err => {
            console.error('err', err);
            res.status(400).json({ error: err.message });
        })
    }
    
}

module.exports = new CustomersController;
