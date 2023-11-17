// imports 

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors')

const app = express();
app.use(cors())
const PORT = process.env.PORT || 5000;

// database connection 
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on("error",(error) => console.log('error'));
db.once("open", () => console.log("connected to database!"));


// set template engine
app.set("view engine" , "ejs");

app.use(express.json())
// router set

app.use("/user",require('./routers/user.routes'))

app.listen(PORT, () =>{
    console.log(`server started at https://localhost: ${PORT}`);
});

