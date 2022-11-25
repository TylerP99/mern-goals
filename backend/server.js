const path = require("path");
const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 5000;
const {errorHandler} = require("./middleware/errorHandler");

const connectDB = require("./config/db");
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const morgan = require("morgan");
app.use(morgan("dev"));


app.use("/", require("./routes/index"));

// Serve frontend
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));

    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../", "frontend", "build", "index.html")));
} else {
    app.use("/", (req, res) => res.send("Set to production") )
}

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});