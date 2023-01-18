const express = require('express');
const router = express.Router();

const {getAllJobs, getSingleJobs, createJobs, updateJobs, deleteJobs} = require('../controllers/jobs');

router.get('/', getAllJobs);
router.get('/:id', getSingleJobs);
router.post('/', createJobs);
router.patch('/:id', updateJobs);
router.delete('/:id', deleteJobs);

module.exports = router;
