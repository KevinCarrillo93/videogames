import styles from './NoResults.module.css'
import React from 'react'
import { useHistory } from 'react-router-dom';

export function NoResults({search}){
    const history = useHistory();
    return (
        <div className={styles.notFoundContainer}>
            <h1>
                Sorry, we couldn't find any videogame call '{search}'
            </h1>
            <h4>- Check your spelling is right</h4>
            <h4>- Enter fewer word, e.g 'batman' rather than 'batman arkham asylum'</h4>
            <h4>- You can create your own game if you don't find it here</h4>
            <button
            onClick={() => {
                history.push("/create");
            }}
            className={styles.addButton}
            >
            <strong>ADD VIDEOGAME</strong>
            </button>
        </div>
    )
}