import { useDispatch } from "react-redux";
import { addCharacter } from "../../store";
import { nanoid } from "@reduxjs/toolkit";

function AddCharacter({ setAddOpen }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    setAddOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCharacter = {
      name: formData.get("name"),
      height: formData.get("height"),
      mass: formData.get("mass"),
      birth_year: formData.get("birth_year"),
      skin_color: formData.get("skin_color"),
      eye_color: formData.get("eye_color"),
      hair_color: formData.get("hair_color"),
      uid: nanoid(),
    };

    dispatch(addCharacter(newCharacter));
    setAddOpen(false);
  };

  return (
    <div className="addNewBox">
      <div>Add New Character:</div>
      <form className="addNewForm" onSubmit={handleSubmit}>
        Name:{" "}
        <input
          name="name"
          type="text"
          minLength="1"
          maxLength="30"
          required
        ></input>
        Height:{" "}
        <input name="height" type="number" min="1" max="99999" required></input>
        Mass:{" "}
        <input name="mass" type="number" min="1" max="99999" required></input>
        Hair color:{" "}
        <input
          name="hair_color"
          type="text"
          minLength="1"
          maxLength="30"
          required
        ></input>
        Skin color:{" "}
        <input
          name="skin_color"
          type="text"
          minLength="1"
          maxLength="30"
          required
        ></input>
        Eye color:{" "}
        <input
          name="eye_color"
          type="text"
          minLength="1"
          maxLength="30"
          required
        ></input>
        Birth year:{" "}
        <input
          name="birth_year"
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

export default AddCharacter;
