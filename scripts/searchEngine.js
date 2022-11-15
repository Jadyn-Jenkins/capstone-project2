import { nationalParksArray } from "./nationalParkData.js";
import { locationsArray } from "./locationData.js";
import { parkTypesArray } from "./parkTypeData.js";

// Radios variables
const locationRadio = document.querySelector("#locationRadio"),
allRadio = document.querySelector("#allRadio");

// Select variabels
const locationSelect = document.querySelector("#locationSelect"),
parkTypeSelect = document.querySelector("#parkTypeSelect");

// Table variables
const resultsTable = document.querySelector("#resultsTable");

//Button variables
const searchBtn = document.querySelector("#searchBtn");

// Fieldset Variables
const radioFS = document.querySelector("#radioFS"),
locationFS = document.querySelector("#locationFS");

// populate each select options
window.onload = () => {
  popOptions(locationsArray, locationSelect);
  popOptions(parkTypesArray, parkTypeSelect);
};

// Finds which radio button is checked and opens appropriate field set, while hidding innaprpriote fieldset.
radioFS.onchange = () => {
  allRadio.checked ? (locationFS.hidden = true) : (locationFS.hidden = false);
  locationRadio.checked ? (locationFS.hidden = false) : (locationFS.hidden = true);
};

// array variable
let filteredArr = [];

//calculate and display filtered results
searchBtn.onclick = () => {
  // Reset results html and filtered Results
  resultsTable.innerHTML = "";
  filteredArr = [];

  filteredArr = useFilter();
  showResults(filteredArr);
};

// TEST FOR NOW
let testArr = [];
for (let i = 0; i < 3; i++) {
  testArr.push(nationalParksArray[i]);
}

function showResults(arr) {
  resultsTable.innerHTML = arr.map((arrItem) => "<tr>" + displayTableData(arrItem) + "</tr>", " ").join("");
}

function useFilter() {
  let parkType = parkTypeSelect.value;
  let location = locationSelect.value;

  filteredArr = [];

  if (parkType != "default" && location == "default") {
    return filteredArr = nationalParksArray.filter((arrItem) => arrItem.LocationName.includes(parkType));
  } else if (parkType == "default" && location != "default") {
    return filteredArr = nationalParksArray.filter((arrItem) => arrItem.State == location);
  } else if (parkType == "default" && location == "default") {
    return nationalParksArray;
  } else if (parkType != "default" && location != "default") {
    return filteredArr = nationalParksArray.filter((arrItem) => arrItem.LocationName.includes(parkType) && arrItem.State == location);
  } else {
    console.log('Error with search requirements')
  }
}
function displayTableData(arrItem) {
  return (
    `<td> ${arrItem.LocationID} </td>` +
    `<td> ${arrItem.LocationName} </td>` +
    `<td> ${arrItem.Address} </td>` +
    `<td> ${arrItem.City} </td>` +
    `<td> ${arrItem.State} </td>` +
    `<td> ${arrItem.ZipCode} </td>` +
    `<td> ${arrItem.Phone} </td>` +
    `<td> ${arrItem.Fax} </td>`
  );
}

function popOptions(arr, selectMenu) {
  selectMenu.innerHTML += arr.map((arrItem) => "<option>" + arrItem + "</option>");
}
