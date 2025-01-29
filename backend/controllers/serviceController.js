const admin = require('../firebaseAdmin');
const db = admin.firestore();

exports.addServiceHours = async (req, res) => {
    try {
        const { userId, hours, description, date, activity } = req.body;
        const serviceRef = db.collection('serviceHours');
        
        await serviceRef.add({
            userId,
            hours: Number(hours),
            description,
            date,
            activity,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        res.status(201).json({ message: 'Service hours added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getServiceHours = async (req, res) => {
    try {
        const { userId } = req.params;
        const serviceRef = db.collection('serviceHours');
        const snapshot = await serviceRef.where('userId', '==', userId).get();

        const serviceHours = [];
        let totalHours = 0;

        snapshot.forEach(doc => {
            const data = doc.data();
            totalHours += data.hours;
            serviceHours.push({
                id: doc.id,
                ...data
            });
        });

        res.json({
            serviceHours,
            totalHours,
            count: serviceHours.length
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateServiceHours = async (req, res) => {
    try {
        const { serviceId } = req.params;
        const updates = req.body;
        
        await db.collection('serviceHours').doc(serviceId).update(updates);
        
        res.json({ message: 'Service hours updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteServiceHours = async (req, res) => {
    try {
        const { serviceId } = req.params;
        
        await db.collection('serviceHours').doc(serviceId).delete();
        
        res.json({ message: 'Service hours deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
