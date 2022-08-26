import styles from './Home.module.css';
import { useHistory } from 'react-router-dom';

export default function Home(){
    const history = useHistory();

    function handleClick(){
        history.push('/main')
    }

    return(
        <div className={styles.homeParent}>
            <div className={styles.letters}>
                <h1 className={styles.h1letter}>Gaming Gallery:</h1>
                <h1 className={styles.h1letter}>All Your Games</h1>
                <h1 className={styles.h1letter}>In One Place</h1>
                <button type='input' onClick={handleClick} className={styles.enterButton}>
                    <strong>ENTER NOW</strong>
                </button>
            </div>
            <div className={styles.homeImg}/>
        </div>
    );
}