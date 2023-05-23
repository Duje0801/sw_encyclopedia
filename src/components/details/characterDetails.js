import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/Routes";
import { editCharacter } from "../../store";
import Navigation from "../navigation";
import loadingGif from "../../img/loadingGif.gif";

function CharacterDetails({ infoDetails, setInfoDetails }) {
  const [editOpen, setEditOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Scrolling to top of the page
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const handleBack = () => {
    navigate(routes.characters);
  };

  const handleEdit = () => {
    editOpen ? setEditOpen(false) : setEditOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const editedCharacter = {
      name: formData.get("name") || infoDetails.name,
      height: formData.get("height") || infoDetails.height,
      mass: formData.get("mass") || infoDetails.mass,
      hair_color: formData.get("hair_color") || infoDetails.hair_color,
      skin_color: formData.get("skin_color") || infoDetails.skin_color,
      eye_color: formData.get("eye_color") || infoDetails.eye_color,
      birth_year: formData.get("birth_year") || infoDetails.birth_year,
      uid: infoDetails.uid,
    };

    dispatch(editCharacter(editedCharacter));
    setInfoDetails(editedCharacter);
    setEditOpen(false);
  };

  if (!infoDetails)
    return (
      <div>
        {" "}
        <Navigation />
        <div className="loading">
          <div>Loading...</div>
          <img src={loadingGif} alt="loading-image"></img>
        </div>
      </div>
    );
  else
    return (
      <>
        <Navigation />
        <div className="detailsOpen">
          <div>
            <span className="detailsDes">Name:</span> {infoDetails.name}
          </div>
          <div>
            <span className="detailsDes">Height:</span> {infoDetails.height} cm
          </div>
          <div>
            <span className="detailsDes">Mass:</span> {infoDetails.mass} kg
          </div>
          <div>
            <span className="detailsDes">Hair color:</span>{" "}
            {infoDetails.hair_color}
          </div>
          <div>
            <span className="detailsDes">Skin color:</span>{" "}
            {infoDetails.skin_color}
          </div>
          <div>
            <span className="detailsDes">Eye color:</span>{" "}
            {infoDetails.eye_color}
          </div>
          <div>
            <span className="detailsDes">Birth year:</span>{" "}
            {infoDetails.birth_year}
          </div>
          {editOpen ? (
            <div className="editingBox">
              <div>Editing character:</div>
              <form className="editingForm" onSubmit={handleSubmit}>
                Name:{" "}
                <input
                  name="name"
                  type="text"
                  minLength="1"
                  maxLength="30"
                  placeholder={infoDetails.name}
                ></input>
                Height:{" "}
                <input
                  name="height"
                  type="number"
                  min="1"
                  max="99999"
                  placeholder={infoDetails.height}
                ></input>
                Mass:{" "}
                <input
                  name="mass"
                  type="number"
                  min="1"
                  max="99999"
                  placeholder={infoDetails.mass}
                ></input>
                Hair color:{" "}
                <input
                  name="hair_color"
                  type="text"
                  minLength="1"
                  maxLength="30"
                  placeholder={infoDetails.hair_color}
                ></input>
                Skin color:{" "}
                <input
                  name="skin_color"
                  type="text"
                  minLength="1"
                  maxLength="30"
                  placeholder={infoDetails.skin_color}
                ></input>
                Eye color:{" "}
                <input
                  name="eye_color"
                  type="text"
                  minLength="1"
                  maxLength="30"
                  placeholder={infoDetails.eye_color}
                ></input>
                Birth year:{" "}
                <input
                  name="birth_year"
                  type="text"
                  minLength="1"
                  maxLength="30"
                  placeholder={infoDetails.birth_year}
                ></input>
                <button type="submit">Submit</button>
                <button onClick={handleEdit}>Close</button>
              </form>
            </div>
          ) : null}
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleBack}>Back</button>
        </div>
      </>
    );
}

export default CharacterDetails;
