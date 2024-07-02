const express = require("express");
const cors = require("cors");
const mongoose = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);

app.use("/", (req, res) => {
    res.send("we get it");
});

const port = 4600;
app.listen(port, () => {
    console.log("Server is running on", port);
});
