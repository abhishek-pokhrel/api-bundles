const express = require("express");
const home = require("./routes/home");
const quotes = require("./routes/quotes");
const horoscopes = require("./routes/horoscopes");

const app = express();
app.use(express.json());

app.use("/", home);
app.use("/quotes/", quotes);
app.use("/horoscopes", horoscopes);

const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));