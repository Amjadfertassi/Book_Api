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
 * @description => get Author by ID 
 * @public YES
 * @method GET
 * @router => /api/author/:id
 * 
*/

routeur.post("/:id" , (req,res)=> {
    const { error } = validateAuthors(req.body);

    //validate with joi library
});




module.exports = routeur;