import { createSlice, current } from "@reduxjs/toolkit";
import Fetching from "../logic/fetching";

const fetchStarships = Fetching(`fetchStarships`, `starships`);

const starshipsSlice = createSlice({
  name: `starships`,
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchStarships.fulfilled, (state, action) => {
      return action.payload;
    });
  },
  reducers: {
    deleteStarship(state, action) {
      const currentState = current(state);
      const newState = currentState.filter((c) => {
        if (c.uid !== action.payload) return c;
        else return;
      });
      localStorage.setItem("starshipsList", JSON.stringify(newState));
      return newState;
    },
    addStarship(state, action) {
      const currentState = current(state);
      const newState = [...currentState, action.payload];
      localStorage.setItem("starshipsList", JSON.stringify(newState));
      return newState;
    },
    editStarship(state, action) {
      const currentState = current(state);
      const newState = currentState.map((starship) => {
        if (starship.uid !== action.payload.uid) return starship;
        else return action.payload;
      });
      localStorage.setItem("starshipsList", JSON.stringify(newState));
      return newState;
    },
  },
});

export { starshipsSlice };
export { fetchStarships };
export const { deleteStarship, addStarship, editStarship } =
  starshipsSlice.actions;
