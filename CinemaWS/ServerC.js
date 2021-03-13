const express = require("express")
var cors = require('cors')

const movieRoute = require("./routes/moviesRoute")
const memebresRoute = require("./routes/membersRoute")
const usersRoute = require("./routes/usersRouter")
const subsRoute = require("./routes/subsRoute")
const bodyParser = require('body-parser');

var app = express()
app.use(cors());

require('./configs/database');


app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use("/api/movies" , movieRoute)
app.use("/api/members", memebresRoute)
app.use("/api/users", usersRoute)
app.use('/api/subs', subsRoute);

app.listen(9000)
console.log("Cinema WS is Running")