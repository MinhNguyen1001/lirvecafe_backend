const db = require('../models/firebaseAdmin');

class EventController {
    // POST
    async orderEvent(req, res) {
        try {
            const event = req.body;

            await db.collection('events')
                    .add({
                        time: event.time,
                        customerId: event.customerId,
                        phone: event.phone,
                        name: event.name,
                        description: event.description
                    });
            
            return res.status(200);
        } catch(error) {
            return res.status(500).send(error);
        }
    }
    // GET
    async checkId(req, res) {
        try {
            const customerId = req.params.customerId;

            const query = db.collection('customers');
            const querySnapshot = await query.get();
            const docs = querySnapshot.docs;

            const result = docs.find(doc => {
                return doc.id === customerId
            });
            
            if (result === undefined) return res.status(200).send('False');
            return res.status(200).send('True');
        } catch(error) {
            return res.status(500).send(error);
        }
    }
    // PUT
    async pointAccumulate(req, res) {
        try {

        } catch(error) {
            
        }
    }
}

module.exports = new EventController();
