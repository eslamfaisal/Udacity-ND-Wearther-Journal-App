/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const appId = 'ae684c8809f260571a8216177ef33e56';
const weatherDataForm = document.getElementById('weatherDataForm');
const submitBtn = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/**
 * Get Weather Data from API
 * @param baseUrl
 * @param zipCode
 * @param appID
 * @returns {Promise<any>}
 */
const getWeatherData = async(baseUrl, zipCode, appID) => {
    // res equals to the result of fetch function
    const res = await fetch(`${baseUrl}?zip=${zipCode}&appid=${appID}`);
    try {
        // return json data
        return await res.json();
    } catch (error) {
        console.log('error', error);
    }
};

const updateUI = async() => {
    const request = await fetch('/data');
    try {
        const allData = await request.json();
        console.log(allData);
        // update new entry values
        if (allData.date !== undefined && allData.temp !== undefined && allData.content !== undefined) {
            document.getElementById('date').innerHTML = allData.date;
            document.getElementById('temp').innerHTML = allData.temp + ' degree C';
            document.getElementById('content').innerHTML = allData.content;
        }
    } catch (error) {
        console.log('error', error);
    }
}


const sendWeatherDataToServer = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            temp: data.temp,
            date: data.date,
            content: data.content
        })
    });

    try {
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

function getDataAndUpdateUI(e){
    e.preventDefault();

    //get user input
    const zipCode = document.getElementById('zip').value;
    const userFeelings = document.getElementById('feelings').value;

    if (zipCode !== '') {
        submitBtn.classList.remove('invalid');
        getWeatherData(baseUrl, zipCode, appId)
            .then(function(data) {
                console.log(data)
                // add data to POST request
                sendWeatherDataToServer('/add', { temp: convertKelvinToCelsius(data.main.temp), date: newDate, content: userFeelings });
            }).then(function() {
            // call updateUI to update browser content
            updateUI()
        }).catch(function(error) {
            console.log(error);
            alert('The zip code is invalid. Try again');

        });
        weatherDataForm.reset();
    } else {
        submitBtn.classList.add('invalid');
    }
}


// helper function to convert temperature from Kelvin to Celsius
function convertKelvinToCelsius(kelvin) {
    if (kelvin < (0)) {
        return 'below absolute zero (0 K)';
    } else {
        return (kelvin - 273.15).toFixed(2);
    }
}

submitBtn.addEventListener('click', getDataAndUpdateUI);
