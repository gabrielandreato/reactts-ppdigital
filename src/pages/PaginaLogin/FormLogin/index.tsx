import styles from './FormLogin.module.css'

import Input from '../../../components/Input'
import Botao from "../../../components/Botao";
import {Link} from "react-router-dom";
import PaginaLogin from "../index";
import logoMinerva from '../../../assets/login/logo_minerva_foods.png'

const FormLogin = () => {
    return (

            <form className={styles.formWrapper} action="">
                <img src={logoMinerva} alt=""/>
                <Input htmlFor='login' type='email'>Login:</Input>
                <Input htmlFor='password' type='password'>Password:</Input>
                <hr/>
                <Botao >Acessar</Botao>
                <Link to={'/pagina-principal'}>Cadastre-se</Link>
            </form>

    )
}
export default FormLogin