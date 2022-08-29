import styles from './Filters.module.css';
import React from "react";

export default function Filters({genres, handleAlphOrder, handleRankOrder, handleCreationFilter, handleGenresOrder}){
    const handleChangeAlp = (e) =>{
        handleAlphOrder(e.target.value)
    }
    const handleChangeRank = (e) =>{
        handleRankOrder(e.target.value)
    }
    const handleChangeCreation = (e) =>{
        handleCreationFilter(e.target.value)
    }
    const handleChangeGenre = (e)=>{
        handleGenresOrder(e.target.value)
    }
    return (
        <div className={styles.filtersMenu}>
            <p className={styles.filterName}>Filters:</p>
            <select className={styles.selectOrder} onChange={handleChangeAlp}>
                <option value="alphabetic">ALPHABETIC ORDER</option>
                <option value="ASC">A-Z</option>
                <option value="DES">Z-A</option>
            </select>
            <hr className={styles.hrStyle}/>
            <select className={styles.selectOrder} onChange={handleChangeRank}>
                <option value="ranking">RANKING ORDER</option>
                <option value="UP">Ascendent</option>
                <option value="DOWN">Descendent</option>
            </select>
            <hr className={styles.hrStyle}/>
            <select className={styles.selectOrder} onChange={handleChangeCreation}>
                <option value="creation">CREATION ORDER</option>
                <option value="BYME">Created by me</option>
                <option value="GLOBAL">Global</option>                
            </select>
            <hr className={styles.hrStyle}/>
            <select className={styles.selectOrder} onChange={handleChangeGenre}>
                <option value="genres">GENRES ORDER</option>
                {
                    genres && genres.map((gen)=>(
                        <option key={gen.id} value={gen.name}>{gen.name}</option>  
                    ))
                }                
            </select>
            <hr className={styles.hrStyle}/>
        </div>
    );
}