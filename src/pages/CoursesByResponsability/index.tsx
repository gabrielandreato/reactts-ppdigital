import styles from './CoursesByResponsability.module.css'

import {TableCoursesByResponsability} from "./TableCoursesByResponsability";
import {SubNavBar} from "../../components/SubNavBar";
import {useNavigate} from "react-router-dom";
import {BotaoNavBar} from "../../components/BotaoNavBar";
import {FilterCoursesByResponsability} from "./FilterCoursesByResponsability";

export const CoursesByResponsability = () => {

    const navigate = useNavigate();

    return (
        <div className={styles.Container}>
            <div className={styles.Header}>
            <SubNavBar>
                <li><p>Controle de Curso Por Cargo</p></li>
                <li className={styles.NavFunctions}><FilterCoursesByResponsability /><BotaoNavBar onClick={() => navigate('/pagina-principal/formulario-curso-cargo')}>Novo Curso</BotaoNavBar></li>
            </SubNavBar>
            </div>
            <div className={styles.Content}>
                <TableCoursesByResponsability />
            </div>


        </div>
    )
}