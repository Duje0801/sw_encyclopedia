import { createSlice, current } from "@reduxjs/toolkit";
import Fetching from "../logic/fetching";

const fetchPlanets = Fetching(`fetchPlanets`, `planets`);

const planetsSlice = createSlice({
  name: `planets`,
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchPlanets.fulfilled, (state, action) => {
      return action.payload;
    });
  },
  reducers: {
    deletePlanet(state, action) {
      const currentState = current(state);
      const newState = currentState.filter((planet) => {
        if (planet.uid !== action.payload) return planet;
        else return;
      });
      localStorage.setItem("planetsList", JSON.stringify(newState));
      return newState;
    },
    addPlanet(state, action) {
      const currentState = current(state);
      const newState = [...currentState, action.payload];
      localStorage.setItem("planetsList", JSON.stringify(newState));
      return newState;
    },
    editPlanet(state, action) {
      const currentState = current(state);
      const newState = currentState.map((planet) => {
        if (planet.uid !== action.payload.uid) return planet;
        else return action.payload;
      });
      localStorage.setItem("planetsList", JSON.stringify(newState));
      return newState;
    },
  },
});

export { planetsSlice };
export { fetchPlanets };
export const { deletePlanet, addPlanet, editPlanet } = planetsSlice.actions;
