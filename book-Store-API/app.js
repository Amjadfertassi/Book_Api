const express = require("express");
const app = express();
const booksPath = require("./routes/books"); 
const authorsPath = require("./routes/authors"); 


//apply middlewares : => like comipler to make Express js Understand JSON :  
app.use(express.json());

app.use("/api/books" , booksPath);
app.use("/api/authors" , authorsPath);


//Running the server 
const PORT = 5000;
app.listen(PORT , () => console.log(`Server is Running on Port : ${PORT}`) );

