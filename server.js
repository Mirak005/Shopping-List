const express = require("express");
const mongoose = require("mongoose");

const items = require("./routes/api/items");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");

const app = express();

//Middelware express bodyParser
app.use(express.json());

// DB Config
const mongo_url = "mongodb://localhost:27017/Shopping-list";

//Connect to Mongo
mongoose
  .connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex : true })
  .then(() => console.log("Mongo DB Connected..."))
  .catch(err => console.log(err));

//Use Routes
app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 5000;

app.listen(port, err => {
  if (err) console.log("Cannot run the server");
  else console.log(`Server started on port ${port}`);
});