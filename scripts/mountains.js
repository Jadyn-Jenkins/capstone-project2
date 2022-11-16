import { mountainsArray } from "./mountainData.js";

// --------------------VARIABLES------------------------

const mountainSelect = document.querySelector("#mountainSelect"),
results = document.querySelector("#results");

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
};

// --------------------FUNCTIONS------------------------

function showResults(arr) {
  results.innerHTML = arr
    .map(
      (arrItem) =>
        `<div class="card shadow p-3 mb-5 bg-white rounded">` +
        showImg(arrItem) +
        `<div class="card-body">` +
        `<h4 class="card-title">${arrItem.name}</h4>` +
        `<p class="card-text">${arrItem.desc}</p>` +
        `</div> </div>`
    )
    .join("");
}

function showImg(arrItem) {
  return `<img class="card-img" src="/assets/images/${arrItem.img}"> </img>`;
}

function popOptions(arr, selectMenu) {
  selectMenu.innerHTML += arr.map(
    (arrItem) => "<option>" + arrItem.name + "</option>"
  );
}