import Input from "../../../components/Input";
import styles from "./FormStudent.module.css"
import Botao from "../../../components/Botao";
import {SubNavBar} from "../../../components/SubNavBar";
import {useNavigate} from "react-router-dom";
import {BotaoNavBar} from "../../../components/BotaoNavBar";
import {useState} from "react";

export const FormStudent = () => {
    const navigate = useNavigate();

    const [nomeStudent, setStudentName] = useState('');

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


    }

    return(
        <div className={styles.Content}>
            <nav className={styles.NavBar}>
            <SubNavBar>
                <li><p>Cadastro de Alunos</p></li>
                <li><BotaoNavBar onClick={() => navigate('/pagina-principal/alunos')}>Voltar</BotaoNavBar></li>
            </SubNavBar>
            </nav>
        <div className={styles.FormWrapper}>
            <form className={styles.Form} onSubmit={onFormSubmit}>
                <label htmlFor="">Nome do Aluno:</label>
                <input type="text" onChange={event => setStudentName(event.target.value)}/>
                <label htmlFor="">Gestor:</label>
                <input type="text" />
                <Botao>Cadastrar</Botao>
            </form>
        </div>
        </div>
    )
}