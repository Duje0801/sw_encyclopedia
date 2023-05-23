import { useDispatch } from "react-redux";
import { addVehicle, addStarship } from "../../store";
import { nanoid } from "@reduxjs/toolkit";

function AddVehicle({ setAddOpen, category }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    setAddOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newVehicleStarship = {
      name: formData.get("name"),
      model: formData.get("model"),
      manufacturer: formData.get("manufacturer"),
      passengers: formData.get("passengers"),
      crew: formData.get("crew"),
      uid: nanoid(),
    };

    if (category === `vehicle`) dispatch(addVehicle(newVehicleStarship));
    if (category === `starship`) dispatch(addStarship(newVehicleStarship));
    setAddOpen(false);
  };

  return (
    <div className="addNewBox">
      <div>Add New {category}:</div>
      <form className="addNewForm" onSubmit={handleSubmit}>
        Name:{" "}
        <input
          name="name"
          type="text"
          minLength="1"
          maxLength="30"
          required
        ></input>
        Model:{" "}
        <input
          name="model"
          type="text"
          minLength="1"
          maxLength="30"
          required
        ></input>
        Manufacturer:{" "}
        <input
          name="manufacturer"
          type="text"
          minLength="1"
          maxLength="30"
          required
        ></input>
        Crew:{" "}
        <input
          name="crew"
          type="text"
          minLength="1"
          maxLength="30"
          required
        ></input>
        Passengers:{" "}
        <input
          name="passengers"
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

export default AddVehicle;
