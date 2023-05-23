import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes/Routes";
import {
  fetchCharacters,
  fetchPlanets,
  fetchFilms,
  fetchSpecies,
  fetchStarships,
  fetchVehicles,
} from "./store";
import Home from "./components/lists/Home"
import CharactersList from "./components/lists/CharactersList";
import PlanetsList from "./components/lists/PlanetsList";
import FilmsList from "./components/lists/FilmsList";
import SpeciesList from "./components/lists/SpeciesList";
import VehiclesStarshipsList from "./components/lists/VehiclesStarshipsList";
import CharacterDetails from "./components/details/characterDetails";
import FilmDetails from "./components/details/filmDetails";
import PlanetDetails from "./components/details/planetDetails";
import SpecieDetail from "./components/details/speciesDetails";
import StarshipVehicleDetails from "./components/details/starshipVehicleDetails";

function App() {
  //In infoDetails state is saved object for showing details
  const [infoDetails, setInfoDetails] = useState(null);

  //Getting all lists (people, planets etc.) from Redux store
  const lists = useSelector((lists) => lists);
  const dispatch = useDispatch();

  //Fetching initial data for Redux on page opening
  useEffect(() => {
    dispatch(fetchCharacters());
    dispatch(fetchFilms());
    dispatch(fetchPlanets());
    dispatch(fetchSpecies());
    dispatch(fetchStarships());
    dispatch(fetchVehicles());
  }, []);

  const router = createBrowserRouter([
    { path: routes.home, element: <Home /> },
    {
      path: routes.characters,
      element: (
        <CharactersList
          list={lists.characters}
          infoDetails={infoDetails}
          setInfoDetails={setInfoDetails}
        />
      ),
    },
    {
      path: routes.planets,
      element: (
        <PlanetsList
          list={lists.planets}
          infoDetails={infoDetails}
          setInfoDetails={setInfoDetails}
        />
      ),
    },
    {
      path: routes.films,
      element: <FilmsList list={lists.films} setInfoDetails={setInfoDetails} />,
    },
    {
      path: routes.species,
      element: (
        <SpeciesList
          list={lists.species}
          infoDetails={infoDetails}
          setInfoDetails={setInfoDetails}
        />
      ),
    },
    {
      path: routes.starships,
      element: (
        <VehiclesStarshipsList
          list={lists.starships}
          infoDetails={infoDetails}
          setInfoDetails={setInfoDetails}
          category={`starship`}
        />
      ),
    },
    {
      path: routes.vehicles,
      element: (
        <VehiclesStarshipsList
          list={lists.vehicles}
          infoDetails={infoDetails}
          setInfoDetails={setInfoDetails}
          category={`vehicle`}
        />
      ),
    },
    {
      path: routes.characters + "/:id",
      element: (
        <CharacterDetails
          infoDetails={infoDetails}
          setInfoDetails={setInfoDetails}
        />
      ),
    },
    {
      path: routes.films + "/:id",
      element: (
        <FilmDetails
          infoDetails={infoDetails}
          setInfoDetails={setInfoDetails}
        />
      ),
    },
    {
      path: routes.planets + "/:id",
      element: (
        <PlanetDetails
          infoDetails={infoDetails}
          setInfoDetails={setInfoDetails}
        />
      ),
    },
    {
      path: routes.species + "/:id",
      element: (
        <SpecieDetail
          infoDetails={infoDetails}
          setInfoDetails={setInfoDetails}
        />
      ),
    },
    {
      path: routes.vehicles + "/:id",
      element: (
        <StarshipVehicleDetails
          category={`vehicle`}
          infoDetails={infoDetails}
          setInfoDetails={setInfoDetails}
        />
      ),
    },
    {
      path: routes.starships + "/:id",
      element: (
        <StarshipVehicleDetails
          category={`starship`}
          infoDetails={infoDetails}
          setInfoDetails={setInfoDetails}
        />
      ),
    },
  ]);

  return (
    <div>
      <div className="title">Star Wars Encyclopedia</div>
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
