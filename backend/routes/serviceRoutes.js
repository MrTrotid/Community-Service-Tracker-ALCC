const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { 
    addServiceHours,
    getServiceHours,
    updateServiceHours,
    deleteServiceHours
} = require('../controllers/serviceController');

router.post('/', auth, addServiceHours);
router.get('/:userId', auth, getServiceHours);
router.put('/:serviceId', auth, updateServiceHours);
router.delete('/:serviceId', auth, deleteServiceHours);

module.exports = router;
