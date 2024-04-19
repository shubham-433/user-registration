const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 5,
        max: 255
    },
    mobileNumber: {
        type: String,
        required: true,
        min: 10,
        max: 15
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
    dob: {
        type: Date,
        required: true
    },
    about: {
        type: String,
        min: 0,
        max: 500
    }
});

function validateUser(user) {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(20).required(),
        lastName: Joi.string().min(2).max(20).required(),
        email: Joi.string().min(5).max(255).required().email(),
        mobileNumber: Joi.string().min(10).max(15).required(),
        gender: Joi.string().valid('male', 'female', 'other').required(),
        dob: Joi.date().required(),
        about: Joi.string().max(500)
    });
    return schema.validate(user);
}

const User = mongoose.model('User', userSchema);
module.exports.validate = validateUser;
module.exports.User = User;
