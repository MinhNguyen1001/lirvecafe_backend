const db = require('../models/firebaseAdmin');
const bcrypt = require('bcrypt');
const passport = require('passport');


module.exports.getLogin = async function getData(req, res, next) {
    await db.collection('products').doc(`${req.params.id}`).get()
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

module.exports.postLogin = async function  postLogin(req, res, next) {

}

module.exports.getRegister

module.exports.postRegister = async (req, res) => {
        const hashedPassword = bcrypt.hashPassword(req.body.password, 10);
        await db.collection('customers').doc(`${hashedPassword}`).get()
        .then(doc => {
            if(!doc.exists) {
                doc.set({
                    address = req.body.address,
                    name = req.body.name,
                    password = req.body.password,
                    phone = req.body.phone,
                    points = req.body.points,
                });
                res.redirect('/users')
            }
            res.redirect('/register');
        })
        .catch(err => {
            console.error('err', err);
            res.status(400).json({ error: err.message });
        })
}