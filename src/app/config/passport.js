const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models/config');
const bcrypt = require('bcrypt')

const customFields  = {
    usernameField: 'phone',
    passwordField: 'password',
    passReqToCallback: true,
}

passport.use(new LocalStrategy(customFields, authorize))
passport.serializeUser((user, done) => {
    console.log(user.id);
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    db.collection('customers').doc(`${id}`).get()
    .then(user => done(null, user.data()))
}); 


async function authorize(req, username, password, done) {
    var query
    if (req.body.role == 'admin') {
        query = db.collection('admin')
    }
    if (req.body.role == 'customer') {
        query = db.collection('customers')
    }
    if (req.body.role == 'staff') {
        query = db.collection('staff')
    }
    query.where('phone', '==', `${username}`).get()
    .then(user => {
        if(user.empty) {
            return done(null, false, {message: 'No user found'});
        }
        const hashedPassword = user.docs[0].data().password;
        if(!bcrypt.compareSync(password, hashedPassword)) {
            return done(null, false, {message: 'Wrong Password'});
        }
        return done(null, user.docs[0]);
    })
    .catch(err => {
        return done(err);
    })
}
