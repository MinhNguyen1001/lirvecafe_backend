const db = require('../models/firebaseAdmin');

class StaffController {
    // POST
    async createStaff(req, res) {
        try {
            const staff = req.body;
            // console.log(staff);
            const query = db.collection('staff');
            const querySnapshot = await query.get();
            const docs = querySnapshot.docs;

            function isExisted(element) {
                return element.data().productId == parseInt(product.productId)
            }
            let exist = docs.every(isExisted);

            if (exist == true) {
                await db.collection('staff')
                    .doc(staff.id)
                    .create({
                        staffId: staff.id,
                        name: staff.name,
                        address: staff.address,
                        phone: staff.phone,
                        TimeStart: staff.TimeStart,
                        TimeEnd: staff.TimeEnd
                    });
            return res.status(200).json();
            }               
        } catch (error) {
            console.log('Error!');
            return res.status(500).json(error);
        }
    }
    // GET
    async showAll(req, res) {
        try {
            const query = db.collection('staff');
            const querySnapshot = await query.get();
            const docs = querySnapshot.docs;
            var items = docs.map(function(staff) {
                return {
                    staffId: staff.data().id,
                    name: staff.data().name,
                    address: staff.data().address,
                    phone: staff.data().phone,
                    TimeStart: staff.data().TimeStart,
                    TimeEnd: staff.data().TimeEnd
                }
            })
            console.log(items);
            res.status(200).json(items);
            return items;
        } catch (error) {
            console.log('Error!');
            return res.status(500).json(error);
        }
    }
    // GET
    async showDetail(req, res) {
        try {
            const staffId = req.params.id;
            console.log(staffId);
            const query = db.collection('staff');
            const querySnapshot = await query.get();
            const docs = querySnapshot.docs;
            var staff = docs.find(function(doc) {
                return doc.data().staffId === staffId;
            })
            console.log(staff.data());
            return res.status(200).json(staff.data());
        } catch (error) {
            console.log('This id does not exist in database.');
            return res.status(500).json(error);
        }
    }
    // DELETE
    async deleteStaff(req, res) {
        try {
            const staffId = req.params.id;
            await db.collection('staff').doc(staffId).delete({});
            return res.status(200).json();
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    // PUT
    async updateStaff(req, res) {
        try {
            const staff = req.body;
            console.log(staff);
            await db.collection('staff')
                    .doc(staff.id)
                    .update({
                        staffId: staff.id,
                        name: staff.name,
                        address: staff.address,
                        phone: staff.phone,
                        TimeStart: staff.TimeStart,
                        TimeEnd: staff.TimeEnd
                    });
            return res.status(200).json();
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = new StaffController();
