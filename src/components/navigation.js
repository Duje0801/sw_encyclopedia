import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";

function Navigation() {
  const navigation = useNavigate();

  const handleClick = (newRoute) => {
    if (newRoute === `home`) return navigation(routes.home);
    if (newRoute === `characters`) return navigation(routes.characters);
    if (newRoute === `planets`) return navigation(routes.planets);
    if (newRoute === `films`) return navigation(routes.films);
    if (newRoute === `species`) return navigation(routes.species);
    if (newRoute === `starships`) return navigation(routes.starships);
    if (newRoute === `vehicles`) return navigation(routes.vehicles);
  };

  return (
    <div className="navigation">
      <div onClick={() => handleClick(`home`)}>Home</div>
      <div onClick={() => handleClick(`characters`)}>Characters</div>
      <div onClick={() => handleClick(`planets`)}>Planets</div>
      <div onClick={() => handleClick(`films`)}>Films</div>
      <div onClick={() => handleClick(`species`)}>Species</div>
      <div onClick={() => handleClick(`starships`)}>Starships</div>
      <div onClick={() => handleClick(`vehicles`)}>Vehicles</div>
    </div>
  );
}

export default Navigation;
