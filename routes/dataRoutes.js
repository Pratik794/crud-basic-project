const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/', dataController.getAllData);
router.post('/', dataController.saveData);
// Implement other CRUD routes here

module.exports = router;
