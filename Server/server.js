const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set('db', db); //* Allows the whole app to use the db

const bookRouter = require('./sampleRouterWith DB FunctionCalls.js')






/*
* ==================================================
*   This block added by Jim White as sample for
*   database integration / setup.
* ==================================================
*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(path.resolve(__dirname, '/public/')));

const db = require('knex')({
  client: 'mysql2',
  connection: {
    host: '23.235.206.125',
    port: 3306,
    user: 'jimtermini_bradmin',
    password: '123br456',
    database: 'jimtermini_bestestreads',
  },
});

app.set('db', db); //* Allows the whole app to use the db

app.use('/book', bookRouter);

//* ==================================================

















/* 
* ===================================================================
*   Middleware Controllers
* ===================================================================
*/
const ratingController = require('./controller/ratingController');
const bookController = require('./controller/bookController');


/*
* ==================================================
*   This block added by Jim White as sample for
*   database integration / setup.
* ==================================================
*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(path.resolve(__dirname, '/public/')));

// send index.html file to base endpoint
app.use(express.static(path.resolve(__dirname, '../dist')));

/* GET Request on 'localhost:3000/books'
* ==================================================
*   Middleware: bookController.getBooks 
* ==================================================
*/
app.get('/books', bookController.getBooks, (req, res) => {
    res.status(200).json(res.locals.books);
})

/* POST Request on 'localhost:3000/addBook'
* ==================================================
*   Middleware: bookController.addBook 
*   Expecting req.body from client
* ==================================================
*/
app.post('/addBook', bookController.addBook, (req, res) => {
    res.status(200).send('Successfully added book!');
})

/* GET Request on 'localhost:3000/ratings'
* ==================================================
*   Middleware: ratingController.getRatings
* ==================================================
*/
app.get('/ratings', ratingController.getRatings, (req, res) => {
    res.status(200).json(res.locals.ratings);
})

/* POST Request on 'localhost:3000/addRating'
* ==================================================
*   Middleware: ratingController.addRating
*   Expecting req.body from client
* ==================================================
*/
app.post('/addRating', ratingController.addRating, (req, res) => {
    res.status(200).send('Successfully added rating!');
})




/*
*   404 error handler
*/
app.use((req, res) => {
    res.status(404).json("Page not found");
})

/*
*   Global Error Handler 
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



/*
*   Listening to port
*/
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

module.exports = app;