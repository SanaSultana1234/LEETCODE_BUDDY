const Log = require('../models/Log');
const mongoose = require('mongoose');
//Get all logs
const getLogs = async (req, res) => {
    const logs = await Log.find({}).sort({createdAt: -1});
    res.status(200).json(logs);
}

//Get a single log
const getLog = async(req, res)=> {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such log'});
    }
    const log = await Log.findById(id);
    if(!log) {
        return res.status(404).json({error: 'No such log'});
    }
    res.status(200).json(log);
}

//Post a new log
const createLog = async (req, res)=> {
    const {student, questions, date} = req.body;
    let emptyFields = []
    if(!student) {
        emptyFields.push('student');
    }
    if(emptyFields.length>0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
    try {
        const log = await Log.create({student, questions, date});
        res.status(200).json(log);
    }catch(error) {
        res.status(400).json({error: error.message});
    }
}
//Delete a log
const deleteLog = async (req, res)=> {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such log'});
    }
    const log = await Log.findByIdAndDelete({_id: id});
    if(!log) {
        return res.status(400).json({error: 'No such log'});
    }
    res.status(200).json(log);
}
//Update a log patch does partial update
const updateLog = async (req, res)=> {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such log'});
    }
    const log = await Log.findOneAndUpdate({_id: id},{
        ...req.body
    });
    if(!log) {
        return res.status(400).json({error: 'No such log'});
    }
    res.status(200).json(log);
}

module.exports = {
    createLog,
    getLog,
    getLogs,
    deleteLog,
    updateLog
};