
import styles from "../PaginaLogin.module.css";
import duxLogo from "../assets/dux.svg";
import Input from '../../../components/Input'
import Botao from "../../../components/Botao";
import { Link, useNavigate } from "react-router-dom";
import logoMinerva from '../../../assets/login/logo_minerva_foods.png'
import { FormEvent, useState } from "react";
import http from "../../../http";
import { usePersistToken } from "../../../state/hooks/authentication";

const FormLogin = () => {

    const navigate = useNavigate()
    const setToken = usePersistToken();

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        http.post('api-token-auth/', { username: user, password: password })
            .then(response => {
                setToken(response.data.token)
                setUser('');
                setPassword('')
                navigate('pagina-principal');
            })
            .catch(erro => alert('Login ou senha incorretos, por favor, inclua credenciais validas.'))
    }

    return (

        <form onSubmit={onFormSubmit} className={styles.login__form} method="post" autoComplete="off">
            <div className={styles.login__form_description}>
                <img className={styles.login__dux_logo} src={duxLogo} alt="" />
                <hr className={styles.login__form_line} />
                <h3 className={`${styles.login__form_title} ${styles.main__title}`}>Iniciar sessão</h3>
                <p className={styles.login__form_paragraph}>Entre com seu usuário e senha para acessar o Dux Cloud.</p>
            </div>

            <div className={styles.login__form_body}>


                <Input onChange={event => setUser(event.target.value)}
                    htmlFor={user}
                    type={'email'}>E-mail</Input>
                <Input onChange={event => setPassword(event.target.value)}
                    htmlFor={password}
                    type={'password'}>Senha</Input>
                <hr />
                <Botao>Acessar</Botao>
            </div>
        </form>
    )
}
export default FormLogin