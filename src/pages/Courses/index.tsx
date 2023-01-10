import styles from './Courses.module.css'

import {TableCourses} from "./TableCourses";
import {SubNavBar} from "../../components/SubNavBar";
import {useNavigate} from "react-router-dom";
import {BotaoNavBar} from "../../components/BotaoNavBar";

export const Courses = () => {

    const navigate = useNavigate();

    return (
        <div className={styles.Container}>
            <div className={styles.Header}>
            <SubNavBar>
                <li><p>Controle de Cursos</p></li>
                <li><BotaoNavBar onClick={() => navigate('/pagina-principal/formulario-curso')}>Novo Curso</BotaoNavBar></li>
            </SubNavBar>
            </div>
            <div className={styles.Content}>
                <TableCourses />
            </div>


        </div>
    )
}