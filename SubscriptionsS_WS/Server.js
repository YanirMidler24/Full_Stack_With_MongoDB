const express = require('express');
const movieRoute = require("./routes/movieRoute");
const memberRoute = require("./routes/membersRoute")
const subsRoute = require("./routes/subsRoute")

var app = express();


require('./configs/database');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/movies', movieRoute);
app.use('/api/members', memberRoute);
app.use('/api/subs', subsRoute);


app.listen(8000);
console.log("Subs WS is Running")
