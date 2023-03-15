import styles from './BarraLateral.module.css';
import logo from './assets/logo-minervafoods.svg';
import {Link} from "react-router-dom";
import studentImg from "./assets/livro.svg"



const BarraLateral = () => {
    return (
        <div className={styles.Container}>
            <img  className={styles.LogoMinerva} src={logo} alt=""/>
            <div className={styles.Navigation}>
                <h2 className={styles.Title}>Home</h2>
                <ul className={styles.Section}>
                    <Link className={styles.Option} to={'alunos'}><i className="bi bi-person"></i><p className={styles.OptionText}>Alunos</p></Link>
                    <Link className={styles.Option} to={'gestores'}><i className="bi bi-person-gear"></i><p className={styles.OptionText}>Gestores</p></Link>
                    <Link className={styles.Option} to={'cursos'}><i className="bi bi-book-half"></i><p className={styles.OptionText}>Cursos</p></Link>
                    <Link className={styles.Option} to={'matriculas'}><i className="bi bi-play-circle"></i><p className={styles.OptionText}>Matriculas</p></Link>
                    <Link className={styles.Option} to={'curso-cargo'}><i className="bi bi-people"></i><p className={styles.OptionText}>Cursos por Cargo</p></Link>
                </ul>
            </div>
        </div>
    )
}

export default BarraLateral;