import styles from "./NavBarManagers.module.css";
import {BotaoNavBar} from "../../../components/BotaoNavBar";

export const NavBarManagers = () => {
    return (

        <nav className={styles.NavHeader}>
            <li><p>Controle de Gestores</p></li>
            <li><BotaoNavBar>Novo gestor</BotaoNavBar></li>
        </nav>

    )

}