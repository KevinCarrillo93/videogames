import React from "react";
import styles from './Pagination.module.css'

export default function Pagination ({vgPerPage, totalVgs, paginate}){
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(totalVgs/vgPerPage); i++) {
        pageNumber.push(i);        
    }
    
    return(
        <nav>
            <ul className={styles.pagination}>
                {pageNumber.map(number =>(
                    <li key={number} className={styles.pageItem}>
                        <button onClick={() => paginate(number)} className={styles.buttonPage}>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}