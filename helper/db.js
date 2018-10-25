const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://ahmetyildirim:abcd123@ds239903.mlab.com:39903/movie-api');
    mongoose.connection.on('open', () => {
        //console.log('MongoDb: Connected');
    });
    mongoose.connection.on('error', (err) => {
        console.log('MongoDb: Error', err);
    });

    mongoose.Promise = global.Promise;

}