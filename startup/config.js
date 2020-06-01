const config = require('config');
module.exports = function(){
    if(!config.get('jsonPrivateKey')){
        throw new Error('Json Private Key is not provided');
    }
}