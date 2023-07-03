// Class selector
// To find the element with a given CSS class, you use the class selector syntax:
// let currentInput = document.querySelector('.currentInput');
let current_Day = document.querySelector('.days');
let current_Date = document.querySelector('.date');
let current_Time = document.querySelector('.time');
let forcast_Location = document.querySelector('.location');
let forcast_Weather = document.querySelector('.weather');
let forcast_Temp = document.querySelector('.temperature');
let forcast_Visib = document.querySelector('.visibility');
let forcast_Humid = document.querySelector('.humidity');
let forcast_Wind = document.querySelector('.wind');

let searchbtn = document.querySelector('.search-button');
let input_city = document.querySelector('.search-bar');

// Type selector
// To select elements by node name, you use the type selector e.g., a selects all <button> elements
// let numbtn = document.querySelectorAll('button');


// ID Selector
// To select an element based on the value of its id, you use the id selector syntax
// let deletebtn = document.querySelector('#delete');


// OpenWeatherMap API. Do not share it !!!
const api_key = "xxx";
// https://api.openweathermap.org/data/2.5/weather?q=Toronto,CA&appid={yourkey}



// ***********************************
// ***      MODEL (Database)       ***
// ***********************************
let frcst_day;
let frcst_date;
let frcst_time;
let frcst_city;
let frcst_country;
let frcst_weather;
let frcst_temp;
let frcst_visib;
let frcst_humid;
let frcst_wind;
let days_waether = [];
let days_temp = [];


function weatherBalloon(city_name) 
api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
{
    let web1 = "https://api.openweathermap.org/data/2.5/weather?q="+city_name+"&appid="+api_key;
    let web2 = "https://api.openweathermap.org/data/2.5/weather?q="+city_name",CA&appid="+api_key;
    city = 

    // Fetch the weather for today
    fetch('')
    .then (function (response)
    {
        return response.json();
    })
    .then (function (data)
    {
        console.log(data.list[0]);
        frcst_city = data.name;
        frcst_country = data.sys.country;
        frcst_weather = data.weather.main;
        frcst_temp = (data.main.temp - 273.15).toFixed(2);
        frcst_visib = data.main.visibility;
        frcst_humid = data.main.humidity;
        frcst_wind = data.wind.speed;
    })
    .catch(function()
    {
    });



    // Fetch the weather for the weeks
    fetch('')
    .then (function (response)
    {
        return response.json();
    })
    .then (function (data)
    {
        weekly_frcst_day1 = [data.list[0].weather[0].main, data.list[0].main.temp];
        weekly_frcst_day2 = [data.list[8].weather[0].main, data.list[8].main.temp];
        weekly_frcst_day3 = [data.list[16].weather[0].main, data.list[16].main.temp];
        weekly_frcst_day4 = [data.list[24].weather[0].main, data.list[24].main.temp];
        weekly_frcst_day5 = [data.list[32].weather[0].main, data.list[32].main.temp];
    })
    .catch(function()
    {
    });


    input_city.value = "";
}



function updateDateTime() 
{
    var currentDate = new Date();
    var dayOfWeek = currentDate.toLocaleDateString(undefined, { weekday: 'long' });
    var date = currentDate.toLocaleDateString();
    var time = currentDate.toLocaleTimeString();

    frcst_day = dayOfWeek;
    frcst_date = date;
    frcst_time = time;

    render();
}

function updateNextFiveDays() 
{
    render();
}





// ************************************
// ***      CONTROL (from HMI)      ***
// ************************************
// // Update the date and time every second
updateDateTime();
setInterval(updateDateTime, 1000);
weatherBalloon();

searchbtn.addEventListener("click", () => 
{
    weatherBalloon(input_city.value);
});


// ************************
// ***      VIEW        ***
// ************************
function render()
{
    current_Day.innerHTML = frcst_day;
    current_Date.innerHTML = frcst_date;
    current_Time.innerHTML = frcst_time;
    forcast_Location.innerHTML = frcst_city + ", " + frcst_country;
    forcast_Weather.innerHTML = frcst_weather;
    forcast_Temp.innerHTML = frcst_temp + " &#8451";
    // forcast_Visib.innerHTML = frcst_visib + " m";
    // forcast_Humid.innerHTML = frcst_humid + " %";
    // forcast_Wind.innerHTML = frcst_wind + " km/h";
}
