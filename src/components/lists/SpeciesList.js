import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navigation from "../navigation";
import { deleteSpecie } from "../../store";
import AddSpecie from "../add/addSpecie"
import { routes } from "../../routes/Routes";

function SpeciesList({ list, infoDetails, setInfoDetails }) {
  const [addOpen, setAddOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdd = () => {
    !addOpen ? setAddOpen(true) : setAddOpen(false);
  };

  const handleDetails = (element) => {
    const newUrl = element.name.toLowerCase().replace(" ", "-");
    //Checking is specie selected to show details saved as an object with all needed keys and values in
    //localStorage array (using key `language` to check it) or we need to fetch character details from api
    if (element?.language) {
      //Will be true only if selected specie was manually added or edited by user
      //otherwise this object wouldn't have key `language`
      setInfoDetails(element);
    } else
      fetch(`https://www.swapi.tech/api/species/${element.uid}`)
        .then((res) => res.json())
        .then((res) => {
          setInfoDetails({ ...res.result.properties, uid: element.uid });
        })
        .catch((err) => console.log(err));
    navigate(`${routes.species}/${newUrl}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteSpecie(id));
  };

  const mappingSpecies = list.map((el, i) => (
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

  if (!mappingSpecies[0])
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
          <h2>Species:</h2>
          <button onClick={handleAdd}>+ Add Specie</button>
        </div>
        {addOpen && <AddSpecie setAddOpen={setAddOpen} />}
        {mappingSpecies}
      </div>
    );
}

export default SpeciesList;
