
const express  = require('express');
const customer = require('../routes/customer');
const genres   = require('../routes/genres');
const movie    = require('../routes/movie');
const rental   = require('../routes/rentals');
const users    = require('../routes/users');
const auth     = require('../routes/auth');
const error    = require('../middleware/error');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/genres/',genres);
    app.use('/api/customer/',customer);
    app.use('/api/movie/',movie);
    app.use('/api/rental/',rental);
    app.use('/api/users/',users);
    app.use('/api/auth/',auth);
    app.use(error);
}