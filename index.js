const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

const url = 'mongodb://localhost:27017/nucampsite';
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect.then(() => {

    console.log('Connected correctly to server');

    //create method return a promise that resolves to the new document
    Campsite.create({
        name: 'React Lake Campground',
        description: 'test'
    })
    //then we console.log that save document,so we expect here to see react lake campground logged as an object
    .then(campsite => {
        console.log(campsite);
        //next we find and logged the docs instantiated from the campsite model,here we would expect to see
        //that the react lake campground document is logged as an object that's inside an array.
        //its only document that we've created from the campsite model so far,so it would be the only item in the array
        return Campsite.find();
    })
    .then(campsites => {
        console.log(campsites);
        //then we delete all the documents from the campsite model & we close the connection
        return Campsite.deleteMany();
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch(err => {
        console.log(err);
        mongoose.connection.close();
    });
});