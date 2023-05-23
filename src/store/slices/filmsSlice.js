import { createSlice, current } from "@reduxjs/toolkit";
import Fetching from "../logic/fetching";

const fetchFilms = Fetching(`fetchFilms`, `films`);

const filmsSlice = createSlice({
  name: `films`,
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchFilms.fulfilled, (state, action) => {
      return action.payload;
    });
  },
  reducers: {
    deleteFilm(state, action) {
      const currentState = current(state);
      const newState = currentState.filter((c) => {
        console.log(c, action.payload);
        if (c.uid != action.payload) return c;
        else return;
      });
      localStorage.setItem("filmsList", JSON.stringify(newState));
      return newState;
    },
    addFilm(state, action) {
      const currentState = current(state);
      const newState = [...currentState, action.payload];
      localStorage.setItem("filmsList", JSON.stringify(newState));
      return newState;
    },
    editFilm(state, action) {
      const currentState = current(state);
      const newState = currentState.map((film) => {
        if (film.uid !== action.payload.uid) return film;
        else return action.payload;
      });
      localStorage.setItem("filmsList", JSON.stringify(newState));
      return newState;
    },
  },
});

export { filmsSlice };
export { fetchFilms };
export const { deleteFilm, addFilm, editFilm } = filmsSlice.actions;
