import styles from './Card.module.css';
import React from "react";
import { Link } from "react-router-dom";

export default function Card({id, name, genres, background_image}){

    return (
      <li className={styles.cardContainer}>
        <Link className={styles.cardLink} to={{pathname:`/detail/${id}`}} >
          <div className={styles.cardImage} style ={{backgroundImage: `url(${background_image})`,  width:'200px', height: '270px'}}/>
          <div className={styles.cardInfo}>
            <div className={styles.cardGenre}>{' '}
              {
              genres &&
              genres?.map(g=>g.name).join(', ')
              }</div>
            <div className={styles.cardName}>{name}</div>
          </div>
        </Link>
      </li>
    );
}