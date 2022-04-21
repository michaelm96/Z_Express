const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const routes = require("./routes");
const mongoose = require("mongoose");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(
    `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@${process.env.DATABASE}/`,
    {
        useFindAndModify: false,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        autoIndex: false,
    },
    function (err) {
        if (err) console.log(err);
        if (!err) console.log("Success connected");
    }
);
mongoose.set("debug", true);
app.use(routes);

app.listen(port, () => {
    console.log(`starting server on port ${port}`);
});
