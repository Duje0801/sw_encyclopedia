import { useDispatch } from "react-redux";
import { addSpecie } from "../../store";
import { nanoid } from "@reduxjs/toolkit";

function AddSpecie({ setAddOpen }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    setAddOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newSpecie = {
      name: formData.get("name"),
      classification: formData.get("classification"),
      language: formData.get("language"),
      average_lifespan: formData.get("average_lifespan"),
      average_height: formData.get("average_height"),
      eye_colors: formData.get("eye_colors"),
      hair_colors: formData.get("hair_colors"),
      uid: nanoid(),
    };

    dispatch(addSpecie(newSpecie));
    setAddOpen(false);
  };

  return (
    <div className="addNewBox">
      <div>Add New Specie:</div>
      <form className="addNewForm" onSubmit={handleSubmit}>
        Name:{" "}
        <input
          name="name"
          type="text"
          minLength="1"
          maxLength="30"
          required
        ></input>
        Classification:{" "}
        <input
          name="classification"
          type="text"
          minLength="1"
          maxLength="30"
          required
        ></input>
        Language:{" "}
        <input
          name="language"
          type="text"
          minLength="1"
          maxLength="30"
          required
        ></input>
        Average Height:{" "}
        <input
          name="hair_colors"
          type="number"
          min="1"
          max="99999"
          required
        ></input>
        Average Lifespan:{" "}
        <input
          name="eye_colors"
          type="number"
          min="1"
          max="99999"
          required
        ></input>
        Eye Colors:{" "}
        <input
          name="average_height"
          type="number"
          min="1"
          max="99999"
          required
        ></input>
        Hair Colors:{" "}
        <input
          name="average_lifespan"
          type="number"
          min="1"
          max="99999"
          required
        ></input>
        <button type="submit">Submit</button>
        <button onClick={handleClose}>Close</button>
      </form>
    </div>
  );
}

export default AddSpecie;
