const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Comapny name must be provided!'],
        maxlength: 50,
    },
    position: {
        type: String,
        required: [true, 'Position must be provided!'],
        maxlength: 50,
    },
    status: {
        type: String,
        enum: ['interview', 'pending', 'declined'],
        default: 'pending',        
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provude user!'],
    }
}, {timestamps: true});

module.exports = mongoose.model('Job', JobSchema);