/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const appId = 'ae684c8809f260571a8216177ef33e56';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const weatherDataForm = document.getElementById('weatherDataForm');
