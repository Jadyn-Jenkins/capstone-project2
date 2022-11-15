import { mountainsArray } from "./mountainData.js";

const mountainSelect = document.querySelector("#mountainSelect"),
  results = document.querySelector("#results");

let match = [];

window.onload = () => {
  popOptions(mountainsArray, mountainSelect);
};

mountainSelect.onchange = () => {
  match = mountainsArray.filter((arrItem) =>
    arrItem.name.includes(mountainSelect.value)
  );

  showResults(match);
};

function showResults(arr) {
  results.innerHTML = arr
    .map(
      (arrItem) =>
        `<div>` +
        showImg(arrItem) +
        `<div>` +
        `<h4>${arrItem.name}</h4>` +
        `<p>${arrItem.desc}</p>` +
        `</div> </div>`
    )
    .join("");
}

function showImg(arrItem) {
  return `<img src="/assets/images/${arrItem.img}"> </img>`;
}

function popOptions(arr, selectMenu) {
  selectMenu.innerHTML += arr.map(
    (arrItem) => "<option>" + arrItem.name + "</option>"
  );
}
