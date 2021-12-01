// Setup empty JS object to act as endpoint for all routes
weatherData = {
    temp: "",
    date: "",
    content: ""
};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(
    express.static(
       'website',
        {index: "/"}
    )
)

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname+ '/website');


// init index.html route
app.get('/', function(req, res) {
    console.log(JSON.stringify(weatherData))
    res.render('index.html', {
        weatherData : weatherData
    });
});

//init pst rout to add weather data
app.post('/add', function(req, res) {
    // Save the request body to a variable
    const data = req.body;
    // Add the data to the projectData object
    weatherData['temp'] = data.temp;
    weatherData['date'] = data.date;
    weatherData['content'] = data.content;
    // Send a response to the client
    res.send(weatherData);
    console.log(weatherData);
});

// init get rout to get weather data
app.get('/data', function(req, res) {
    res.send(weatherData);
});

// Setup Server
const port = 8080;
app.listen(port, () => {
    console.log(`server is starting on port: ${port}`); // Callback to debug
});
