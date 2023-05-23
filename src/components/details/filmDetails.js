import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/Routes";
import { editFilm } from "../../store";
import Navigation from "../navigation";
import loadingGif from "../../img/loadingGif.gif";

function FilmDetails({ infoDetails, setInfoDetails }) {
  const [editOpen, setEditOpen] = useState(false);

  const dateArray = infoDetails.release_date.split("-");
  const correctedDate = `${dateArray[2]}.${dateArray[1]}.${dateArray[0]}.`;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Scrolling to top of the page
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const handleBack = () => {
    navigate(routes.films);
  };

  const handleEdit = () => {
    editOpen ? setEditOpen(false) : setEditOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const editedFilm = {
      title: formData.get("title") || infoDetails.title,
      director: formData.get("director") || infoDetails.director,
      producer: formData.get("producer") || infoDetails.producer,
      release_date: formData.get("release_date") || dateArray,
      opening_crawl: formData.get("opening_crawl") || infoDetails.opening_crawl,
      uid: infoDetails.uid,
    };

    dispatch(editFilm(editedFilm));
    setInfoDetails(editedFilm);
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
            <span className="detailsDes">Title:</span> {infoDetails.title}
          </div>
          <div>
            <span className="detailsDes">Director:</span> {infoDetails.director}
          </div>
          <div>
            <span className="detailsDes">Producer:</span> {infoDetails.producer}
          </div>
          <div>
            <span className="detailsDes">Release Date:</span> {correctedDate}
          </div>
          <div>
            <span className="detailsDes">Opening Crawl:</span>{" "}
            {infoDetails.opening_crawl}
          </div>
          {editOpen ? (
            <div className="editingBox">
              <div>Editing character:</div>
              <form className="editingForm" onSubmit={handleSubmit}>
                Title:{" "}
                <input
                  name="title"
                  type="text"
                  minLength="1"
                  maxLength="30"
                  placeholder={infoDetails.title}
                ></input>
                Director:{" "}
                <input
                  name="director"
                  type="text"
                  minLength="1"
                  maxLength="30"
                  placeholder={infoDetails.director}
                ></input>
                Producer:{" "}
                <input
                  name="producer"
                  type="text"
                  minLength="1"
                  maxLength="30"
                  placeholder={infoDetails.producer}
                ></input>
                Release Date:{" "}
                <input
                  name="release_date"
                  type="date"
                  placeholder={infoDetails.release_date}
                ></input>
                Opening Crawl:{" "}
                <input
                  name="opening_crawl"
                  type="text"
                  minLength="1"
                  maxLength="300"
                  placeholder={infoDetails.opening_crawl}
                ></input>
                <button type="submit">Submit</button>
                <button onClick={handleEdit}>Close</button>
              </form>
            </div>
          ) : null}{" "}
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleBack}>Back</button>
        </div>
      </>
    );
}

export default FilmDetails;
