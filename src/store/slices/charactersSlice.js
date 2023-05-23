import { createSlice, current } from "@reduxjs/toolkit";
import Fetching from "../logic/fetching";

const fetchCharacters = Fetching(`fetchCharacters`, `people`);

const charactersSlice = createSlice({
  name: `characters`,
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      return action.payload;
    });
  },
  reducers: {
    deleteCharacter(state, action) {
      const currentState = current(state);
      const newState = currentState.filter((c) => {
        if (c.uid !== action.payload) return c;
        else return;
      });
      localStorage.setItem("peopleList", JSON.stringify(newState));
      return newState;
    },
    addCharacter(state, action) {
      const currentState = current(state);
      const newState = [...currentState, action.payload];
      localStorage.setItem("peopleList", JSON.stringify(newState));
      return newState;
    },
    editCharacter(state, action) {
      const currentState = current(state);
      const newState = currentState.map((char) => {
        if (char.uid !== action.payload.uid) return char;
        else return action.payload;
      });
      localStorage.setItem("peopleList", JSON.stringify(newState));
      return newState;
    },
  },
});

export { charactersSlice };
export { fetchCharacters };
export const {
  fetchingInitialState,
  deleteCharacter,
  addCharacter,
  editCharacter,
} = charactersSlice.actions;
