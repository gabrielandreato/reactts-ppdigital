import styles from './BarraLateral.module.css';
import logo from './assets/logo_minerva.png'
import {Link} from "react-router-dom";

const BarraLateral = () => {
    return (
        <div className={styles.Container}>
            <img className={styles.LogoMinerva} src={logo} alt=""/>
            <div className={styles.Navigation}>
                <ul className={styles.Section}>
                    <li><Link to={'courses'}>Matriz de Treinamentos</Link></li>
                    <li><Link to={'courses'}>Cursos</Link></li>
                    <li><Link to={'courses'}>Alunos</Link></li>
                    <li><Link to={'courses'}>Matriculas</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default BarraLateral;