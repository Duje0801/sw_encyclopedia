import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navigation from "../navigation";
import { deletePlanet } from "../../store";
import AddPlanet from "../add/addPlanet";
import { routes } from "../../routes/Routes";

function PlanetsList({ list, infoDetails, setInfoDetails }) {
  const [addOpen, setAddOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdd = () => {
    !addOpen ? setAddOpen(true) : setAddOpen(false);
  };

  const handleDetails = (element) => {
    const newUrl = element.name.toLowerCase().replace(" ", "-");
    //Checking is planet selected to show details saved as an object with all needed keys and values in
    //localStorage array (using key `population` to check it) or we need to fetch character details from api
    if (element?.population) {
      //Will be true only if selected planet was manually added or edited by user
      //otherwise this object wouldn't have key `population`
      setInfoDetails(element);
    } else
      fetch(`https://www.swapi.tech/api/planets/${element.uid}`)
        .then((res) => res.json())
        .then((res) => {
          setInfoDetails({ ...res.result.properties, uid: element.uid });
        })
        .catch((err) => console.log(err));
    navigate(`${routes.planets}/${newUrl}`);
  };

  const handleDelete = (id) => {
    dispatch(deletePlanet(id));
  };

  const mappedPlanets = list.map((el, i) => (
    <div className="mappedBox" key={i}>
      <div className="titleMain">
        <div className="mappedTitle">{el.name || infoDetails.name}</div>
        <div className="titleMainDiv">
          <button onClick={() => handleDetails(el)}>Details</button>
          <button onClick={() => handleDelete(el.uid)}>Delete</button>
        </div>
      </div>
    </div>
  ));

  if (!mappedPlanets[0])
    return (
      <div>
        {" "}
        <Navigation />
        <div>Loading...</div>
      </div>
    );
  else
    return (
      <div className="main">
        <Navigation />
        <div className="titleMain">
          <h2>Planets:</h2>
          <button onClick={handleAdd}>+ Add Planet</button>
        </div>
        {addOpen && <AddPlanet setAddOpen={setAddOpen} />}
        {mappedPlanets}
      </div>
    );
}

export default PlanetsList;
