function showBackground(data, elem) {
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




function onGetCurrentPositionSuccess(position) { 
    let long = position.coords.longitude;
    let lat = position.coords.latitude;

    const apiUserLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric`;
    getForecastData(apiUserLocation);
}

function onGetCurrentPositionError() {
    region.innerHTML = 'location not found';
    region.style.fontSize = '40px';
    temperatureMain.innerHTML = '-&deg;C'
    hideLoader();
}




window.addEventListener('load', () => {
    showLoader()

    const data = new Date();
    const currentMonth = data.getMonth();
    getCurrentDate(data, time, date);

    showBackground(currentMonth, body);

    navigator.geolocation.getCurrentPosition(onGetCurrentPositionSuccess, onGetCurrentPositionError);
})