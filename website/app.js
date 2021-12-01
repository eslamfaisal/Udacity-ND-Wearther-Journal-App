const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const appId = '0e9649659d59394ad407d8f322863b8a';

const weatherDataForm = document.getElementById('weatherDataForm');
const submitBtn = document.getElementById('generate');

//create formatted date
let d = new Date();
let formattedDate = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;


function getWeatherData(options) {
    options.preventDefault();
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    if (zip === '' || feelings === '') {
        alert('Please enter a zip code and feelings');
        return;
    }
    const url = `${baseUrl}?zip=${zip},us&appid=${appId}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data =>
            saveDataInServer('/add', extractDataFromResponse(data, feelings))
        ).then(() =>
            getDataFromServer('/data')
        ).then((data) => {
            updateUI(data)
        });

    weatherDataForm.reset();
}

function extractDataFromResponse(response, feelings) {
    return {
        date: formattedDate,
        temp: (response.main.temp),
        content: feelings
    };
}

saveDataInServer = async (url, data) => {
    await fetch(url, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(res => {
        console.log("Request complete! response:", res);
    });
}


const getDataFromServer = async (url) => {
    const request = await fetch(url)
    return await request.json();
}

function updateUI(data) {
    document.getElementById('date').innerHTML = data.date;
    document.getElementById('temp').innerHTML = data.temp + '&deg;C';
    document.getElementById('content').innerHTML = data.content;
}

submitBtn.addEventListener('click', getWeatherData);
