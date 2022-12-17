// Openweathermap API. Do not share it publicly.
const api = config.WEATHER_API_KEY;
const newsApi = config.NEWS_API_KEY;

const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');


const container = document.getElementById('news-container');


window.addEventListener('load', () => {
  let long;
  let lat;
  // Accesing Geolocation of User
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // Storing Longitude and Latitude in variables
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;

      // Using fetch to get data
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp } = data.main;
          const place = data.name;
          const { description, icon } = data.weather[0];
          const { sunrise, sunset } = data.sys;

          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          const fahrenheit = (temp * 9) / 5 + 32;

          // Converting Epoch(Unix) time to GMT
          const sunriseGMT = new Date(sunrise * 1000);
          const sunsetGMT = new Date(sunset * 1000);

          // Interacting with DOM to show data
          iconImg.src = iconUrl;
          loc.textContent = `${place}`;
          desc.textContent = `${description}`;
          tempC.textContent = `${temp.toFixed(2)} °C`;
          tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
          sunriseDOM.textContent = `${sunriseGMT.toLocaleTimeString()}`;
          sunsetDOM.textContent = `${sunsetGMT.toLocaleTimeString()}`;
        });
    });
  }
});

window.addEventListener('load', () => {

  // Accesing Geolocation of User
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // Storing Longitude and Latitude in variables
      const base = `https://newsapi.org/v2/everything?q=Apple&from=2022-12-13&sortBy=popularity&apiKey=${newsApi}`;

      // Using fetch to get data
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data)
          for (const key in data['articles']) {
            console.log(data['articles'][key])
            const card = document.createElement('div');
            card.classList = 'card-body';
          
            // Construct card content
            const content = `
              <div class="card">
              <div class="card-header" id="heading-${key}">
                <h5 class="mb-0">
                  <button class="btn btn-link" data-toggle="collapse" data-target="#collapse-${key}" aria-expanded="true" aria-controls="collapse-${key}">
          
                          </button>
                </h5>
              </div>
          
              <div id="collapse-${key}" class="collapse show" aria-labelledby="heading-${key}" data-parent="#accordion">
                <div class="card-body">
          
                  <h5>${data['articles'][key]['title']}</h5>
                  <p>${data['articles'][key]['description']}</p>
                  ...
                </div>
              </div>
            </div>
            `;
          
            // Append newyly created card element to the container
            container.innerHTML += content;
            }
        });
    });
  }
});

//Navbar
let hamMenuIcon = document.getElementById("ham-menu");
let navBar = document.getElementById("nav-bar");
let navLinks = navBar.querySelectorAll("li");

hamMenuIcon.addEventListener("click", () => {
  navBar.classList.toggle("active");
  hamMenuIcon.classList.toggle("fa-times");
});
navLinks.forEach((navLinks) => {
  navLinks.addEventListener("click", () => {
    navBar.classList.remove("active");
    hamMenuIcon.classList.toggle("fa-times");
  });
});