import styles from './BarraNavegacao.module.css'
import {useCleanToken} from "../../../state/hooks/authentication";
import {Navigate, redirect, useNavigate} from "react-router-dom";

const BarraNavegacao = () => {

    const navigate = useNavigate()

    const removeToken = useCleanToken;
    const logout = () => {
        removeToken();
        navigate('/')

    }

    return (
        <nav className={styles.BarraNavegacao}>
            <ul className={styles.opcoes}>
                <li>
                    <button onClick={() => logout()}>Logout</button>
                </li>
            </ul>
        </nav>
    )
}
export default BarraNavegacao