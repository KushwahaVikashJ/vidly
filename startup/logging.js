require('express-async-errors');
const winston  = require('winston');           //logging library
require('winston-mongodb');

module.exports = function(){
    process.on('uncaughtException', (ex)=>{  // to handle the unexception error out of the scope of express
        console.log('Failed Unexception');
        winston.error(ex.message);
    })
    
    process.on('unhandledRejection', (ex)=>{  // to handle the unexception error out of the scope of express
        console.log('Failed Rejection');
        winston.error(ex.message);
    })
    
    winston.add(new winston.transports.File({ filename:'logfile.log'}));
    winston.add(new winston.transports.MongoDB({ 
        db:'mongodb://localhost/vidly',
        level:'info'
    }));
}