import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/Routes";
import { editVehicle, editStarship } from "../../store";
import Navigation from "../navigation";
import loadingGif from "../../img/loadingGif.gif";

function StarshipVehicleDetails({ category, infoDetails, setInfoDetails }) {
  const [editOpen, setEditOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Scrolling to top of the page
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const handleBack = () => {
    category === `vehicle`
      ? navigate(routes.vehicles)
      : navigate(routes.starships);
  };

  const handleEdit = () => {
    editOpen ? setEditOpen(false) : setEditOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const editedItem = {
      name: formData.get("name") || infoDetails.name,
      model: formData.get("model") || infoDetails.model,
      manufacturer: formData.get("manufacturer") || infoDetails.manufacturer,
      passengers: formData.get("passengers") || infoDetails.passengers,
      crew: formData.get("crew") || infoDetails.crew,
      uid: infoDetails.uid,
    };

    category === `vehicle`
      ? dispatch(editVehicle(editedItem))
      : dispatch(editStarship(editedItem));
    setInfoDetails(editedItem);
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
            <span className="detailsDes">Model:</span> {infoDetails.model}
          </div>
          <div>
            <span className="detailsDes">Manufacturer:</span>{" "}
            {infoDetails.manufacturer}
          </div>
          <div>
            <span className="detailsDes">Crew:</span> {infoDetails.crew}
          </div>
          <div>
            <span className="detailsDes">Passengers:</span>{" "}
            {infoDetails.passengers}
          </div>
          {editOpen ? (
            <div className="editingBox">
              <div>Editing {category}:</div>
              <form className="editingForm" onSubmit={handleSubmit}>
                Name:{" "}
                <input
                  name="name"
                  type="text"
                  minLength="1"
                  maxLength="30"
                  placeholder={infoDetails.name}
                ></input>
                Model:{" "}
                <input
                  name="model"
                  type="text"
                  minLength="1"
                  maxLength="30"
                  placeholder={infoDetails.model}
                ></input>
                Manufacturer:{" "}
                <input
                  name="manufacturer"
                  type="text"
                  minLength="1"
                  maxLength="30"
                  placeholder={infoDetails.manufacturer}
                ></input>
                Crew:{" "}
                <input
                  name="crew"
                  type="text"
                  minLength="1"
                  maxLength="30"
                  placeholder={infoDetails.crew}
                ></input>
                Passengers:{" "}
                <input
                  name="passengers"
                  type="text"
                  minLength="1"
                  maxLength="30"
                  placeholder={infoDetails.passengers}
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

export default StarshipVehicleDetails;
