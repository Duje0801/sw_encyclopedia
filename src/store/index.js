import { configureStore } from "@reduxjs/toolkit";
import { charactersSlice } from "./slices/charactersSlice";
import { planetsSlice } from "./slices/planetsSlice";
import { filmsSlice } from "./slices/filmsSlice";
import { speciesSlice } from "./slices/speciesSlice";
import { starshipsSlice } from "./slices/starshipsSlice";
import { vehiclesSlice } from "./slices/vehiclesSlice";
import { fetchCharacters } from "./slices/charactersSlice";
import { fetchPlanets } from "./slices/planetsSlice";
import { fetchFilms } from "./slices/filmsSlice";
import { fetchSpecies } from "./slices/speciesSlice";
import { fetchStarships } from "./slices/starshipsSlice";
import { fetchVehicles } from "./slices/vehiclesSlice";
import {
  deleteCharacter,
  addCharacter,
  editCharacter,
} from "./slices/charactersSlice";
import { deletePlanet, addPlanet, editPlanet } from "./slices/planetsSlice";
import { deleteFilm, addFilm, editFilm } from "./slices/filmsSlice";
import { deleteSpecie, addSpecie, editSpecie } from "./slices/speciesSlice";
import {
  deleteStarship,
  addStarship,
  editStarship,
} from "./slices/starshipsSlice";
import { deleteVehicle, addVehicle, editVehicle } from "./slices/vehiclesSlice";

const store = configureStore({
  reducer: {
    characters: charactersSlice.reducer,
    planets: planetsSlice.reducer,
    films: filmsSlice.reducer,
    species: speciesSlice.reducer,
    starships: starshipsSlice.reducer,
    vehicles: vehiclesSlice.reducer,
  },
});

export {
  store,
  deleteCharacter,
  addCharacter,
  editCharacter,
  fetchCharacters,
  deletePlanet,
  addPlanet,
  editPlanet,
  fetchPlanets,
  deleteFilm,
  addFilm,
  editFilm,
  fetchFilms,
  deleteSpecie,
  addSpecie,
  editSpecie,
  fetchSpecies,
  deleteStarship,
  addStarship,
  editStarship,
  fetchStarships,
  deleteVehicle,
  addVehicle,
  editVehicle,
  fetchVehicles,
};
