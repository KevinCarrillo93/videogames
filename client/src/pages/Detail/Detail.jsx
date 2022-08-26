import styles from './Detail.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getVideogamesById } from '../../redux/actions';
import { useParams } from 'react-router-dom';


export default function Detail(){
    const detail = useSelector((state) =>state.videoGameDetail); 
    const [loader, setLoader] = useState(false);
    const [mainImage, setmainImage] = useState();
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideogamesById(id));
    }, [dispatch, id]);

    useEffect(()=>{
      setmainImage(detail.short_screenshots ? detail.short_screenshots[0] : null);
    },[detail.short_screenshots])

    function onImageChange(img){
      setmainImage(img);
    }
    console.log(detail.platforms)

    if(loader){
      return <div>Loading..........</div>
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
                  className={`${styles.thumbnail} ${styles.active}`}
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
                <strong>Genders:</strong>{" "}
                { detail.genres && detail.genres.map((g) => g.name).join(", ")}
              </p>
              <hr />
              <p className={styles.item}>
                <strong>Released:</strong> {detail.released}
              </p>
              <hr />
              <p className={styles.item}>
                <strong>Rating:</strong> {detail.rating}
              </p>
              <hr />
              <p>
                <strong>Platforms:</strong>{' '}
                { detail.platforms && detail.platforms.map((p) => p.platform === undefined ? p: p.platform.name ).join(", ")}
              </p>
              <hr />
            </div>
            <p className={styles.description}>
              <strong>Description:</strong> {detail.description_raw}
            </p>
          </>
        )}
      </div>
    );
    }