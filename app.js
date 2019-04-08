window.addEventListener('load', () => {
  let long;
  let lat;

  let temperatureDescription = document.querySelector(".temperature-description");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  let temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api =`${proxy}https://api.darksky.net/forecast/4e8889fd44301fd828bca4bb84ca0d4e/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const {temperature, summary, icon} = data.currently;
          // set DOM elements from the api
          temperatureDegree.textContent = temperature.toFixed(1);
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          //Formula for celcius
          let celcius = (temperature - 32) * (5 / 9);

          //Set icon
          setIcons(icon, document.querySelector('.icon'));

          //Change temperature farenheit/celsius
          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === 'F') {
              temperatureSpan.textContent = 'C';
              temperatureDegree.textContent = celcius.toFixed(1);
            } else {
              temperatureSpan.textContent = 'F';
              temperatureDegree.textContent = temperature.toFixed(1);
            }
          });
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ "color": "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    console.log(currentIcon);
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }

});
