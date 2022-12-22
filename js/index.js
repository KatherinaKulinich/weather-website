function getForecastData(api) {
    fetch(api)
    .then((response) => {
        return response.json();
    })
    .then((json) => {      
        showWeather(json);
    })
    .catch((error) => {
        showErrorMessage()
    })
    .finally(() => {
        hideLoader()
    })
}

function showWeather(data) {
    region.removeAttribute('style', '');
    let actualTemp =  `${Math.round(data.main.temp)}&deg;C`;
        temperatureValue.innerHTML = actualTemp;
        temperatureMain.innerHTML = actualTemp;
        temperatureMaxValue.innerHTML = `${Math.round(data.main.temp_max)}&deg;C`;
        temperatureMinValue.innerHTML = `${Math.round(data.main.temp_min)}&deg;C`;
        pressureValue.innerHTML = `${data.main.pressure} hPa`;
        windSpeedValue.innerHTML = `${data.wind.speed} meter/sec`;
        windDirectionValue.innerHTML = `${data.wind.deg} deg`;
        humidityValue.innerHTML = `${data.main.humidity} %`;
        region.innerHTML = data.name;
        
        let weatherArray = data.weather;
        weatherArray.forEach(element => {
            if(element.id) {
                iconsBox.replaceChildren();
                const iconItem = document.createElement('div');
                iconItem.classList.add('main-screen__forecast-icon');
                const iconImg = document.createElement('img');
                iconImg.setAttribute('src', `https://openweathermap.org/img/wn/${element.icon}@2x.png`);
                iconImg.setAttribute('alt', 'weather-icon');
                iconImg.classList.add('main-screen__icon');
                iconItem.append(iconImg);
                iconsBox.append(iconItem);

                descriptionValues.replaceChildren();
                const descriptionText = document.createElement('p');
                descriptionText.classList.add('information__item-value');
                descriptionText.innerHTML = `${element.description}`;
                descriptionValues.append(descriptionText);
            }


            if (/^2/.test(element.id)) {
                body.style.backgroundImage = "url('./images/storm.jpg')";
                return;
            }
            if (/^(3|5)/.test(element.id)) {
                body.style.backgroundImage = "url('./images/rain.jpg')";
                return;
            }
            if (/^6/.test(element.id)) {
                body.style.backgroundImage = "url('./images/snow.jpg')";
                return;
            }
            if (/^7/.test(element.id)) {
                body.style.backgroundImage = "url('./images/foggy.jpg')";
                return;
            }
            if (/800/.test(element.id)) {
                body.style.backgroundImage = "url('./images/sun.jpg')";
                return;
            }
            if (/^8/.test(element.id)) {
                body.style.backgroundImage = "url('./images/cloudy.jpg')";
                return;
            }
        });
}



function getWeatherDataByCity(city, apiKey) {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&ç=metric&APPID=${apiKey}&units=metric`;
    getForecastData(api);
}



form.addEventListener('submit', (event) => {
    event.preventDefault();
    showLoader();

    const data = new Date();
    getCurrentDate(data, time, date);

    let value = form.elements["userLocation"].value;
    let validValue = value.replaceAll(/[^-a-zа-яіё\s]/gi, '');
    getWeatherDataByCity(validValue, key);

    form.elements["userLocation"].value = '';
})



