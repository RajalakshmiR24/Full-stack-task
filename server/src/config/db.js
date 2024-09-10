const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/CRUD")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch((err) => {
        console.log("connection error", err.message);
    });

module.exports = mongoose;
