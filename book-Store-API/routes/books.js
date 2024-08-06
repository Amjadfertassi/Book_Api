const express = require("express");
const routeur = express.Router();
const Joi = require('joi');


const books = [
    {
        id: 1,
        title: "Black and White",
        author: "John Doe",
        price: 19.99,
        pages: 320
    },
    {
        id: 2,
        title: "The Great Adventure",
        author: "Jane Smith",
        price: 15.99,
        pages: 275
    },
    {
        id: 3,
        title: "Mystery of the Lost Island",
        author: "Emily Johnson",
        price: 12.99,
        pages: 300
    },
    {
        id: 4,
        title: "Journey to the Unknown",
        author: "Michael Brown",
        price: 18.99,
        pages: 350
    },
    {
        id: 5,
        title: "Legends of the Ancient World",
        author: "Christopher Davis",
        price: 22.99,
        pages: 400
    },
    {
        id: 6,
        title: "The Final Frontier",
        author: "Sarah Wilson",
        price: 25.99,
        pages: 450
    }
];

/** 
 * @description => Get All Books 
 * @Route /api/books
 * @method GET
 * @access public 
*/


routeur.get("/" , (req,res) => {
    //Senf a JSON File to USER : 
    res.status(200).json(books);
});

/** 
 * @description => Get Book by id 
 * @Route /api/books/:id
 * @method GET
 * @access public 
*/

routeur.get("/:id" , (req,res) => {
    //Senf a JSON File to USER : 
    const book = books.find( b => b.id === parseInt(req.params.id));
    if (book){
        res.status(200).json(book);
    }
    else{
        res.status(404).json({ message : "book not found"})
    }
});

/** 
 * @description => put a new Book 
 * @Route /api/books
 * @method PUT
 * @access public 
*/

routeur.post("/" , (req,res) => {
    
    const { error } = validatecreatedbook(req.body);

    //validation with joi library :
    if (error){
        return res.status(400).json({ message : error.details[0].message }); 
    }

    const book = {
        id: books.length + 1 ,
        title: req.body.title ,
        author: req.body.author ,
        price: req.body.price ,
        pages: req.body.pages 
    };

    books.push(book);
    res.status(201).json(book);
    //201 => created Successfully
});

/** 
 * @description => Update a Book 
 * @Route /api/books/:id
 * @method PUT
 * @access public 
*/

routeur.put("/:id" , (req,res) => {
    const { error } = validateUpdatebook(req.body) ;

    if (error){
        return res.status(400).json({ message : error.details[0].message }); 
    }

    const book = books.find(b=> b.id === parseInt(req.params.id));
    if (book) {
        res.status(200).json({message : "book has been updated "}); 
    } else {
        res.status(404).json({ message:"book not found"});
    }

});

/** 
 * @description => DELETE a Book 
 * @Route /api/books/:id
 * @method DELETE
 * @access public 
*/

routeur.delete("/:id" , (req,res) => {
    const book = books.find(b=> b.id === parseInt(req.params.id));
    if (book) {
        res.status(200).json({message : "book has been deleted "}); 
    } else {
        res.status(404).json({ message:"book not found"});
    }
});





/** 
 * @description => verification Using joi 
 * @access public 
*/

function validatecreatedbook(obj){
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(30).required(),
        author: Joi.string().trim().min(3).max(30).required(),
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



module.exports = routeur;
