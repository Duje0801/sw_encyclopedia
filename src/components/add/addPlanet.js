import { useDispatch } from "react-redux";
import { addPlanet } from "../../store";
import { nanoid } from "@reduxjs/toolkit";

function AddPlanet({ setAddOpen }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    setAddOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPlanet = {
      name: formData.get("name"),
      population: formData.get("population"),
      diameter: formData.get("diameter"),
      climate: formData.get("climate"),
      terrain: formData.get("terrain"),
      gravity: formData.get("gravity"),
      uid: nanoid(),
    };

    dispatch(addPlanet(newPlanet));
    setAddOpen(false);
  };

  return (
    <div className="addNewBox">
      <div>Add New Planet:</div>
      <form className="addNewForm" onSubmit={handleSubmit}>
        Name:{" "}
        <input
          name="name"
          type="text"
          minLength="1"
          maxLength="30"
          required
        ></input>
        Population:{" "}
        <input
          name="population"
          type="number"
          min="1"
          max="99999999999"
          required
        ></input>
        Diameter:{" "}
        <input
          name="diameter"
          type="number"
          min="1"
          max="99999999999"
          required
        ></input>
        Terrain:{" "}
        <input
          name="terrain"
          type="text"
          minLength="1"
          maxLength="30"
          required
        ></input>
        Climate:{" "}
        <input
          name="climate"
          type="text"
          minLength="1"
          maxLength="30"
          required
        ></input>
        Gravity:{" "}
        <input
          name="gravity"
          type="text"
          minLength="1"
          maxLength="30"
          required
        ></input>
        <button type="submit">Submit</button>
        <button onClick={handleClose}>Close</button>
      </form>
    </div>
  );
}

export default AddPlanet;
