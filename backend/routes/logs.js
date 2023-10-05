const express = require('express');
const {createLog, getLog, getLogs, deleteLog, updateLog} = require('../controllers/logController');

const router = express.Router();


//Get all logs
router.get('/', getLogs);
//Get a single log
router.get('/:id', getLog);
//Post a new log
router.post('/', createLog);
//Delete a log
router.delete('/:id', deleteLog);
//Update a log patch does partial update
router.patch('/:id', updateLog);

module.exports = router;