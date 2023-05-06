const mongoose = require('mongoose');

async function connect() { // connect mongodb
    try {
        await mongoose.connect('mongodb://127.0.0.1/f8_education_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connect successfully!!!");
    }
    catch (error){
        console.log("Fail");
    }
}

module.exports = { connect };