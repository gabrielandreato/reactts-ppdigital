import styles from './BarraNavegacao.module.css'
import logo from './assets/logo_minerva.png'
import {Courses} from "../../Courses";
import { Link } from "react-router-dom";

const BarraNavegacao = () => {
    return(
        <nav className={styles.BarraNavegacao}>
            <ul className={styles.opcoes}>
                <li><Link to={'courses'}>Logout</Link></li>
            </ul>
        </nav>
    )
}
export default BarraNavegacao