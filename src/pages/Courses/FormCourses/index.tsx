import Input from "../../../components/Input";
import styles from "./FormCourses.module.css"
import Botao from "../../../components/Botao";
import {SubNavBar} from "../../../components/SubNavBar";
import {useNavigate, useParams} from "react-router-dom";
import {BotaoNavBar} from "../../../components/BotaoNavBar";
import {useEffect, useState} from "react";
import {http} from "../../../http";

export const FormCourses = () => {
    const navigate = useNavigate();

    const params = useParams();

    const [courseName, setCourseName] = useState('');

    useEffect(() => {
        if (params.id){
            http.get(`cursos/${params.id}`)
                .then(response => setCourseName(response.data.name))
        }
    }, [params])

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (params.id) {
            http.put(`cursos/${params.id}/`, {name: courseName})
                .then(() => alert('Curso atualizado com sucesso'))
                .then(() => navigate(`/pagina-principal/cursos`))
                .catch(erro => alert('Houve um erro. Não foi possivel cadastrar um novo curso !'))
        } else {
            http.post(`cursos/`, {name: courseName})
                .then(() => alert('Curso cadastrado com sucesso'))
                .then(() => navigate(`/pagina-principal/cursos`))
                .catch(erro => alert('Houve um erro. Não foi possivel cadastrar um novo curso !'))
        }
        setCourseName('')
    }

    return(
        <div className={styles.Content}>
            <nav className={styles.NavBar}>
            <SubNavBar>
                <li><p>Cadastro de Cursos</p></li>
                <li><BotaoNavBar onClick={() => navigate('/pagina-principal/cursos')}>Voltar</BotaoNavBar></li>
            </SubNavBar>
            </nav>
        <div className={styles.FormWrapper}>
            <form className={styles.Form} action="" onSubmit={onFormSubmit}>
                <label htmlFor="courseName">Nome do Curso:</label>
                <input onChange={event => setCourseName(event.target.value)}
                       value={courseName}
                       name="courseName"
                       type="text"/>
                {/*<Input htmlFor='final-date' type='date'>Data final:</Input>*/}
                <Botao>Salvar</Botao>
            </form>
        </div>
        </div>
    )
}