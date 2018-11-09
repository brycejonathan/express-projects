const express = require("express");

let app = express();

//Parses two parameters (minimum and maximum) in the URL of the request
app.get("/random/:min/:max", (req, res) => {
  let min = parseInt(req.params.min);
  let max = parseInt(req.params.max);

  //Check if either number is malformed, if true return error
  if (isNaN(min) || isNaN(max)) {
    res.status(400);
    res.json({ error: "Bad request" });
    return;
  }

  //Generates random number and sends result as JSON
  let result = Math.round(Math.random() * (max - min) + min);
  res.json({ result: result });
});

app.listen(3000, (req, res) => {
  console.log("App started on port 3000");
});
