import styles from "./Students.module.css";
import {TableStudents} from "./TableStudents";
import {SubNavBar} from "../../components/SubNavBar";
import {BotaoNavBar} from "../../components/BotaoNavBar";
import {useNavigate} from "react-router-dom";

export const Students = () => {

    const navigate = useNavigate()
    return (
        <div className={styles.Container}>
            <div className={styles.Header}>
        <SubNavBar>
            <li><p>Controle de Alunos</p></li>
            <li><BotaoNavBar onClick={() => navigate('/pagina-principal/formulario-aluno')}>Novo Aluno</BotaoNavBar></li>
        </SubNavBar>
            </div>
            <div className={styles.Content}>
                <TableStudents/>
            </div>
            <div className={styles.Footer}>
            </div>
        </div>
    )
}