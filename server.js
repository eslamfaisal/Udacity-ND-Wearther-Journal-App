// Setup empty JS object to act as endpoint for all routes
projectData = {};

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

// Initialize the main project folder
app.use(express.static('website'));

// init index.html route
app.get('/', function(req, res) {
    res.sendFile('website/index.html');
});

//init pst rout to add weather data
app.post('/add', function(req, res) {
    // Save the request body to a variable
    const data = req.body;
    // Add the data to the projectData object
    projectData['temp'] = data.temp;
    projectData['date'] = data.date;
    projectData['content'] = data.content;
    // Send a response to the client
    res.send(projectData);
    console.log(projectData);
});

// init get rout to get weather data
app.get('/data', function(req, res) {
    res.send(projectData);
});

// Setup Server
const port = 8080;
app.listen(port, () => {
    console.log(`server is starting on port: ${port}`); // Callback to debug
});
