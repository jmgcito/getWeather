const express = require("express");
const app = express();
app.listen(3000, () => {
  console.log("Listening at 3000");
});
app.use(express.static("public"));

require("dotenv").config();
console.log(process.env);

app.use(express.json({ limit: "1mb" }));
app.post("/api", (req, res) => {
  console.log("I got a request!");
  res.json({
    status: "success",
    weather_key: process.env.WEATHER_KEY,
    gif_key: process.env.GIF_KEY,
  });
});
