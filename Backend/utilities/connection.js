const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect(process.env.MONGO_URL)
      .then(() => {
        console.log(`Connected to MongoDB ${process.env.MONGO_URL}`);
      })
      .catch(error => {
        console.error('Error connecting to MongoDB:', error);
      });
}

module.exports = connect;

