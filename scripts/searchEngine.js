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

// array variable
let filteredArr = [];

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

//calculate and display filtered results


searchBtn.onclick = () => {
  // Reset results html and filtered Results
  resetResults()
  filteredArr = [];

  //Grab filtered results and display results on HTML
  filteredArr = useFilter();
  showResults(filteredArr);
};

locationRadio.onclick = () => {
  resetResults()
}

allRadio.onclick = () => {
  resetResults()

  showResults(nationalParksArray);
}

function resetResults(){
  resultsTable.innerHTML = "";
}

function showResults(arr) {
  resultsTable.innerHTML = arr.map((arrItem) => "<tr>" + displayTableData(arrItem) + displayLink(arrItem) + "</tr>").join("");
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
    alert('Error with search requirements')
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

function displayLink(arrItem){
  if(arrItem.Visit) return `<td><a href="${arrItem.Visit}"> Visit Homepage </a></td>`;
}

function popOptions(arr, selectMenu) {
  selectMenu.innerHTML += arr.map((arrItem) => "<option>" + arrItem + "</option>");
}
