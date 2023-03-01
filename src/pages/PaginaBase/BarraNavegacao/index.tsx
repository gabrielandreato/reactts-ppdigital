import styles from './BarraNavegacao.module.css'
import {useCleanToken} from "../../../state/hooks/authentication";
import {useNavigate} from "react-router-dom";
import avatar from './assets/dropbox-avatar.jpg';
import { useRef, useState } from 'react';
import { Dropdown } from '../../../components/Dropdown';

const BarraNavegacao = () => {

    const navigate = useNavigate()
    const [navBarDropDownState, setNavBarDropDownState ] = useState(false);

    const removeToken = useCleanToken;
    const logout = () => {
        removeToken();
        navigate('/')
    }
    
    const refDropDown = useRef<HTMLDivElement>(null);

    const dropDownMenuAct = () => {
        setNavBarDropDownState(!navBarDropDownState)
    }

    return (
        <nav className={styles.BarraNavegacao}>
            <ul className={styles.Opcoes}>
                <button onClick={dropDownMenuAct} className={styles.DropDownButton}>
                    <div className={styles.DropDownButtonContent}>
                        <img src={avatar} className={styles.Avatar} alt="avatar para o menu superior"/>
                        <div className={styles.UserName}>
                            <span className={styles.FirstName}>Gabriel</span>
                            <span className={styles.Admin}>Admin</span>
                        </div>
                    </div>
                { navBarDropDownState ?
                <div className={styles.DropDownMenu}>
                    <h3 className={styles.DropDownTitle}>Bem vindo !</h3>
                    <li ><button className={styles.DropDownOption} onClick={() => logout()}><span ></span>Sair</button></li>
                </div>
                :
                <></>
                }
                    
                </button>
            </ul>
        </nav>
    )
}
export default BarraNavegacao