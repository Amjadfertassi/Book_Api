const express = require("express");
const routeur = express.Router();
const {  validatecreatedbook , validateUpdatebook , Book } = require('../models/Book')
const asyncHandler = require('express-async-handler');


/** 
 * @description => Get All Books 
 * @Route /api/books
 * @method GET
 * @access public 
*/


routeur.get("/" , asyncHandler( async (req,res) => {
    const books = await Book.find();
    //Senf a JSON File to USER : 
    res.status(200).json(books);
}));

/** 
 * @description => Get Book by id 
 * @Route /api/books/:id
 * @method GET
 * @access public 
*/

routeur.get("/:id" , asyncHandler( async (req,res) => {
    //Senf a JSON File to USER : 
    const book = await Book.findById(req.params.id);
    if (book){
        res.status(200).json(book);
    }
    else{
        res.status(404).json({ message : "book not found"})
    }
}));

/** 
 * @description => put a new Book 
 * @Route /api/books
 * @method PUT
 * @access public 
*/

routeur.post("/" , asyncHandler( async (req,res) => {
    
    const {error} = validatecreatedbook(req.body);

    //validation with joi library :
    if (error){
        return res.status(400).json({ message : error.details[0].message }); 
    }

    const book = new Book({
        title: req.body.title ,
        author: req.body.author ,
        price: req.body.price ,
        pages: req.body.pages
    })

    const result = await book.save();
    res.status(201).json(result);
    //201 => created Successfully
}));

/** 
 * @description => Update a Book 
 * @Route /api/books/:id
 * @method PUT
 * @access public 
*/

routeur.put("/:id" , asyncHandler ( async (req,res) => {
    const { error } = validateUpdatebook(req.body) ;

    if (error){
        return res.status(400).json({ message : error.details[0].message }); 
    }

    const updatedBook = await Book.findByIdAndUpdate(res.params.id , {
        $set: {
            title: req.body.title ,
            author: req.body.author ,
            price: req.body.price ,
            pages: req.body.pages
        }
    } , {
        new: true 
    });

    res.status(200).json(updatedBook);


}));

/** 
 * @description => DELETE a Book 
 * @Route /api/books/:id
 * @method DELETE
 * @access public 
*/

routeur.delete("/:id" , asyncHandler( async (req,res) => {
    const book = await Book.findById(res.params.id);
    if (book) {
        await Book.findByIdAndDelete(res.params.id);
        res.status(200).json({message : "book has been deleted "}); 
    } else {
        res.status(404).json({ message:"book not found"});
    }
}));



module.exports = routeur;
