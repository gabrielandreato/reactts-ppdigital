import styles from './FormLogin.module.css'

import Input from '../../../components/Input'
import Botao from "../../../components/Botao";
import {Link, useNavigate} from "react-router-dom";
import logoMinerva from '../../../assets/login/logo_minerva_foods.png'
import {FormEvent, useState} from "react";
import {http} from "../../../http";
import {usePersistToken} from "../../../state/hooks/authentication";

const FormLogin = () => {

    const navigate = useNavigate()
    const setToken = usePersistToken();

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        http.post('api-token-auth/', {username: user, password: password})
            .then(response => {
                setToken(response.data.token)
                setUser('');
                setPassword('')
                navigate('pagina-principal');
            })
            .catch(erro => alert(erro))
    }

    return (<form className={styles.formWrapper} onSubmit={onFormSubmit} action="">
        <img src={logoMinerva} alt=""/>
        <Input onChange={event => setUser(event.target.value)}
               htmlFor={user}
               type={'email'}>Login</Input>
        <Input onChange={event => setPassword(event.target.value)}
               htmlFor={password}
               type={'password'}>Senha</Input>
        <hr/>
        <Botao>Acessar</Botao>
        <Link to={'/pagina-principal'}>Cadastre-se</Link>
    </form>)
}
export default FormLogin