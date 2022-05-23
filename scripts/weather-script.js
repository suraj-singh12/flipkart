// for weather 
let weatherLoc = document.getElementById("weather");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        // showPosition is a callback function here
    } else {
        weatherLoc.innerHTML = "Geo not supported";
    }
}

let showPosition = (data) => {
    console.log(data);
    let latitude = data.coords.latitude;
    let longitude = data.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&mode=json&units=metric&cnt=1&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;

    // api calling
    fetch(url, { method: `GET` })
        // below .then will return promise
        .then((res) => res.json())          // .then is called promise 
        // below .then will resolve the promise; return data
        .then((data) => {
            let weatherData = data.list[0].temp.day;
            weatherLoc.innerHTML = `${weatherData}\u00B0C`;     //    \u00B0 is code for degree symbol
        });
}

window.onload = function () {
    getLocation();
}