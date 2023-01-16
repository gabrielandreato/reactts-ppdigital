import styles from './Managers.module.css'

import {TableManagers} from "./TableManagers";
import {SubNavBar} from "../../components/SubNavBar";
import {useNavigate} from "react-router-dom";
import {BotaoNavBar} from "../../components/BotaoNavBar";
import {FilterManagers} from "./FilterManagers";

export const Manager = () => {

    const navigate = useNavigate();

    return (
        <div className={styles.Container}>
            <div className={styles.Header}>
            <SubNavBar>
                <li><p>Controle de Gestores</p></li>
                <li className={styles.NavFunctions}><FilterManagers /><BotaoNavBar onClick={() => navigate('/pagina-principal/formulario-gestor')}>Novo Gestor</BotaoNavBar></li>
            </SubNavBar>
            </div>
            <div className={styles.Content}>
                <TableManagers />
            </div>

        </div>
    )
}