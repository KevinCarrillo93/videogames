import styles from './Detail.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getVideogamesById } from '../../redux/actions';
import { useHistory, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';


export default function Detail(){
    let detail = useSelector((state) =>state.videoGameDetail); 
    const [loading, setLoading] = useState(true);
    const [mainImage, setmainImage] = useState();
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
      setLoading(true)
        dispatch(getVideogamesById(id))
        .then((data)=>
          setLoading(false)
        )
    }, [dispatch, id]);

    useEffect(()=>{
      setmainImage(detail.short_screenshots ? detail.short_screenshots[0] : null);
    },[detail.short_screenshots])

    function onImageChange(img){
      setmainImage(img);
    }
    if(loading){
      console.log('sisas')
      return <Loader/>
    }

    return (
      <div className={styles.detailsContainer}>
        {detail.name && (
          <>
            <div className={styles.container}>
              <h1 className={styles.title}>{detail.name.toUpperCase()}</h1>
              <div className={styles.imgContainer}>
                {mainImage && (
                  <img
                    className={styles.mainImg}
                    src={mainImage.image}
                    alt={detail.name}
                  />
                )}
              </div>
              <div className={styles.thumbnailContainer}>
                <img
                  onClick={() => onImageChange(detail.short_screenshots[0])}
                  src={detail.short_screenshots[0].image}
                  alt="img1"
                  className={styles.thumbnail}
                />
                <img
                  onClick={() => onImageChange(detail.short_screenshots[1])}
                  src={detail.short_screenshots[1].image}
                  alt="img2"
                  className={styles.thumbnail}
                />
                <img
                  onClick={() => onImageChange(detail.short_screenshots[2])}
                  src={detail.short_screenshots[2].image}
                  alt="img3"
                  className={styles.thumbnail}
                />
                <img
                  onClick={() => onImageChange(detail.short_screenshots[3])}
                  src={detail.short_screenshots[3].image}
                  alt="img4"
                  className={styles.thumbnail}
                />
              </div>
            </div>
            <div className={`${styles.col} ${styles.vgDetail}`}>
              <p className={styles.item}>
                <strong>Genres:</strong>{" "}
                {detail.genres && detail.genres.map((g) => g.name).join(", ")}👾
              </p>
              <hr />
              <p className={styles.item}>
                <strong>Released:</strong> {detail.released}📅
              </p>
              <hr />
              <p className={styles.item}>
                <strong>Rating:</strong> {detail.rating}⭐
              </p>
              <hr />
              <p>
                <strong>Platforms:</strong>{" "}
                {detail.platforms &&
                  detail.platforms
                    .map((p) =>
                      p.platform === undefined ? p : `${p.platform.name} 🎮`
                    )
                    .join(", ")}
              </p>
              <hr />              
              <div><p className={styles.description}>{detail.description_raw}</p></div>
              <div className={styles.buttonsContainer}>
                <button
                  onClick={() => {history.goBack()}}
                  className={styles.goBackButton}
                >
                  <i className="material-icons">arrow_back</i>
                  <p>Go back</p>
                </button>
                <button className={styles.addVideogameButton} onClick={()=>history.push('/create')}>
                  Create your own game
                </button>
              </div>        
            </div>
          </>
        )}
      </div>
    );
    }