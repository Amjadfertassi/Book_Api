const mongoose = require('mongoose'); // corrected mongoose spelling
const Joi = require('joi');


const AuthorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 200
    },
    lastName: { // Assuming the second firstName was intended to be lastName
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 200
    },
    age: { // Assuming the third firstName was intended to be age
        type: Number,
        minlength: 3,
        required: true
    }
}, {
    timestamps: true
});

const Authore = mongoose.model('Authore', AuthorSchema);


/**
 * @description => Validation with Joi
 * @public YES
 */
function validateExistingAuthors(obj) {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(30).required(),
        lastName: Joi.string().trim().min(3).max(30).required(),
        age: Joi.number().min(0).required()
    });
    return schema.validate(obj);
}

function validateUpdatedAuthors(obj) {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(30),
        lastName: Joi.string().trim().min(3).max(30),
        age: Joi.number().min(0)
    });
    return schema.validate(obj);
}



module.exports = {
    Authore,
    validateUpdatedAuthors,
    validateExistingAuthors
};
