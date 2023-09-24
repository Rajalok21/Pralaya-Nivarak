const express=require ("express")
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/index2.html");
});
app.post("/",function(req,res)
{
    console.log(req.body.cityName);
    const query=req.body.cityName;
    const apikey="3dd5ccbeda96685f376819eeee65004d";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units=metric";
https.get(url,function(response)
{
 console.log(response.statusCode);
 response.on("data",function(data)
 {
    console.log(JSON.parse(data));
    const wdata=JSON.parse(data);
    const temp=wdata.main.temp;
    const lat=wdata.coord.lat;
    const long=wdata.coord.lon;
    
    const feel = wdata.main.feels_like
   const min =  wdata.main.temp_min
   const max=  wdata.main.temp_max
   const pressure =  wdata.main.pressure
    const humidity = wdata.main.humidity
    const weatherdesc=wdata.weather[0].description;
    const wind = wdata.wind.speed
    console.log(temp);

    // Build the HTML response string
    // Build the HTML response string
    const htmlResponse = `
    <!DOCTYPE html>
    <html>
    
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" type="text/css" href="/style.css"> <!-- Reference the CSS file -->
      <title>Weather App</title>
      <style>
        /* Additional inline styles for this specific HTML response */
        body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-image: linear-gradient(to right, rgb(177, 177, 235), white, rgb(242, 211, 216));
        }
    
        .header {
          font-size: 2em;
          color: #333;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }
    
        .temperature {
          font-size: 1.5em;
          color: #ff5733;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }
    
        .description {
          font-size: 1.2em;
          color: #100101;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
          font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        }
    
    
        .location {
      font-size: 1.1em;
      font-weight: bold;
      font-family: Arial, Helvetica, sans-serif;
      color: rgb(19, 63, 4);
      margin-bottom: 10px;
      border: 2px solid #ccc; /* Add a border */
      border-radius: 8px; /* Add border radius for rounded corners */
      padding: 10px; /* Add some padding */
      box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
      width: 300px; /* Set a fixed width */
      text-align: center; /* Center text */
    }
    
    
        .weather-icon {
          width: 100px;
          height: 100px;
          margin-top: 20px;
          //animation: rotate 2s linear infinite;
        }
    
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
    
          to {
            transform: rotate(360deg);
          }
        }
    
        .card {
          margin-top: 3rem;
          position: absolute;
          width: 50rem;
    
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-shadow: 0px 0px 40px black;
    
        }
    
        .logo {
          display: flex;
    
        }
    
        .logo img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
    
        .footer {
          background-color: #110f0f;
          color: #fff;
          padding: 40px 0;
          width: 100%;
          margin-top: 1.2em;
        }
    
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          box-sizing: border-box;
        }
        .footer {
      background-color: #110f0f;
      color: #fff;
      padding: 40px 0;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      box-sizing: border-box;
    }
    
    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .footer-logo img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    
    .footer-links a {
      color: #fff;
      text-decoration: none;
      margin: 0 10px;
      font-size: 1.2em;
      transition: color 0.3s;
    }
    
    .footer-links a:hover {
      color: #ff5733;
    }
    
    
    
      </style>
    </head>
    
    <body>
    
    
      <div class="logo">
        <img src="weather.png" alt="">
        <h1 class="header">Weather Information for ${query}</h1>
      </div>
      <div class="location-box">
      <p class="location">Temp: ${temp}°C</p>
        <p class="location">Latitude: ${lat}</p>
        <p class="location">Longitude: ${long}</p>
        <p class="location">Longitude: ${long}</p>
        <p class="location">Feels Like: ${feel}</p>
        <p class="location">Temp_Min: ${min}°C</p>
        <p class="location">Temp_Max: ${max}°C</p>
        <p class="location">)Pressure: ${pressure}</p>
        <p class="location">Humidity: ${humidity}%</p>
        <p class="location">Discription: ${weatherdesc}</p>
        <p class="location">Wind Speed: ${wind}M/S</p>
      </div>
    
        <img class="weather-icon" src="https://openweathermap.org/img/wn/${wdata.weather[0].icon}@2x.png">
     
    
    
      </div>
      <div class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-logo">
              <img src="logo.png" alt="Logo">
            </div>
            <div class="footer-links">
              <a href="index.html">Home</a>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
      </div>
    
    </body>
    
    </html>
    `;
    
    // Send the HTML response
    res.send(htmlResponse);
    

            
    res.send(htmlResponse);
 });
});
// res.send("SERVER CHALU HAI BOIS");  "because we can use send function for res or response only once per address"

});
app.listen(3002,function()
{
    console.log("server started on 3002");
});



