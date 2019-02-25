let express = require("express");
let app = express();
let bodyParser = require("body-parser");
const dataManip = require("./Routes/DataManip");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("welcome to ridge-neuron");
});
//content access route
app.use("/api/data", dataManip);

//TODO validator set manipulation

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log("listening at " + port);
});
