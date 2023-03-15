import styles from './Courses.module.css'

import { TableCourses } from "./TableCourses";
import { SubNavBar } from "../../components/SubNavBar";
import { useNavigate } from "react-router-dom";
import { BotaoNavBar } from "../../components/BotaoNavBar";
import { FilterCourses } from "./FilterCourses";

export const Courses = () => {

    const navigate = useNavigate();

    return (
        <div className={styles.Container}>
            <div className={styles.Header}>
                <SubNavBar>
                    <li><p>Controle de Cursos</p></li>
                    <li className={styles.NavFunctions}>
                        <FilterCourses />
                        <BotaoNavBar onClick={() => navigate('/pagina-principal/formulario-curso')}>
                            <i className={`bi bi-plus-square ${styles.SubNavButtonIcon}`}></i>
                            Cadastrar Curso
                        </BotaoNavBar>
                    </li>
                </SubNavBar>
            </div>
            <div className={styles.Content}>
                <TableCourses />
            </div>


        </div>
    )
}