import styles from './Filters.module.css';
import React from "react";

export default function Filters({genres}){
    return (
        <div className={styles.filtersMenu}>
            <p className={styles.filterName}>Filters:</p>
            <select className={styles.selectOrder}>
                <option value="alphabetic">ALPHABETIC ORDER</option>
                <option value="alphabetic">A-Z</option>
                <option value="alphabetic">Z-A</option>
            </select>
            <hr className={styles.hrStyle}/>
            <select className={styles.selectOrder}>
                <option value="ranking">RANKING ORDER</option>
                <option value="alphabetic">Ascendent</option>
                <option value="alphabetic">Descendent</option>
            </select>
            <hr className={styles.hrStyle}/>
            <select className={styles.selectOrder}>
                <option value="creation">CREATION ORDER</option>
                <option value="alphabetic">Created by me</option>
                <option value="alphabetic">Globali</option>                
            </select>
            <hr className={styles.hrStyle}/>
            <select className={styles.selectOrder}>
                <option value="genres">GENRES ORDER</option>
                {
                    genres && genres.map((gen)=>(
                        <option value={gen.name}>{gen.name}</option>  
                    ))
                }                
            </select>
            <hr className={styles.hrStyle}/>
        </div>
    );
}