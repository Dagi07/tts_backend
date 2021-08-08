require('dotenv').config({path: __dirname + '/.env'})
const express = require('express');
const connectDb = require('./db/config').connectDb;
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

var bodyParser = require('body-parser')
const jwtEx = require('express-jwt')
const error_handler = require('./_helpers/error_handler')
const jwt = require('jsonwebtoken');
const secret = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

var authedRoutes = require('./routes/authenticatedRoutes');
var unAuthedRoutes = require('./routes/notAuthenticatedRoutes');


connectDb();
app.listen(port, () => console.log(`App listening on port ${port}!`),);
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,X-Total-Count');
    res.header('Access-Control-Expose-Headers', 'X-Total-Count')
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();    
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/u', unAuthedRoutes);
// app.use(jwtEx({ secret: secret, algorithms: ['HS256'] }))
app.use('/a', authedRoutes)
// app.use('/restaurants', restaurants);
// app.use('/foods', food);
// app.use('/manager', manager)

app.use(error_handler)


