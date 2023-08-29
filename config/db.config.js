const mongoose = require ("mongoose"); 

mongoose.connect ("mongodb://127.0.0.1:27017/beatBreeze")
.then (() => {
    console.log ("connected to mongoose");

}).catch (err => {
    console.error ("do not connected to mongoose",err);
})