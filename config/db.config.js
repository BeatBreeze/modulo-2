const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://acanest1983:kIeYQrZDRqTU0G1f@beatbreeze.r9ragps.mongodb.net/beatBreeze")
    .then(() => {
        console.log("connected to mongoose");
    })
    .catch(err => {
        console.error("do not connected to mongoose", err);
    })
