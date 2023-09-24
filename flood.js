const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
var b;
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index1.html");
});

app.post("/", function (req, res) {
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const apikey = "3dd5ccbeda96685f376819eeee65004d";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=metric";
    https.get(url, function (response) {
        console.log(response.statusCode);
         response.on("data", function (data) {
            const wdata = JSON.parse(data);
            const lat = wdata.coord.lat;
            const long = wdata.coord.lon;
            console.log(lat);
            console.log(long);

            const url2 = "https://flood-api.open-meteo.com/v1/flood?latitude=" + lat + "&longitude=" + long + "&daily=river_discharge";
            https.get(url2, function (response) {
                console.log(response.statusCode);
                response.on("data", function (data) {
                    const fdata = JSON.parse(data);
                    console.log(fdata);
                    var lda = fdata.daily.river_discharge[89];
                    if (lda < 8) {
                        b = "NO FLOOD ZONE";
                    }
                    else if (lda >= 8 && lda < 16) {
                        b = "moderate flood zone";
                    }
                    else {
                        b = "sever flood zone!!!";
                    }

                    // HTML template
                    const htmlResponse = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" href="/style.css"> <!-- Reference the CSS file -->
  <title>flood predictor</title>
  <style>
  body {
      background: url('flood-image.jpg') no-repeat center center fixed;
      background-size: cover;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
        background: linear-gradient(135deg, #ff6b6b, #6b47ff);
        
  }

  .container {
      background: rgba(255, 255, 255, 0.8);
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      text-align: center;
      animation: fadeIn 1s ease;
  }

  @keyframes fadeIn {
      0% {
          opacity: 0;
          transform: translateY(-20px);
      }
      100% {
          opacity: 1;
          transform: translateY(0);
      }
  }

  .header {
      font-size: 2em;
      color: #333;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  .result-box {
      margin-top: 20px;
      padding: 10px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 5px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
      animation: slideIn 1s ease;
  }

  @keyframes slideIn {
      0% {
          opacity: 0;
          transform: translateY(20px);
      }
      100% {
          opacity: 1;
          transform: translateY(0);
      }
  }

  .result {
      font-size: 1.5em;
      color: #ff5733;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  }
</style>
<body>
    <div class="container">
        <h1 class="header">FLOOD PREDICTOR for ${query}</h1>
        <div class="result-box">
            <p class="result">prediction: ${b}  river discahrge is ${lda}</p>
        </div>
    </div>
</body>
</html>
`;

                    // Send the HTML response directly
                    res.send(htmlResponse);
                });
            });
        });
    });
});

app.listen(3001, function () {
    console.log("server started");
});
