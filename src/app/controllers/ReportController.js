const db = require('../models/firebaseAdmin');

class ReportController {
    // GET
    async getReport(req, res) {
        try {
            const query = db.collection('reports');
            const querySnapshot = await query.get();
            const docs = querySnapshot.docs;

            var report = docs[0];

            return res.status(200).send(report.data());
        } catch (error) {
            return res.status(500).send(error);
        }
    }
    // UPDATE
    async updateCost(req, res) {
        try {
            const report = req.body;

            const d = new Date();
            const time = d.getDate().toString() + '/' + d.getMonth().toString() + '/' + d.getFullYear().toString();

            await db.collection('reports')
                    .doc('/report/')
                    .update({
                        time: time,
                        profit: report.profit,
                        materialCost: report.materialCost,
                        maintenanceCost: report.maintenanceCost,
                        staffCost: report.staffCost,
                        revenue: report.revenue,
                        siteCost: report.siteCost
                    });
                    
            return res.status(200);
        } catch(error) {
            return res.status(500).send(error);
        }
    }
}

module.exports = new ReportController();
