import { nationalParksArray } from "./nationalParkData.js";
import { locationsArray } from "./locationData.js";
import { parkTypesArray } from "./parkTypeData.js";

// --------------------VARIABLES------------------------

// Div Variables
const resultContainer = document.querySelector("#resultContainer")

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

// ETC Variables
let noResultMsg = document.querySelector("#noResultMsg");
let filteredArr = [];


// --------------------EVENTS------------------------

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

searchBtn.onclick = () => {
  // Reset results html and filtered Results
  resetResults()
  
  //Grab filtered results and display results on HTML
  filteredArr = useFilter();
  filteredArr.length > 0? showResults(filteredArr) : foundNoMatch();
};

locationSelect.onclick = () => {
  hideResultsTable();
  resetResults();
}

parkTypeSelect.onclick = () => {
  hideResultsTable();
  resetResults();
}

allRadio.onclick = () => {
  resetResults();
  showResults(nationalParksArray);
};

locationRadio.onclick = () => {
  resetResults();
  hideResultsTable();
};

// --------------------FUNCTIONS------------------------

function resetResults(){
  resultsTable.innerHTML = "";
  filteredArr = [];
  location.hash = '';
  window.scrollTo(0, document.body.scrollHeight);
}

function hideResultsTable() {
  resultContainer.hidden = true;
}

function revealResultsTable() {
  resultContainer.hidden = false;
}

function showResults(arr) {
  revealResultsTable();
  location.hash = "searchScreenPos";

  resultsTable.innerHTML = arr.map((arrItem) => "<tr>" + displayTableData(arrItem) + displayLink(arrItem) + "</tr>").join("");
}

function useFilter() {
  let parkType = parkTypeSelect.value.toLowerCase();
  let location = locationSelect.value.toLowerCase();

  let parkCheck, locationCheck;

  resetResults();

  if (parkType != "default" && location == "default") {

    return filteredArr = nationalParksArray.filter((arrItem) => {
      parkCheck = arrItem.LocationName.toLowerCase();

      return parkCheck.includes(parkType);
    });

  } else if (parkType == "default" && location != "default") {

    return filteredArr = nationalParksArray.filter((arrItem) => {
      locationCheck = arrItem.State.toLowerCase();

      return locationCheck == location
    });

  } else if (parkType == "default" && location == "default") {

    return nationalParksArray;

  } else if (parkType != "default" && location != "default") {

    return filteredArr = nationalParksArray.filter((arrItem) => {
      parkCheck = arrItem.LocationName.toLowerCase();
      locationCheck = arrItem.State.toLowerCase();

      return parkCheck.includes(parkType) && locationCheck == location
    });

  } else {
    alert('Error with search requirements');
  }
}

function foundNoMatch() {
  hideResultsTable();
  
  noResultMsg.hidden = false;
  setTimeout(() => noResultMsg.hidden = true, 2500);
}

function displayTableData(arrItem) {
  
  return (
    `<td> ${checkForValue(arrItem.LocationID.toUpperCase())} </td>` +
    `<td> ${checkForValue(arrItem.LocationName)} </td>` +
    `<td> ${checkForValue(arrItem.Address)} </td>` +
    `<td> ${checkForValue(arrItem.City)} </td>` +
    `<td> ${checkForValue(arrItem.State)} </td>` +
    `<td> ${checkForValue(arrItem.ZipCode)} </td>` +
    `<td> ${checkForValue(arrItem.Phone)} </td>` +
    `<td> ${checkForValue(arrItem.Fax)} </td>`
  );
}

function checkForValue(val){
  if (val) return val;
  else return 'none';
}

function displayLink(arrItem){
  
  if(arrItem.Visit) return `<td><a href="${arrItem.Visit}" target="_blank"> Visit Homepage </a></td>`
  else return `<td> none </td>`;
}

function popOptions(arr, selectMenu) {
  selectMenu.innerHTML += arr.map((arrItem) => "<option>" + arrItem + "</option>");
}