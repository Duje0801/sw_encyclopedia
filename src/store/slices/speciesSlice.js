import { createSlice, current } from "@reduxjs/toolkit";
import Fetching from "../logic/fetching";

const fetchSpecies = Fetching(`fetchSpecies`, `species`);

const speciesSlice = createSlice({
  name: `species`,
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchSpecies.fulfilled, (state, action) => {
      return action.payload;
    });
  },
  reducers: {
    deleteSpecie(state, action) {
      const currentState = current(state);
      const newState = currentState.filter((c) => {
        if (c.uid !== action.payload) return c;
        else return;
      });
      localStorage.setItem("speciesList", JSON.stringify(newState));
      return newState;
    },
    addSpecie(state, action) {
      const currentState = current(state);
      const newState = [...currentState, action.payload];
      localStorage.setItem("speciesList", JSON.stringify(newState));
      return newState;
    },
    editSpecie(state, action) {
      const currentState = current(state);
      const newState = currentState.map((specie) => {
        if (specie.uid !== action.payload.uid) return specie;
        else return action.payload;
      });
      localStorage.setItem("speciesList", JSON.stringify(newState));
      return newState;
    },
  },
});

export { speciesSlice };
export { fetchSpecies };
export const { deleteSpecie, addSpecie, editSpecie } = speciesSlice.actions;
