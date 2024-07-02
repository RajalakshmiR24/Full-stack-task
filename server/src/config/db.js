const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://rajalakshmi1430:Qo0t1RvyJx4jw93f@crud.yylygvk.mongodb.net/Crud")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch((err) => {
        console.log("connection error", err.message);
    });

module.exports = mongoose;
