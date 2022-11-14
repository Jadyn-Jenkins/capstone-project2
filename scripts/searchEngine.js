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
const searchBtn = document.querySelector('#searchBtn');

// Fieldset Variables
const radioFS = document.querySelector("#radioFS"),
 locationFS = document.querySelector("#locationFS");

// populate each select options
window.onload = () => {
    locationsArray.forEach(popOptions());
    parkTypesArray.forEach(popOptions())
}

// Finds which radio button is checked and opens appropriate field set, while hidding innaprpriote fieldset.
radioFS.onchange = () => {
    allRadio.checked? locationFS.hidden = true: locationFS.hidden = false;
    locationRadio.checked? (locationFS.hidden = false): (locationFS.hidden = true);
};

// TEST FOR NOW
let testArr = [];
for (let i = 0; i < 3; i++) {
    testArr.push(nationalParksArray[i]);
}



function showResults(arr) {
 resultsTable.innerHTML = arr.map((arrItem) => "<tr>" + displayTableData(arrItem) + "</tr>",  " ").join("");
}

function displayTableData(arrItem) {
 return   `<td> ${arrItem.LocationID} </td>` +
 `<td> ${arrItem.LocationName} </td>` + 
 `<td> ${arrItem.Address} </td>` +
 `<td> ${arrItem.City} </td>` +
 `<td> ${arrItem.State} </td>` +
 `<td> ${arrItem.Zipcode} </td>` +
 `<td> ${arrItem.Phone} </td>` +
 `<td> ${arrItem.Fax} </td>`;
}

function popOptions(arrItem){
    //START HERE NEXT
}