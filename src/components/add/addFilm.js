import { useDispatch } from "react-redux";
import { addFilm } from "../../store";
import { nanoid } from "@reduxjs/toolkit";

function AddCharacter({ setAddOpen }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    setAddOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newFilm = {
      title: formData.get("title"),
      director: formData.get("director"),
      producer: formData.get("producer"),
      release_date: formData.get("release_date"),
      opening_crawl: formData.get("opening_crawl"),
      uid: nanoid(),
    };
    dispatch(addFilm(newFilm));
    setAddOpen(false);
  };

  return (
    <div className="addNewBox">
      <div>Add New Character:</div>
      <form className="addNewForm" onSubmit={handleSubmit}>
        Title:{" "}
        <input name="title" type="text" minLength="1" maxLength="30"></input>
        Director:{" "}
        <input name="director" type="text" minLength="1" maxLength="30"></input>
        Producer:{" "}
        <input name="producer" type="text" minLength="1" maxLength="30"></input>
        Release Date: <input name="release_date" type="date"></input>
        Opening Crawl:{" "}
        <input
          name="opening_crawl"
          type="text"
          minLength="1"
          maxLength="300"
        ></input>
        <button type="submit">Submit</button>
        <button onClick={handleClose}>Close</button>
      </form>
    </div>
  );
}

export default AddCharacter;
