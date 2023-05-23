import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navigation from "../navigation";
import { deleteCharacter } from "../../store";
import AddCharacter from "../add/addCharacter";
import { routes } from "../../routes/Routes";

function CharactersList({ list, infoDetails, setInfoDetails }) {
  const [addOpen, setAddOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdd = () => {
    !addOpen ? setAddOpen(true) : setAddOpen(false);
  };

  const handleDetails = (element) => {
    const newUrl = element.name.toLowerCase().replace(" ", "-");
    //Checking is character selected to show details saved as an object with all needed keys and values in
    //localStorage array (using key `mass` to check it) or we need to fetch character details from api
    if (element?.mass) {
      //Will be true only if selected character was manually added or edited by user
      //otherwise this object wouldn't have key `mass`
      setInfoDetails(element);
    } else
      fetch(`https://www.swapi.tech/api/people/${element.uid}`)
        .then((res) => res.json())
        .then((res) => {
          setInfoDetails({ ...res.result.properties, uid: element.uid });
        })
        .catch((err) => console.log(err));
    navigate(`${routes.characters}/${newUrl}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteCharacter(id));
  };

  const mappedCharacters = list.map((el, i) => (
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

  if (!mappedCharacters[0])
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
          <h2>Characters:</h2>
          <button onClick={handleAdd}>+ Add Character</button>
        </div>
        {addOpen && <AddCharacter setAddOpen={setAddOpen} />}
        {mappedCharacters}
      </div>
    );
}

export default CharactersList;
