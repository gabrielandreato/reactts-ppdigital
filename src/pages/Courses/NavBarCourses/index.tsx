import styles from "./NavBarCourses.module.css";
import Botao from "../../../components/Botao";
import {BotaoNavBar} from "../../../components/BotaoNavBar";

export const NavBarCourses = () => {
    return (

        <nav className={styles.NavHeader}>
            <li><p>Controle de Cursos</p></li>
            <li><BotaoNavBar>Novo Curso</BotaoNavBar></li>
        </nav>

    )

}