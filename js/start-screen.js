

function loadInitialBackground(data, elem) {
    if (data === 11 || data <= 1) {
        elem.style.backgroundImage= "url('./images/winter.jpg')";
        return;
    }

    if (data >= 2 && data <= 4) {
        elem.style.backgroundImage= "url('./images/spring.jpg')";
        return;
    }

    if (data >= 5 && data <= 7) {
        elem.style.backgroundImage= "url('./images/summer.jpg')";
        return;
    }

    if (data >= 8 && data <= 10) {
        elem.style.backgroundImage= "url('./images/fall.jpg')";
        return;
    }
}




function isLocation(position) { 
    let long = position.coords.longitude;
    let lat = position.coords.latitude;

    const apiUserLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric`;
    getForecastData(apiUserLocation);
}

function errorLocation() {
    region.innerHTML = 'location not found automatically';
    region.style.fontSize = '50px';
    temperatureMain.innerHTML = '--&deg; C'
    loader.style.display = "none";
}





window.addEventListener('load', () => {
    loader.style.display = "flex";

    const data = new Date();
    const currentMonth = data.getMonth();
    getDate(data, time, date);

    loadInitialBackground(currentMonth, body);

    navigator.geolocation.getCurrentPosition(isLocation, errorLocation);
})