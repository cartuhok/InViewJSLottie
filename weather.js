let zip = '02135';

//obfuscate key
const str = (226329205184136).toString(36).toLowerCase()+(11762718).toString(36).toLowerCase()+(function(){var Z=Array.prototype.slice.call(arguments),P=Z.shift();return Z.reverse().map(function(Q,q){return String.fromCharCode(Q-P-9-q)}).join('')})(49,120,161,119,113,118,114,112,155)+(732376484).toString(36).toLowerCase()+(function(){var Q=Array.prototype.slice.call(arguments),g=Q.shift();return Q.reverse().map(function(e,v){return String.fromCharCode(e-g-31-v)}).join('')})(48,134,178)+(4).toString(36).toLowerCase();


async function getWeather(zip) {
    try { //if no error
        const result = await fetch(`https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?zip=${zip},us&APPID=${str}`);
        const data = await result.json();
        console.log(data);
        return data;

    } catch(error) {
        console.log(error);
    }

};



/* Condition Desriptions: https://openweathermap.org/weather-conditions */

getWeather(zip).then(data => {

    const date = new Date();
    const time = date.getHours();

    let weatherMain = data.weather[0].main;
    let weatherDes = data.weather[0].description;
    let ktemp = data.main.temp;
    let temp = Math.round(((ktemp-273.15)*1.8)+32);
    console.log(weatherDes);
    let img = document.querySelector('.img');
  
    heavy = ['heavy', 'extreme'];

    let night = 'night-alt';
    if (time < 18 && time > 5) {
        night = 'day';
    }


    //Clear
    if(weatherMain === 'Clear') {
        if(night === 'night-alt') {
            img.innerHTML = `<i class="wi wi-night-clear"></i>`;
        }
        if(night === 'day') {
            img.innerHTML = `<i class="wi wi-day-sunny"></i>`
        }
    }

    //TStorm
    if(weatherMain === 'Thunderstorm') {
        img.innerHTML = `<i class="wi wi-${night}-thunderstorm"></i>`;
    }

    //Drizzy
    if(weatherMain === 'Drizzle') {
        img.innerHTML = `<i class="wi wi-${night}-sprinkle"></i>`;
    }

    //Rain
    if(weatherMain === 'Rain') {
        if(weatherDes === 'freezing rain') {
            img.innerHTML = `<i class="wi wi-${night}-rain-mix"></i>`;
        } else {
            img.innerHTML = `<i class="wi wi-${night}-rain"></i>`;
        }
        for (const y of heavy) {
            if(weatherDes.includes(y)) {
                img.innerHTML = `<i class="wi wi-rain"></i>`;
            } 
        }
    }

    //Snow
    if(weatherMain === 'Snow') {
        if(weatherDes === 'Sleet' || weatherDes === 'Light shower sleet' || weatherDes === 'Shower sleet') {
            img.innerHTML = `<i class="wi wi-${night}-sleet"></i>`;
        } else {
            img.innerHTML = `<i class="wi wi-${night}-snow"></i>`;
        }
        for (const y of heavy) {
            if(weatherDes.includes(y)) {
                img.innerHTML = `<i class="wi wi-snow"></i>`;
            } 
        }
    }

    //Fog
    if(weatherMain === 'Fog') {
        img.innerHTML = `<i class="wi wi-fog"></i>`;
    }

    //Clouds
    if(weatherDes === 'few clouds' || weatherDes === 'scattered clouds') {
        img.innerHTML = `<i class="wi wi-${night}-cloudy"></i>`;
    }
    if(weatherDes === 'broken clouds' || weatherDes === 'overcast clouds') {
        img.innerHTML = `<i class="wi wi-${night}-cloudy-high"></i>`;
    }

    document.querySelector('.desc').innerHTML = `<p>${temp}&#176;</p><p>${weatherDes}</p>`;


});





