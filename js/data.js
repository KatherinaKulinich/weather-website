
const body = document.querySelector('.body');
const time = document.querySelector('#time');
const date = document.querySelector('#date');
const region = document.querySelector('#location');
const temperatureMain = document.querySelector('#temperature');

const key = '5d066958a60d315387d9492393935c19';
const week = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const year = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const form = document.querySelector('.location-form');
const errorMessage = document.querySelector('.information__error');
errorMessage.style.display = "none";
const button = document.querySelector('#buttonLocation');

const temperatureValue = document.querySelector('#temperatureValue');
const temperatureMaxValue = document.querySelector('#temperatureMaxValue');
const temperatureMinValue = document.querySelector('#temperatureMinValue');
const pressureValue = document.querySelector('#pressureValue');
const windSpeedValue = document.querySelector('#windSpeedValue');
const windDirectionValue = document.querySelector('#windDirectionValue');
const humidityValue = document.querySelector('#humidityValue');
const descriptionValues = document.querySelector('.information__desc-list');
const iconsBox = document.querySelector('.main-screen__icons-box');

const loader = document.querySelector('.main-screen__loader');
loader.style.display = "none";



function showErrorMessage() {
    setTimeout(() => {
        errorMessage.style.display = "none"
    }, 4000)
}


function getDate(data, elemTime, elemDate) {
    const hours = data.getHours();
    const min = data.getMinutes();
    const weekDay = data.getDay();

    const currentTime = ('0' + hours).slice(-2) + ':' + ('0' + min).slice(-2);
    const currentDate = week[data.getDay()] + ', ' + ('0' + data.getDate()).slice(-2) + ' ' + year[data.getMonth()];

    elemTime.innerHTML = currentTime;
    elemDate.innerHTML = currentDate;
}

