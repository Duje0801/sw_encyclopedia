import { createAsyncThunk } from "@reduxjs/toolkit";

function Fetching(fetchName, category) {
  return createAsyncThunk(`${fetchName}`, async () => {
    //Checking does list array exists in local storage
    const checkLocalStorage = JSON.parse(
      localStorage.getItem(`${category}List`)
    );
    if (checkLocalStorage) return checkLocalStorage;

    //Getting number of elements in each array (people, planets ets.)
    let number = 0;
    const respNumber = await fetch(`https://www.swapi.tech/api/${category}`);
    const respNumberJson = await respNumber.json();
    //Films have different keys in object than other categories
    if (category !== `films`) number = respNumberJson.total_records;
    else number = respNumberJson.result.length;

    //Fetching all possible elements in category one fetch
    const fetchingAll = await fetch(
      `https://www.swapi.tech/api/${category}?page=1&limit=${number}`
    );
    const fetchingAllJson = await fetchingAll.json();

    //Saving arrays to Local storage and returning to Redux
    if (category !== `films`) {
      localStorage.setItem(
        `${category}List`,
        JSON.stringify(fetchingAllJson.results)
      );
      return fetchingAllJson.results;
    } else {
      localStorage.setItem(
        `${category}List`,
        JSON.stringify(fetchingAllJson.result)
      );
      return fetchingAllJson.result;
    }
  });
}

export default Fetching;
