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
  resultsTable.innerHTML = "";
  console.log(filteredArr);
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
  //   let filterType = "-0";
  //  let filterCounter = 0;

  let parkType = parkTypeSelect.value;
  let location = locationSelect.value;

  filteredArr = [];

  //START BY FIXING THIS IF STATEMENT. Third Else if works. need to test others. and arr var in display is coming back as one and I believe this is the issue.
  if (parkType != "default" && location == "default") {
    filteredArr.push(nationalParksArray.filter((arrItem) => arrItem.LocationName.includes(parkType)));
    console.log(filteredArr)
    return filteredArr;

  } else if (parkType == "default" && location != "default") {
    filteredArr.push(nationalParksArray.filter((arrItem) => arrItem.State == location));
    console.log(filteredArr)
    return filteredArr;

  } else if (parkType == "default" && location == "default") {
    console.log(nationalParksArray)
    return nationalParksArray;

  } else {
    filteredArr.push(nationalParksArray.filter((arrItem) => arrItem.LocationName.includes(parkType) && arrItem.State == location));
    console.log(filteredArr)
    return filteredArr;
  }

  /*   let parkTypeFiltered = [];
  let locationFiltered = [];
  let blendedFiltered = [];

  if (parkType != "default") {
    if (filterType == "-0") filterType = "park";
    filterCounter++;

  }

  if (location != "default") {
    if (filter == "-0") filterType = "location";
    filterCounter++;
  }

  if(filterCounter == 2) {

  }

  switch (filterCounter) {
    case 1:
      if (filterType == "park") return parkTypeFiltered; 
      if (filterType == "location") return locationFiltered; 
      break;

    case 2:
      break;

    default:
      return parkTypesArray;
      break;
  } */
}
function displayTableData(arrItem) {
  return (
    `<td> ${arrItem.LocationID} </td>` +
    `<td> ${arrItem.LocationName} </td>` +
    `<td> ${arrItem.Address} </td>` +
    `<td> ${arrItem.City} </td>` +
    `<td> ${arrItem.State} </td>` +
    `<td> ${arrItem.Zipcode} </td>` +
    `<td> ${arrItem.Phone} </td>` +
    `<td> ${arrItem.Fax} </td>`
  );
}

function popOptions(arr, selectMenu) {
  selectMenu.innerHTML += arr.map((arrItem) => "<option>" + arrItem + "</option>");
}
