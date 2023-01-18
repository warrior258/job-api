const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// require('dotenv').config();

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Username is required!'],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid Email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 3,
    }

});

UserSchema.pre('save', async function(next){
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        console.log(error)
    }
});

UserSchema.methods.createJWT = function() {
    return jwt.sign({userID: this._id, name: this.name}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});    
}

UserSchema.methods.comparePass = async function(password){
    const isMatched = await bcrypt.compare(password, this.password);
    return isMatched
}

module.exports = mongoose.model('User', UserSchema);