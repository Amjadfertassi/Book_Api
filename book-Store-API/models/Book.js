const mongoose = require("mongoose");
const Joi = require('joi');

//Book Schema :
const BookSchema = new mongoose.Schema({
    title : {
        type : String ,
        required : true ,
        trim : true ,
        minlength : 3,
        maxlength : 200
    },
    author : {
        type : mongoose.Schema.Types.ObjectId ,
        required : true ,
        // ref from Authore model
        ref : "Authore"
    },
    price : {
        type : Number ,
        required : true ,
        min : 0
    },
    pages : {
        type : Number ,
        required : true ,
        min : 0
    },
    
},
{
    timestamps: true
});


//Book Model :
const Book = mongoose.model("Book" , BookSchema);


/** 
 * @description => verification Using joi 
 * @access public 
*/

function validatecreatedbook(obj){
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(30).required(),
        author: Joi.string().trim().required(),
        price: Joi.number().min(0).required(),
        pages: Joi.number().min(0).required(),
    }
);
    return schema.validate(obj);
}


function validateUpdatebook(obj){
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(30),
        author: Joi.string().trim().min(3).max(30),
        price: Joi.number().min(0),
        pages: Joi.number().min(0),
    }
);
    return schema.validate(obj);
}


module.exports = {
    Book ,
    validateUpdatebook ,
    validatecreatedbook
}