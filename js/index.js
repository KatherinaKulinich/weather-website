
function getForecastData(api) {
    fetch(api)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        let actualTemp =  `${Math.round(json.main.temp)}&deg;C`;
        temperatureValue.innerHTML = actualTemp;
        temperatureMain.innerHTML = actualTemp;
        temperatureMaxValue.innerHTML = `${Math.round(json.main.temp_max)}&deg;C`;
        temperatureMinValue.innerHTML = `${Math.round(json.main.temp_min)}&deg;C`;
        pressureValue.innerHTML = `${json.main.pressure} hPa`;
        windSpeedValue.innerHTML = `${json.wind.speed} meter/sec`;
        windDirectionValue.innerHTML = `${json.wind.deg} deg`;
        humidityValue.innerHTML = `${json.main.humidity} %`;
        region.innerHTML = json.name;
        
        let weatherArray = json.weather;
        weatherArray.forEach(element => {
            if(element.id) {
                iconsBox.replaceChildren();
                const iconItem = document.createElement('div');
                iconItem.classList.add('main-screen__forecast-icon');
                const iconImg = document.createElement('img');
                iconImg.setAttribute('src', `http://openweathermap.org/img/wn/${element.icon}@2x.png`);
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
    })
    
    .catch((error) => {
        errorMessage.style.display = "block";
        errorMessage.innerHTML = `Error. Try again!`;
        showErrorMessage()
    })
    .finally(() => {
        loader.style.display = "none";
    })
}





form.addEventListener('submit', (event) => {
    event.preventDefault();
    loader.style.display = "flex";

    const data = new Date();
    getDate(data, time, date);

    let value = form.elements["userLocation"].value;
    let validValue = value.replaceAll(/[^a-zа-яіё]/gi, '');

    const api = `http://api.openweathermap.org/data/2.5/weather?q=${validValue}&ç=metric&APPID=${key}&units=metric`;
    getForecastData(api);

    form.elements["userLocation"].value = '';
})



