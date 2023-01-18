const Job = require('../models/Job');

const getAllJobs = async (req, res) => {
    const { userID } = req.user;

    try {
        const user = await Job.find({createdBy: userID}).sort('createdAt');
        if(user.length === 0){
            return res.status(200).send('No job was created!');
        }
        res.status(200).json(user);
        
    } catch (error) {
        res.json(error);
    }
}

const getSingleJobs = async (req, res) => {
    const { userID } = req.user;
    const { id } = req.params;

    try {
        const user = await Job.findOne({_id: id, createdBy: userID});
        if(!user){
            return res.status(404).send(`No job with id: ${id}`);
        }
        res.status(200).json(user);
    } catch (error) {
        res.json(error);
    }
    

}

const createJobs = async (req, res) => {
    const { userID } = req.user;
    req.body.createdBy = userID;

    try {
        const user = await Job.create(req.body);
        res.status(200).json(user);
        
    } catch (error) {
        res.json(error);
    }
}

const updateJobs = async (req, res) => {
    const { company, position } = req.body;
    const { id } = req.params;
    const { userID } = req.user;

    if(company === "" || position === ""){
        return res.status(400).send('Please provide company and position.');
    }

    try {
        const job = await Job.findByIdAndUpdate({_id: id, createdBy: userID}, req.body, {new: true, runValidators: true});
        if(!job){
            return res.status(404).send(`No job with id: ${id}`);
        }
        res.status(200).json(job);
    } catch (error) {
        res.json(error);
    }
}

const deleteJobs = async (req, res) => {
    const { id } = req.params;
    const { userID } = req.user;

    try {
        const job = await Job.findByIdAndRemove({_id: id, createdBy: userID});
        if(!job){
            return res.status(404).send(`No job with id: ${id}`);
        }
        res.status(200).send(`Job deleted with id: ${id}`);

    } catch (error) {
        res.json(error);
    }
}

module.exports = {getAllJobs, getSingleJobs, createJobs, updateJobs, deleteJobs};