import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteFilm } from "../../store";
import Navigation from "../navigation";
import AddFilm from "../add/addFilm";
import { routes } from "../../routes/Routes";

function FilmsList({ list, setInfoDetails }) {
  const [addOpen, setAddOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Removing key `properties` from fetched objects in array, all objects in array now looks same
  list = list.map((element) => {
    if (element?.properties) return { ...element.properties, uid: element.uid };
    else return element;
  });

  const handleAdd = () => {
    !addOpen ? setAddOpen(true) : setAddOpen(false);
  };

  const handleDetails = (element) => {
    const newUrl = element.title.toLowerCase().replace(" ", "-");
    //Checking is film selected to show details saved as an object with all needed keys and values in
    //localStorage array (using key `director` to check it) or we need to fetch character details from api
    if (element?.director) {
      //Will be true only if selected film was manually added or edited by user
      //otherwise this object wouldn't have key `director`
      setInfoDetails(element);
    } else
      fetch(`https://www.swapi.tech/api/films/${element.uid}`)
        .then((res) => res.json())
        .then((res) => {
          setInfoDetails(res);
        })
        .catch((err) => console.log(err));
    navigate(`${routes.films}/${newUrl}`);
  };

  const handleDelete = (el) => {
    dispatch(deleteFilm(el.uid));
  };

  const mappingFilms = list.map((el, i) => {
    return (
      <div className="mappedBox" key={i}>
        <div className="titleMain">
          <div className="mappedTitle">{el.title}</div>
          <div className="titleMainDiv">
            <button onClick={() => handleDetails(el)}>Details</button>
            <button onClick={() => handleDelete(el)}>Delete</button>
          </div>
        </div>
      </div>
    );
  });

  if (!mappingFilms[0])
    return (
      <div>
        {" "}
        <Navigation />
        <div>Loading...</div>
      </div>
    );
  else
    return (
      <div className="main">
        <Navigation />
        <div className="titleMain">
          <h2>Films:</h2>
          <button onClick={handleAdd}>+ Add Film</button>
        </div>
        {addOpen && <AddFilm setAddOpen={setAddOpen} />}
        {mappingFilms}
      </div>
    );
}

export default FilmsList;
