import { mountainsArray } from "./mountainData.js";

// --------------------VARIABLES------------------------

const mountainSelect = document.querySelector("#mountainSelect"), 
results = document.querySelector("#results");

let sunsetInput, sunriseInput;

let match = [];

// --------------------EVENTS------------------------

window.onload = () => {
  popOptions(mountainsArray, mountainSelect);
};

mountainSelect.onchange = () => {
  match = mountainsArray.filter((arrItem) =>
    arrItem.name.includes(mountainSelect.value)
  );
  showResults(match);
  displaySunSetAndSunRise(match[0]);
  setTimeout(() => {
      
      window.scrollTo(0, document.body.scrollHeight)
    }, 100);
};

// --------------------FUNCTIONS------------------------

function showResults(arr) {
  console.log(results)

  results.innerHTML = arr.map((arrItem) => {
      return `<div id="card" class="card shadow p-3 mb-5 bg-white rounded">` +
        showImg(arrItem) +
        `<div class="card-body">` +
        `<h4 class="card-title">${arrItem.name}</h4>` +
        `<p class="card-text">${arrItem.desc}</p>` +
        `</div> </div>` +
        
        // CREATING SUNRISE CARD
        `<div id="card" class="card shadow p-3 mb-5 bg-white rounded">` +
        `<img src="/assets/images/sunRise.png" alt="Sun Rise">` +
        `<div class="card-body">` +
        `<h4 class="card-title">Sun Rise</h4>` +
        `<p class="card-text">Today at <output id="sunrise"></output>, the sun will rise at ${arrItem.name}</p>` +
        `</div> </div>` +

        // CREATING SUNSET CARD
        `<div id="card" class="card shadow p-3 mb-5 bg-white rounded">` +
        `<img src="/assets/images/sunSet.png" alt="Sun Set">` +
        `<div class="card-body">` +
        `<h4 class="card-title">Sun Set</h4>` +
        `<p class="card-text">Today at <output id="sunset"></output>, the sun will set at ${arrItem.name}</p>` +
        `</div> </div>`;
        
    })
    .join("");
}

function showImg(arrItem) {
  return `<img class="card-img" src="/assets/images/${arrItem.img}">`;
}

/* promise resource #1 is :
https://dmitripavlutin.com/what-is-javascript-promise/  
and example with fetch is here :
https://medium.com/@armando_amador/how-to-make-http-requests-using-fetch-api-and-promises-b0ca7370a444
 */

function displaySunSetAndSunRise(arrItem) {
  let sunDates = getSunsetFromAPI(arrItem.coords.lat, arrItem.coords.lng);

  sunsetInput = document.querySelector("#sunset"); 
  sunriseInput = document.querySelector("#sunrise");

  sunDates.then((data) => {
    sunriseInput.innerText = data.results.sunrise;
    sunsetInput.innerText = data.results.sunset;
  });
}
// function that can "fetch" the sunrise/sunset times
async function getSunsetFromAPI(lat, lng) {
  let response = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`
  );
  let data = await response.json();
  return data;
}

function popOptions(arr, selectMenu) {
  selectMenu.innerHTML += arr
    .map((arrItem) => "<option>" + arrItem.name + "</option>")
    .join("");
}
