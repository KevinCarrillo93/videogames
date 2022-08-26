import styles from "./CreateGame.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getGenres,createVideogame } from "../../redux/actions";
import { useHistory } from 'react-router-dom';

export default function CreateGame() {
  const platforms = [
    {name: "Dreamcast"},
    {name: "Nintendo 3DS"},
    {name: "PS Vita"},
    {name: "Playstation 4"},
    {name: "Xbox One"},
    {name: "MacOS"},
    {name: "Linux"},
    {name: "Nintendo Switch"},
    {name: "Playstation 2"},
    {name: "Playstation 3"},
    {name: "Playstation 5"},
    {name: "Xbox Series S/X"},
    {name: "Android"},
    {name: "PC"},
    {name: "Web"},
    {name: "Xbox 360"},
    {name: "iOs"},
  ];
  const genres = useSelector((state) => state.allGenres);
  const [range, setRange] = useState(1);
  const history = useHistory()
  const [inputErrors, setInputErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    description_raw: "",
    released: "",
    rating: "",
    platforms: [],
    genres: [],
    background_image: undefined,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
    if(Object.keys(inputErrors).length === 0 && isSubmit){
      console.log(inputs)
      dispatch(createVideogame(inputs))
      .then((data) => {
        console.log(data)
        // return dispatch({type: actionType.POST_VIDEOGAME, payload: data})
        history.push('/main')
      })
      .catch((e) => {
          console.log(e);
      })
    }
  }, [dispatch, inputErrors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputErrors(validate(inputs))
    setIsSubmit(true)
    console.log('handleSubmit')
  };

  const handleChecked = (e) => {
    if (e.target.checked) {
      setInputs((prevState) => {
        return {
          ...prevState,
          genres: [...prevState.genres, e.target.value],
        };
      });
    } else if (!e.target.checked) {
      setInputs((pS) => {
        return {
          ...pS,
          genres: [...pS.genres.filter((g) => g !== e.target.value)],
        };
      });
    }
  };

  const handleChecked2 = (e) => {
    if (e.target.checked) {
      setInputs((prevState) => {
        return {
          ...prevState,
          platforms: [...prevState.platforms, e.target.value],
        };
      });
    } else if (!e.target.checked) {
      setInputs((pS) => {
        return {
          ...pS,
          platforms: [...pS.platforms.filter((g) => g !== e.target.value)],
        };
      });
    }
  };
  const handleInputs = (e) => {
    setInputs((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value.trim(), rating: range };
    });
  };
  const validate = (values) =>{
    const errors = {}
    const regex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
    // if(!values.name){
    //   errors.name = 'Name is required!'
    // }else if(values.name.length > 100){
    //   errors.name = 'Name can not be longer than 100 characters'
    // }
    if(!regex.test(values.released)){
        errors.released = 'This is not a valid Date!'
    }
    if(!values.description_raw){
        errors.description_raw = 'Description is required!'
    }else if(values.description_raw.length>500){
      errors.description_raw = 'Description can not exceed 500 characters'
    }
    return errors;
  }

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img
          className={styles.imgForm}
          src="https://fondosmil.com/fondo/2064.jpg"
          alt="imagenRef"
        />
      </div>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <label className={styles.label}>Name:</label>
        <input
          type="text"
          className={styles.inputText}
          name="name"
          onChange={handleInputs}
          placeholder="Write the name of your videogame..."
          maxLength='110'
        />
        <p className={styles.pError}>{inputErrors.name}</p>
        <label className={styles.label}>Released:</label>
        <input
          type="date"
          className={styles.inputText}
          name="released"
          min='1899-01-01'
          max='2026-01-01'
          onChange={handleInputs}
        />
        <label className={styles.label}>Rating:{` ${range}`}</label>
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className={styles.inputText}
        />
        <label className={styles.label}>Image:</label>
        <input
          type="text"
          className={styles.inputText}
          name="background_image"
          onChange={handleInputs}
          placeholder="(optional)Set your url image..."
        />
        <label className={styles.label}>Description:</label>
        <textarea
          type="text"
          className={styles.inputTextArea}
          name="description_raw"
          onChange={handleInputs}
          placeholder="Write your game description..."
          maxLength='510'
        />
         <p className={styles.pError}>{inputErrors.description_raw}</p>
        <label className={styles.label}>Genres:</label>
        <div className={styles.checkers}>
          {genres &&
            genres.map((gen) => (
              <div key={gen.id}>
                <input
                  type="checkbox"
                  value={gen.id}
                  onChange={handleChecked}
                />
                <label>{gen.name}</label>
              </div>
            ))}
        </div>
        <label className={styles.label}>Platforms:</label>
        <div className={styles.checkers}>
          {platforms.map((plat) => (
            <div key={plat.name}>
              <input type="checkbox" value={plat.name} onChange={handleChecked2} />
              <label>{plat.name}</label>
            </div>
          ))}
        </div>
        <div className={styles.buttonsContainer}>
          <button onClick={()=>history.goBack()} className={styles.goBackButton}>
            <i className="material-icons">arrow_back</i>
            <p>Go back</p>
          </button>
          <button className={styles.addVideogameButton} type="submit">
            Add Videogame
          </button>
        </div>
      </form>
    </div>
  );
}
