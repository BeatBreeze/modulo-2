const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
console.log("connected to mongoose");
  })
  .catch((err) => {
    console.error("do not connected to mongoose", err);
  });
