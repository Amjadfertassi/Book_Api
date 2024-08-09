const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Authore , validateExistingAuthors , validateUpdatedAuthors } = require('../models/Authore'); // Use correct casing
const asyncHandler = require('express-async-handler');


// Connection to database
/**
 * @description If the Database "bookStoreDB" already exists, the data will go to it; if not, it will be created automatically.
 */
mongoose.connect('mongodb://localhost/bookStoreDB')
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('The connection failed', error));

// Sample authors array (for testing purposes)

/**
 * @description => get All Authors
 * @public YES
 * @method GET
 * @router => /api/author
 */

router.get("/", asyncHandler (
     async (req, res) => {
    // .sort({firstName:1}) ==> make sort by A-Z to the firstName = .sort({firstName:-1}) ==> make sort by Z-A to the firstName 
    // .select("firstName lastName") ===> seect just the Fn and Ln 
    // const authorList = await Authore.find().sort({firstName:1}).select("firstName lastName");
    const authorList = await Authore.find();
    res.status(200).json(authorList);   
}));

/**
 * @description => get Author by ID
 * @public YES
 * @method GET
 * @router => /api/author/:id
 */
router.get("/:id", asyncHandler ( async (req, res) => {
    // const author = authors.find(b => b.id === parseInt(req.params.id));
        const author = await Authore.findById(req.params.id); 
        if (author) {
            res.status(200).json(author);
        } else {
            res.status(404).json({ message: "Author not found"});
        }
}));

/**
 * @description => Add a New Author
 * @public YES
 * @method POST
 * @router => /api/author
 */
router.post("/", asyncHandler( async (req, res) => {
    const { error } = validateExistingAuthors(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
        const author = new Authore({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age
        });
        // Save in database
        const result = await author.save();
        res.status(201).json(result);
}));

/**
 * @description => Update an Author
 * @public YES
 * @method PUT
 * @router => /api/author/:id
 */
router.put("/:id",  asyncHandler( async (req, res) => {
    const { error } = validateUpdatedAuthors(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
        const author = await Authore.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }
        res.status(200).json(author);    
}));

/**
 * @description => Delete an Author
 * @public YES
 * @method DELETE
 * @router => /api/author/:id
 */
router.delete("/:id", asyncHandler( async (req, res) => {
        const author = await Authore.findById(req.params.id);
        if (author) {
            await Authore.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "The Author has been deleted" });
        } else {
            return res.status(404).json({ message: "Author not found" });
        }
}));

module.exports = router;
