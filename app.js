const winston  = require('winston');
const express  = require('express');
var app        = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

// const p = Promise.reject(new Error('promise Rejection'));
// p.then(()=>console.log('Done'));
// throw new Error('Something wrong in start');  // (for uncaught exception);

app.get('/',(req,res)=>{
    res.send('Hello world');
});

const port = process.env.PORT || 3000;
app.listen(port,()=>winston.info(`Listening on port ${port}....`));