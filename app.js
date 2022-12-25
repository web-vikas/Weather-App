const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  // res.send(req.body.cityName)
  // console.log(req.body.cityName);

  const qurey = req.body.cityName;
  const apiKey = "153a96444c9e24b62bde3c2920c8de1c";
  const unit = "metric";

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    qurey +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weather = weatherData.weather[0].main;
      const disc = weatherData.weather[0].description;

      res.write("<h1> The temprature of " + qurey + " is: " + temp + "</h1>");
      res.write("<p>weather of " + qurey + " is: " + weather + "</p>");
      res.write("<p>weather of " + qurey + " is: " + disc + "</p>");
      res.send();
    });
  });
});

app.listen(3000, function (req, res) {
  console.log("The server is start...");
});