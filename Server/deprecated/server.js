const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const port = 3000;

const betterReadsController = require("./controller/betterReadsController");
const queryMiddleware = require('./controller/queryMiddleware.js.js.js')

/* 
* ===================================================================
*   Destructuring of middlewares inside 
        'queryMiddleware' controller & 'betterReadsController' controller
* ===================================================================
*/
const {addToBook_Table, getBook_Id, addToPost_Table, getPost_Id, addToHash_Table, addToRating_Table, addToPost_Hash_Join} = queryMiddleware;
const {threePost_Table, threeRatings_Table, threeBook_Table} = betterReadsController;

/* 
* ===================================================================
!  WHAT IS CORS (library)?
* ===================================================================
*/
app.use(cors());
app.use(express.json());

// send index.html file to base endpoint
// app.use(express.static(path.resolve(__dirname, '../dist')));

/* POST Request on 'localhost:3000/'
* ==================================================
*   Middleware: queryMiddleware 
        1).addToBook_Table 
        2).getBook_Id
        3).addToPost_Table
        4).getPost_Id
        5).addToRating_Table
        6).addToHash_Table
        7).addToPost_Hash_Join
*   Receive: res.locals.post ()
*   Return: res
* ==================================================
*/
app.post('/', addToBook_Table, getBook_Id, addToPost_Table, getPost_Id, addToRating_Table, addToHash_Table, addToPost_Hash_Join, (req, res) => {
    res.status(200).json(res.locals.post_id);
})

/* GET Request on 'localhost:3000/'
* ==================================================
*   Middleware: betterReadsController.threePost_Table 
*   Receive: res.locals.post ()
*   Return: 
* ==================================================
*/
app.get('/', threePost_Table, (req, res) => {
    res.status(200).json(res.locals.posts);
})

/*
* ==================================================
*   404 error handler
* ==================================================
*/
app.use((req, res) => {
    res.status(404).json("Page not found");
})

/*
* ==================================================
*   Global Error Handler 
* ==================================================
*/
app.use((err, req, res, next) => {
    const defaultError = {
        log: "Error in unknown middleware",
        status: 400,
        message: {err: "Error sent in response"}
    }
    const errorObj = Object.assign(defaultError, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

module.exports = app;