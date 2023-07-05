// Class selector
// To find the element with a given CSS class, you use the class selector syntax:
// let currentInput = document.querySelector('.currentInput');
let current_Day = document.querySelector('.days');
let current_Date = document.querySelector('.date');
let current_Time = document.querySelector('.time');
let forcast_Location = document.querySelector('.location');
let forcast_Weather = document.querySelector('.weather');
let forcast_Temp = document.querySelector('.temperature');
// let forcast_Visib = document.querySelector('.visibility');
// let forcast_Humid = document.querySelector('.humidity');
// let forcast_Wind = document.querySelector('.wind');

let searchbtn = document.querySelector('.search-button');
let input_city = document.querySelector('.search-bar');
let temp_arr = document.querySelectorAll('.days-temp');
let weather_arr = document.querySelectorAll('.days-wea');

// Type selector
// To select elements by node name, you use the type selector e.g., a selects all <button> elements
// let numbtn = document.querySelectorAll('button');


// ID Selector
// To select an element based on the value of its id, you use the id selector syntax
// let deletebtn = document.querySelector('#delete');
let forcast_Visib = document.querySelector('#visi-value');
let forcast_Humid = document.querySelector('#humid-value');
let forcast_Wind = document.querySelector('#wind-value');



// OpenWeatherMap API. Do not share it !!!
const api_key = "ssssssssssssssssssssssssssssssssscb12095746190f23f7c68fe1e9babc8c";



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
let weekly_frcst = [];
let days_waether = [];
let days_temp = [];
const default_loc = "Singapore";


function weatherBalloon(city_name) 
{
    let web1 = "https://api.openweathermap.org/data/2.5/weather?q="+city_name+"&appid="+api_key; 
    let web2 = "https://api.openweathermap.org/data/2.5/forecast?q="+city_name+"&appid="+api_key;
    weekly_frcst = [];

    // Fetch the weather for today
    fetch(web1)
    .then (function (response)
    {
        return response.json();
    })
    .then (function (data)
    {
        frcst_city = data.name;
        frcst_country = data.sys.country;
        frcst_weather = data.weather[0].main;
        frcst_temp = (data.main.temp - 273.15).toFixed(2);
        frcst_visib = data.visibility;
        frcst_humid = data.main.humidity;
        frcst_wind = data.wind.speed;
    })
    .catch(function()
    {
    });



    // Fetch the weather for the weeks
    fetch(web2)
    .then (function (response)
    {
        return response.json();
    })
    .then (function (data)
    {
        weekly_frcst.push([data.list[0].weather[0].main, (data.list[0].main.temp - 273.15).toFixed(2)]);
        weekly_frcst.push([data.list[8].weather[0].main, (data.list[8].main.temp - 273.15).toFixed(2)]);
        weekly_frcst.push([data.list[16].weather[0].main, (data.list[16].main.temp - 273.15).toFixed(2)]);
        weekly_frcst.push([data.list[24].weather[0].main, (data.list[24].main.temp - 273.15).toFixed(2)]);
        weekly_frcst.push([data.list[32].weather[0].main, (data.list[32].main.temp - 273.15).toFixed(2)]);
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
weatherBalloon(default_loc);

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
    forcast_Visib.innerHTML = frcst_visib + " m";
    forcast_Humid.innerHTML = frcst_humid + " %";
    forcast_Wind.innerHTML = frcst_wind + " km/h";

    for (let i=0; i < weekly_frcst.length; i++)
    {
        console.log(temp_arr[i])
        console.log(weather_arr[i])

        temp_arr[i].innerHTML = (weekly_frcst[i][1]);
        weather_arr[i].innerHTML = (weekly_frcst[i][0]);
    }
}
