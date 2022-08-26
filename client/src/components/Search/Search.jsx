import styles from "./Search.module.css";
import React from "react";
import { useState } from "react";

export default function Search({handleName}) {
  const [searchText, setSearchText] = useState('')
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    handleName(searchText)
  }
  console.log(searchText)

  return (
      <form className={styles.searchBox} onSubmit={handleSubmit}>
        <button type='submit' className={styles.searchBtn} >
          <i className="material-icons">search</i>
        </button>
        <input
          className={styles.searchTxt}
          type="text"
          value={searchText}
          onChange={(e)=> setSearchText(e.target.value)}
          placeholder="Search Gallery"
        />
      </form>
  );
}
