const express = require("express");
const routeur = express.Router();
const Joi = require('joi');

/**
 * @description => authors Array :
 * @public YES
 * 
*/


const authors = [
    {
        id: 1,
        firstName: "Amjad",
        lastName: "Fertassi",
        Age: 22
    },
    {
        id: 2,
        firstName: "John",
        lastName: "Doe",
        Age: 30
    },
    {
        id: 3,
        firstName: "Jane",
        lastName: "Smith",
        Age: 25
    },
    {
        id: 4,
        firstName: "Alice",
        lastName: "Johnson",
        Age: 28
    },
    {
        id: 5,
        firstName: "Robert",
        lastName: "Brown",
        Age: 35
    }
];


/**
 * @description => get All Authors
 * @public YES
 * @method GET
 * @router => /api/author
 * 
*/

routeur.get("/" , (req,res)=> {
    res.status(200).json(authors);
});


/**
 * @description => get Author by ID 
 * @public YES
 * @method GET
 * @router => /api/author/:id
 * 
*/

routeur.get("/:id" , (req,res)=> {
    const author = authors.find( b => b.id === parseInt(req.params.id));

    if(author){
        res.status(200).json(author);
    } else {
        res.status(404).json({ message : "Author is not found"});
    }
});


/**
 * @description => Add a New Author
 * @public YES
 * @method POST
 * @router => /api/author/:id
 * 
*/

routeur.post("/" , (req,res)=> {
    const { error } = validateExistingAuthors (req.body);
    //validate with joi library
    if(error) {
        return res.status(404).json({ message : error.details[0].message });
    } ;

    const author = {
        id : authors.length + 1,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        Age : req.body.Age ,
    }

    authors.push(author);
    res.status(201).json(author);

});


/**
 * @description => Update an Author
 * @public YES
 * @method PUT
 * @router => /api/author/:id
 * 
*/


routeur.put("/:id" , (req,res)=> {
    const { error } = validateUpdatedAuthors(req.body);
    //validate with joi library
    if(error) {
        return res.status(404).json({ message : error.details[0].message });
    } ;

    const author = authors.find(b => b.id === parseInt(req.params.id));
    if(author){
        res.status(200).json({ message : "Author has been Updated"});
    } else {
        res.status(404).json({ message : "Author Not found"})
    }
});

/**
 * @description => Delete an Author
 * @public YES
 * @method DELETE
 * @router => /api/author/:id
*/

routeur.delete("/:id" , (req,res)=> {
    const author = authors.find(b => b.id === parseInt(req.params.id));
    if(author){
        res.status(200).json({message : "The Author has been Deleted" });
    } else {
        res.status(404).json({ message : "Author Not Found"});
    }
});

/**
 * @description => Validation with Joi
 * @public YES
*/

function validateExistingAuthors(obj){
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(30).required(),
        lastName: Joi.string().trim().min(3).max(30).required(),
        Age: Joi.number().min(0).required(),
    }
);
    return schema.validate(obj);
}

function validateUpdatedAuthors(obj){
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(30),
        lastName: Joi.string().trim().min(3).max(30),
        Age: Joi.number().min(0),
    }
);
    return schema.validate(obj);
}







module.exports = routeur;