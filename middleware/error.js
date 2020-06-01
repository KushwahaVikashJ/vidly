const winston = require('winston');

module.exports = function(err,req,res,next){
    winston.error(err.message,err);
    winston.info('Hello');
    winston.warn('Dont do that');
    //error   //helper methods
    //warn
    //info
    //verbose
    //debug
    //silly

    res.status(500).send(err.message);
}