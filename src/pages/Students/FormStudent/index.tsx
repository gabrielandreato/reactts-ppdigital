import Input from "../../../components/Input";
import styles from "./FormStudent.module.css"
import Botao from "../../../components/Botao";
import {SubNavBar} from "../../../components/SubNavBar";
import {useNavigate, useParams} from "react-router-dom";
import {BotaoNavBar} from "../../../components/BotaoNavBar";
import {useEffect, useState} from "react";
import {http} from "../../../http";
import IStudent from "../../../interfaces/IStudent";

export const FormStudent = () => {
    const navigate = useNavigate();

    const params = useParams();

    const [studentName, setStudentName] = useState('');

    useEffect(() => {
        if(params.id) {
            http.get(`alunos/${params.id}`)
                .then(response => setStudentName(response.data.name))
        }
    }, [params])

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (params.id) {
            http.put(`alunos/${params.id}/`, {name: studentName})
                .then(() => alert('Aluno atualizado com sucesso !'))
                .then(() => navigate('/pagina-principal/alunos'))
                .catch(erro => alert('Houve um erro. Não foi possivel cadastrar um novo aluno !'))
        } else {
            http.post('alunos/', {name: studentName})
                .then(() => alert('Aluno cadastrado com sucesso !'))
                .catch(erro => alert('Houve um erro. Não foi possivel cadastrar um novo aluno !'))
        }
        setStudentName('')
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
                <input
                    type="text"
                    onChange={event => setStudentName(event.target.value)}
                    value={studentName}
                />
                {/*<label htmlFor="">Gestor:</label>*/}
                {/*<input type="text" />*/}
                <Botao>Cadastrar</Botao>
            </form>
        </div>
        </div>
    )
}