const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Authore , validateExistingAuthors , validateExistingAuthors } = require('../models/Authore'); // Use correct casing
const asyncHandler = require('express-async-handler');


// Connection to database
/**
 * @description If the Database "bookStoreDB" already exists, the data will go to it; if not, it will be created automatically.
 */
mongoose.connect('mongodb://localhost/bookStoreDB')
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('The connection failed', error));

// Sample authors array (for testing purposes)
const authors = [
    { id: 1, firstName: "Amjad", lastName: "Fertassi", age: 22 },
    { id: 2, firstName: "John", lastName: "Doe", age: 30 },
    { id: 3, firstName: "Jane", lastName: "Smith", age: 25 },
    { id: 4, firstName: "Alice", lastName: "Johnson", age: 28 },
    { id: 5, firstName: "Robert", lastName: "Brown", age: 35 }
];

/**
 * @description => get All Authors
 * @public YES
 * @method GET
 * @router => /api/author
 */

router.get("/", async (req, res) => {
    // .sort({firstName:1}) ==> make sort by A-Z to the firstName = .sort({firstName:-1}) ==> make sort by Z-A to the firstName 
    // .select("firstName lastName") ===> seect just the Fn and Ln 
    // const authorList = await Authore.find().sort({firstName:1}).select("firstName lastName");
    try {
        const authorList = await Authore.find();
        res.status(200).json(authorList);
    }
    catch (error){
        console.log(error);
        res.status(500).json({message : "Something Went Wrong !!"}); 
    }
});

/**
 * @description => get Author by ID
 * @public YES
 * @method GET
 * @router => /api/author/:id
 */
router.get("/:id", async (req, res) => {
    // const author = authors.find(b => b.id === parseInt(req.params.id));
    try {
        const author = await Authore.findById(req.params.id); 
        if (author) {
            res.status(200).json(author);
        } else {
            res.status(404).json({ message: "Author not found"});
        }
    } catch(error) {
        res.status(500).json({ message: "Something Went Wrong!!"});
    }
});

/**
 * @description => Add a New Author
 * @public YES
 * @method POST
 * @router => /api/author
 */
router.post("/", async (req, res) => {
    const { error } = validateExistingAuthors(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const author = new Authore({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age
        });

        // Save in database
        const result = await author.save();
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

/**
 * @description => Update an Author
 * @public YES
 * @method PUT
 * @router => /api/author/:id
 */
router.put("/:id", async (req, res) => {
    const { error } = validateUpdatedAuthors(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const author = await Authore.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }
        res.status(200).json(author);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

/**
 * @description => Delete an Author
 * @public YES
 * @method DELETE
 * @router => /api/author/:id
 */
router.delete("/:id", async (req, res) => {
    try {
        const author = await Authore.findById(req.params.id);
        if (author) {
            await Authore.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "The Author has been deleted" });
        } else {
            return res.status(404).json({ message: "Author not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;
