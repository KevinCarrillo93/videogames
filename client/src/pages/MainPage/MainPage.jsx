import styles from './MainPage.module.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideogames, getVideogamesByName } from "../../redux/actions";
import Card from "../../components/Card/Card";
import Search from "../../components/Search/Search";
import Filters from '../../components/Filters/Filters';
import Pagination from '../../components/Pagination/Pagination';
import { useHistory } from 'react-router-dom';

export default function MainPage(){

    //Getting videogames from back-end
    const videogames = useSelector((state) =>state.videoGamesLoaded); 
    const dispatch = useDispatch();
    //Pagination logic
    // const [loading, setLoading]= useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [vgPerPage] = useState(15);

    const history = useHistory();

    const genres = useSelector((state)=>state.allGenres);

    //UseEffect for calling the method in the store
     useEffect(()=>{
        dispatch(getVideogames());
        dispatch(getGenres());
    },[dispatch]);

    useEffect(()=>{
      setCurrentPage(1)
    },[videogames])

    //Get current videogamess
    const indexOfLastVG = currentPage * vgPerPage;
    const indexOfFirstVG = indexOfLastVG - vgPerPage;
    const currentVgs = videogames.slice(indexOfFirstVG, indexOfLastVG);
    //Change page
    const paginate = (pageNumber)=> {setCurrentPage(pageNumber)}
    
    const handleName = (name)=>{
      if (name !== '') {
        dispatch(getVideogamesByName(name))
        history.push(`/main?name=${name}`)        
      }else {
        history.push('./main')
        dispatch(getVideogames());
      }
    }

    function handleClick(){
      history.push('/create')
    }

    //Rendering the whole main page
    return (
      <div className={styles.mainContainer}>
        <div className={styles.mainHeader}>
          <Search handleName={handleName}/>
          <button onClick={handleClick} className={styles.addButton}>
            <strong>ADD VIDEOGAME</strong>
          </button>
        </div>
        <div className={styles.mainGrid}>
          <ul className={styles.videogamesGrid}>
            {currentVgs &&
              currentVgs.map((vg) => (
                <Card
                  key={vg.id}
                  id={vg.id}
                  name={vg.name}
                  background_image={vg.background_image}
                  genres={vg.genres}
                  short_screenshots={vg.short_screenshots}
                />
              ))}
          </ul>
          {<Filters genres={genres}/>}
        </div>
          <Pagination
            vgPerPage={vgPerPage}
            totalVgs={videogames.length}
            paginate={paginate}
          />
      </div>
    );
}