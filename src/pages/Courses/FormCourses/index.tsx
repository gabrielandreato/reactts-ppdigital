import Input from "../../../components/Input";
import styles from "./FormCourses.module.css"
import Botao from "../../../components/Botao";
import {SubNavBar} from "../../../components/SubNavBar";
import {useNavigate} from "react-router-dom";
import {BotaoNavBar} from "../../../components/BotaoNavBar";

export const FormCourses = () => {
    const navigate = useNavigate();

    return(
        <div className={styles.Content}>
            <nav className={styles.NavBar}>
            <SubNavBar>
                <li><p>Cadastro de Cursos</p></li>
                <li><BotaoNavBar onClick={() => navigate('/pagina-principal/cursos')}>Voltar</BotaoNavBar></li>
            </SubNavBar>
            </nav>
        <div className={styles.FormWrapper}>
            <form className={styles.Form} action="">
                <Input htmlFor='name' type='text'>Nome do curso:</Input>
                <Input htmlFor='final-date' type='date'>Data final:</Input>
                <Botao>Cadastrar</Botao>
            </form>
        </div>
        </div>
    )
}