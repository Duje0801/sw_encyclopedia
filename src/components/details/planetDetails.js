import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/Routes";
import { editPlanet } from "../../store";
import Navigation from "../navigation";
import loadingGif from "../../img/loadingGif.gif";

function PlanetDetails({ infoDetails, setInfoDetails }) {
  const [editOpen, setEditOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Scrolling to top of the page
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const handleBack = () => {
    navigate(routes.planets);
  };

  const handleEdit = () => {
    editOpen ? setEditOpen(false) : setEditOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const editedPlanet = {
      name: formData.get("name") || infoDetails.name,
      population: formData.get("population") || infoDetails.population,
      diameter: formData.get("diameter") || infoDetails.diameter,
      climate: formData.get("climate") || infoDetails.climate,
      terrain: formData.get("terrain") || infoDetails.terrain,
      gravity: formData.get("gravity") || infoDetails.gravity,
      uid: infoDetails.uid,
    };

    dispatch(editPlanet(editedPlanet));
    setInfoDetails(editedPlanet);
    setEditOpen(false);
  };

  if (!infoDetails)
    return (
      <div>
        {" "}
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
            <span className="detailsDes">Population:</span>{" "}
            {infoDetails.population}
          </div>
          <div>
            <span className="detailsDes">Diameter:</span> {infoDetails.diameter}{" "}
            km
          </div>
          <div>
            <span className="detailsDes">Terrain:</span> {infoDetails.terrain}
          </div>
          <div>
            <span className="detailsDes">Climate:</span> {infoDetails.climate}
          </div>
          <div>
            <span className="detailsDes">Gravity:</span> {infoDetails.gravity}
          </div>
          {editOpen ? (
            <div className="editingBox">
              <div>Editing planet:</div>
              <form className="editingForm" onSubmit={handleSubmit}>
                Name:{" "}
                <input
                  name="name"
                  type="text"
                  minLength="1"
                  maxLength="30"
                  placeholder={infoDetails.name}
                ></input>
                Population:{" "}
                <input
                  name="population"
                  type="number"
                  min="1"
                  max="99999999999"
                  placeholder={infoDetails.population}
                ></input>
                Diameter:{" "}
                <input
                  name="diameter"
                  type="number"
                  min="1"
                  max="99999999999"
                  placeholder={infoDetails.diameter}
                ></input>
                Terrain:{" "}
                <input
                  name="terrain"
                  type="text"
                  minLength="1"
                  maxLength="30"
                  placeholder={infoDetails.terrain}
                ></input>
                Climate:{" "}
                <input
                  name="climate"
                  type="text"
                  minLength="1"
                  maxLength="30"
                  placeholder={infoDetails.climate}
                ></input>
                Gravity:{" "}
                <input
                  name="gravity"
                  type="text"
                  minLength="1"
                  maxLength="30"
                  placeholder={infoDetails.gravity}
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

export default PlanetDetails;
