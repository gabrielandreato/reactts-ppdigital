import styles from "./FormRegistration.module.css"
import Botao from "../../../components/Botao";
import {SubNavBar} from "../../../components/SubNavBar";
import {useNavigate, useParams} from "react-router-dom";
import {BotaoNavBar} from "../../../components/BotaoNavBar";
import {useEffect, useState} from "react";
import {http} from "../../../http";

export const FormRegistration = () => {
    const navigate = useNavigate();

    const params = useParams();

    const [registrationName, setRegistrationName] = useState('');
    const [studentName, setStudentName] = useState('');

    useEffect(() => {
        if (params.id){
            http.get(`matriculas/${params.id}`)
                .then(response => setRegistrationName(response.data.name))
        }
    }, [params])

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (params.id) {
            http.put(`matriculas/${params.id}/`, {name: registrationName})
                .then(() => alert('Matricula atualizada com sucesso'))
                .then(() => navigate(`/pagina-principal/matriculas`))
                .catch(erro => alert('Houve um erro. Não foi possivel cadastrar uma nova matricula !'))
        } else {
            http.post(`matriculas/`, {name: registrationName})
                .then(() => alert('Matricula cadastrada com sucesso'))
                .then(() => navigate(`/pagina-principal/matriculas`))
                .catch(erro => alert('Houve um erro. Não foi possivel cadastrar uma nova matricula !'))
        }
        setRegistrationName('')
    }

    return(
        <div className={styles.Content}>
            <nav className={styles.NavBar}>
            <SubNavBar>
                <li><p>Cadastro de Matriculas</p></li>
                <li><BotaoNavBar onClick={() => navigate('/pagina-principal/matriculas')}>Voltar</BotaoNavBar></li>
            </SubNavBar>
            </nav>
        <div className={styles.FormWrapper}>
            <form className={styles.Form} action="" onSubmit={onFormSubmit}>
                <label htmlFor="registrationName">Nome do Curso:</label>
                <input onChange={event => setRegistrationName(event.target.value)}
                       value={registrationName}
                       name="registrationName"
                       type="text"/>
                <label htmlFor="registrationName">Nome do Aluno:</label>
                <input onChange={event => setRegistrationName(event.target.value)}
                       value={registrationName}
                       name="registrationName"
                       type="text"/>
                {/*<Input htmlFor='final-date' type='date'>Data final:</Input>*/}
                <Botao>Salvar</Botao>
            </form>
        </div>
        </div>
    )
}