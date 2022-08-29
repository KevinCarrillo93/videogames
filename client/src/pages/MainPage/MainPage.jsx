import styles from "./MainPage.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  alphabetSort,
  creationFilter,
  genresFilter,
  getGenres,
  getVideogames,
  getVideogamesByName,
  rankSort,
} from "../../redux/actions";
import Card from "../../components/Card/Card";
import Search from "../../components/Search/Search";
import Filters from "../../components/Filters/Filters";
import Pagination from "../../components/Pagination/Pagination";
import { useHistory } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { NoResults } from "../../components/NoResults/NoResults";

export default function MainPage() {
  //Getting videogames from back-end
  const videogames = useSelector((state) => state.videoGamesLoaded);
  const genres = useSelector((state) => state.allGenres);
  const [search, setSearch] = useState('')
  const dispatch = useDispatch();

  const [loading, setLoading]= useState(true);
  //Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const [vgPerPage] = useState(15);

  const history = useHistory();

  //Order
  const [order, setOrder] = useState();
  //UseEffect for calling the method in the store
  useEffect(() => {
    setLoading(true)
    dispatch(getVideogames())
    .then((data)=>
      setLoading(false)
    )
    dispatch(getGenres());
  }, [dispatch]);
  
  if(loading){
    return <Loader />    
  }  
  //Get current videogamess
  const indexOfLastVG = currentPage * vgPerPage;
  const indexOfFirstVG = indexOfLastVG - vgPerPage;
  const currentVgs = videogames.slice(indexOfFirstVG, indexOfLastVG);
  //Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //handle by searchbar
  const handleName = (name) => {
    setSearch(name);
    if (name !== "") {
      dispatch(getVideogamesByName(name));
    } else {
      history.push("./main");
      dispatch(getVideogames());
    }
  };
  //handle alphabetically
  const handleAlphOrder = (type) => {
    dispatch(alphabetSort(type));
    setOrder(type);
    setCurrentPage(1);
  };
  //handle by rank
  const handleRankOrder = (type) => {
    dispatch(rankSort(type));
    setOrder(type);
    setCurrentPage(1);
  };
  //handle by creation
  const handleCreationFilter = (type) => {
    dispatch(creationFilter(type));
    setOrder(type);
    setCurrentPage(1);
  };
  //handle by genres
  const handleGenresOrder = (type) => {
    dispatch(genresFilter(type));
    setOrder(type);
    setCurrentPage(1);
  };

  //Rendering the whole main page
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainHeader}>
        <Search handleName={handleName} />
        <button
          onClick={() => {
            history.push("/create");
          }}
          className={styles.addButton}
        >
          <strong>ADD VIDEOGAME</strong>
        </button>
      </div>
      <div className={styles.mainGrid}>

        <ul className={styles.videogamesGrid}>
          {currentVgs.length === 0 ? (
            <NoResults search={search}/>
            // <div style={{color:'white'}}>There is not results....</div>
          ) : (
            currentVgs.map((vg) => (
              <Card
                key={vg.id}
                id={vg.id}
                name={vg.name}
                background_image={vg.background_image}
                genres={vg.genres}
                short_screenshots={vg.short_screenshots}
              />
            ))
          )}
        </ul>
        {
          <Filters
            genres={genres}
            handleAlphOrder={handleAlphOrder}
            handleRankOrder={handleRankOrder}
            handleCreationFilter={handleCreationFilter}
            handleGenresOrder={handleGenresOrder}
          />
        }
      </div>
      <Pagination
        vgPerPage={vgPerPage}
        totalVgs={videogames.length}
        paginate={paginate}
        current={currentPage}
      />
    </div>
  );
}
