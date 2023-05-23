import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/Routes";
import { editSpecie } from "../../store";
import Navigation from "../navigation";
import loadingGif from "../../img/loadingGif.gif";

function SpecieDetail({ infoDetails, setInfoDetails }) {
  const [editOpen, setEditOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Scrolling to top of the page
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const handleBack = () => {
    navigate(routes.species);
  };

  const handleEdit = () => {
    editOpen ? setEditOpen(false) : setEditOpen(true);
  };

  const handleSubmit = (e, el) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const editedSpecie = {
      name: formData.get("name") || infoDetails.name,
      classification:
        formData.get("classification") || infoDetails.classification,
      language: formData.get("language") || infoDetails.language,
      average_lifespan:
        formData.get("average_lifespan") || infoDetails.average_lifespan,
      average_height:
        formData.get("average_height") || infoDetails.average_height,
      eye_colors: formData.get("eye_colors") || infoDetails.eye_colors,
      hair_colors: formData.get("hair_colors") || infoDetails.hair_colors,
      uid: infoDetails.uid,
    };

    dispatch(editSpecie(editedSpecie));
    setInfoDetails(editedSpecie);
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
            <span className="detailsDes">Classification:</span>{" "}
            {infoDetails.classification}
          </div>
          <div>
            <span className="detailsDes">Language:</span> {infoDetails.language}
          </div>
          <div>
            <span className="detailsDes">Average Height:</span>{" "}
            {infoDetails.average_height} cm
          </div>
          <div>
            <span className="detailsDes">Average Lifespan:</span>{" "}
            {infoDetails.average_lifespan} years
          </div>
          <div>
            <span className="detailsDes">Eye Colors:</span>{" "}
            {infoDetails.eye_colors}
          </div>
          <div>
            <span className="detailsDes">Hair Colors:</span>{" "}
            {infoDetails.hair_colors}
          </div>
          {editOpen ? (
            <div className="editingBox">
              <div>Editing specie:</div>
              <form className="editingForm" onSubmit={handleSubmit}>
                Name:{" "}
                <input
                  name="name"
                  type="text"
                  minLength="1"
                  maxLength="30"
                  placeholder={infoDetails.name}
                ></input>
                Classification:{" "}
                <input
                  name="classification"
                  type="text"
                  minLength="1"
                  maxLength="30"
                  placeholder={infoDetails.classification}
                ></input>
                Language:{" "}
                <input
                  name="language"
                  type="text"
                  minLength="1"
                  maxLength="30"
                  placeholder={infoDetails.language}
                ></input>
                Average Height:{" "}
                <input
                  name="average_height"
                  type="number"
                  min="1"
                  max="99999"
                  placeholder={infoDetails.average_height}
                ></input>
                Average Lifespan:{" "}
                <input
                  name="average_lifespan"
                  type="number"
                  min="1"
                  max="99999"
                  placeholder={infoDetails.average_lifespan}
                ></input>
                Eye Colors:{" "}
                <input
                  name="eye_colors"
                  type="text"
                  minLength="1"
                  maxLength="30"
                  placeholder={infoDetails.eye_colors}
                ></input>
                Hair Colors:{" "}
                <input
                  name="hair_colors"
                  type="text"
                  minLength="1"
                  maxLength="30"
                  placeholder={infoDetails.hair_colors}
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

export default SpecieDetail;
