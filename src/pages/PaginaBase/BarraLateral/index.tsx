import styles from './BarraLateral.module.css';
import logo from './assets/logo-minervafoods.svg';
import {Link} from "react-router-dom";

const BarraLateral = () => {
    return (
        <div className={styles.Container}>
            <img className={styles.LogoMinerva} src={logo} alt=""/>
            <div className={styles.Navigation}>
                <h2 className={styles.Title}>Home</h2>
                <ul className={styles.Section}>
                    <Link to={'alunos'}>Alunos</Link>
                    <Link to={'gestores'}>Gestores</Link>
                    <Link to={'cursos'}>Cursos</Link>
                    <Link to={'matriculas'}>Matriculas</Link>
                    <Link to={'curso-cargo'}>Cursos por Cargo</Link>
                </ul>
            </div>
        </div>
    )
}

export default BarraLateral;