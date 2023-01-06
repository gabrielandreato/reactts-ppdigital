import {Link} from "react-router-dom";
import styles from './BarraNavegacao.module.css'
import logo from './assets/logo_minerva.png'

const BarraNavegacao = () => {
    return(
        <nav className={styles.barra_navegacao}>
            <h1 className={styles.logo}><img src={logo} alt=""/></h1>
            <ul className={styles.opcoes}>
                <li>Matriz de Treinamentos </li>
                <li>Controle de Colaboradores </li>
            </ul>
            <div className={styles.icones}>
                <ul>
                    <li>
                        Login
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default BarraNavegacao