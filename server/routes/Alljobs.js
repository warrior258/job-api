const express = require('express');
const router = express.Router();
const Job = require('../models/Job')

router.get('/', async (req, res) => {

    try {
        const alljobs = await Job.find({}).sort('createdAt');
        res.status(200).json(alljobs);        
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;