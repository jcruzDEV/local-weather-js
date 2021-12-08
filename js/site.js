window.addEventListener("DOMContentLoaded", async function (e){
    let x =  await getUsersLatLong(); //get latitude and longitude from geo
    let forecastPoints = await pointGetter(x.coords.latitude, x.coords.longitude)
    let forecastURL = forecastPoints.forecastURL; //can slim down to just pull forecast item without points
    let forecastData = await getForecast(forecastURL); 
    console.log(forecastData);
    let iconAddress = forecastData.properties.periods[0].icon;
    let weatherImage = document.querySelector("#weather-icon");
    let image = document.getElementById("weather-icon");
    image.src =  iconAddress;
    image.style.visibility = "visible"; 
    let forecastText = forecastData.properties.periods[0].detailedForecast;
    let description = document.getElementById("weather-forecast");
    description.innerText = forecastText;
});

function getUsersLatLong(){
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
}

async function getForecast(forecastURL){
    let x=null;
    const data = await fetch(forecastURL).then(response => response.json()).then(data => {
            x = data;
        })
    return x;
}

async function pointGetter(latitude, longitude){    
    let x = null;
    let url = `https://api.weather.gov/points/${latitude},${longitude}`;
    const information = await fetch(url).then(response => response.json()).then(data => {
        console.log(data);
        let locationProp = data.properties.relativeLocation.properties;
        console.log(locationProp["city"]);
        console.log(data.properties.relativeLocation.properties);
        x = {gridX:data.properties.gridX, gridY:data.properties.gridY,forecastURL:data.properties.forecast}; 
    })
    return x;
}