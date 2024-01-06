const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/onenote" 
const connectionPromise = mongoose.connect(mongoURI, {
     useNewUrlParser: true,
     useUnifiedTopology: true
 });
 
 connectionPromise.then((db) => {
     console.log("MongoDB connection successful");
 }).catch((error) => {
     console.error("MongoDB connection failed:", error);
 });
 
 module.exports = connectionPromise ;


 