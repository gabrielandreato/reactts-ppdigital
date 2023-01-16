import styles from './BarraLateral.module.css';
import logo from './assets/logo_minerva.png'
import {Link} from "react-router-dom";

const BarraLateral = () => {
    return (
        <div className={styles.Container}>
            <img className={styles.LogoMinerva} src={logo} alt=""/>
            <div className={styles.Navigation}>
                <ul className={styles.Section}>
                    <Link to={'matriz-treinamentos'}>Matriz de Treinamentos</Link>
                    <Link to={'cursos'}>Cursos</Link>
                    <Link to={'alunos'}>Alunos</Link>
                    <Link to={'matriculas'}>Matriculas</Link>
                    <Link to={'gestores'}>Gestores</Link>
                </ul>
            </div>
        </div>
    )
}

export default BarraLateral;