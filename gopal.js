
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html");

});

app.post("/", (req, res) => {

    const query = req.body.cityName;
    const apiKey = "37bae68974f8132c1919224aadd7543c";
    const unit = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;
    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on("data", (data) => {
            const weatherAPI = JSON.parse(data)
            const discription = weatherAPI.weather[0].description;
            const icon = weatherAPI.weather[0].icon;
            const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
            const temp = weatherAPI.main.temp;


            res.write(`<p> weather is currently ${discription}</p>`)
            res.write("this is your win")
            res.write(`<img src ="${imageURL}">`)
            res.write(`<h1>temprature of ${query} the climate is ${temp}</h1>`)
            res.send();

        })
    })

})




app.listen(3000, () => {
    console.log("runnin gopa port 3000");
})