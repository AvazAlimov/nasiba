const createError = require('http-errors');
const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const mongoose = require("mongoose");
const route = require("./src/route");

mongoose.connect("mongodb://avazalimov:%40v%40zARS23@app-shard-00-00-okl1f.mongodb.net:27017,app-shard-00-01-okl1f.mongodb.net:27017,app-shard-00-02-okl1f.mongodb.net:27017/nasiba?ssl=true&replicaSet=app-shard-0&authSource=admin",
    {useNewUrlParser: true});
mongoose.Promise = global.Promise;

const app = express();

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());
app.use((res, req, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

route(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error("Not found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

module.exports = app;
