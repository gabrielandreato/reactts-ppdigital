import {useNavigate} from "react-router-dom";
import styles from "../Courses/Courses.module.css";
import {SubNavBar} from "../../components/SubNavBar";
import {FilterCourses} from "../Courses/FilterCourses";
import {BotaoNavBar} from "../../components/BotaoNavBar";
import {TableCourses} from "../Courses/TableCourses";
import {FilterRegistration} from "./FilterRegistration";
import {TableRegistration} from "./TableRegistration";

export const Registration = () => {
    const navigate = useNavigate();


    return (
        <div className={styles.Container}>
            <div className={styles.Header}>
            <SubNavBar>
                <li><p>Controle de Matriculas</p></li>
                <li className={styles.NavFunctions}><FilterRegistration />
                    <BotaoNavBar onClick={() => navigate('/pagina-principal/formulario-matricula')}>Nova matricula</BotaoNavBar>
                    <BotaoNavBar >Atribuir</BotaoNavBar>
                </li>
            </SubNavBar>
            </div>
            <div className={styles.Content}>
                <TableRegistration />
            </div>
        </div>
    )
}