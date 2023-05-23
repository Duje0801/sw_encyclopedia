import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navigation from "../navigation";
import { deleteStarship, deleteVehicle } from "../../store";
import AddStarshipVehicle from "../add/addStarshipVehicle";
import { routes } from "../../routes/Routes";

//I used same file for two categories (vehicles and starships)
//because they have same keys in ther objects

function VehiclesStarshipsList({
  list,
  infoDetails,
  setInfoDetails,
  category,
}) {
  const [addOpen, setAddOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdd = () => {
    !addOpen ? setAddOpen(true) : setAddOpen(false);
  };

  const handleDetails = (element) => {
    const newUrl = element.name.toLowerCase().replace(" ", "-");
    //Checking is vehicle/starship selected to show details saved as an object with all needed keys and values in
    //localStorage array (using key `model` to check it) or we need to fetch character details from api
    if (element?.model) {
      //Will be true only if selected vehicle/starship was manually added or edited by user
      //otherwise this object wouldn't have key `model`
      setInfoDetails(element);
    } else
      fetch(`https://www.swapi.tech/api/${category}s/${element.uid}`)
        .then((res) => res.json())
        .then((res) => {
          setInfoDetails({ ...res.result.properties, uid: element.uid });
        })
        .catch((err) => console.log(err));
    category === `vehicle`
      ? navigate(`${routes.vehicles}/${newUrl}`)
      : navigate(`${routes.starships}/${newUrl}`);
  };

  const handleDelete = (id) => {
    category === `vehicle`
      ? dispatch(deleteVehicle(id))
      : dispatch(deleteStarship(id));
  };

  const mapping = list.map((el, i) => (
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

  if (!mapping[0])
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
          <h2>{category === `vehicle` ? `Vehicles` : `Starships`}</h2>
          <button onClick={handleAdd}>
            {category === `vehicle` ? `+ Add Vehicle` : `+ Add Starship`}
          </button>
        </div>
        {addOpen && (
          <AddStarshipVehicle setAddOpen={setAddOpen} category={category} />
        )}
        {mapping}
      </div>
    );
}

export default VehiclesStarshipsList;
