import styles from "./FormManagers.module.css"
import Botao from "../../../components/Botao";
import {SubNavBar} from "../../../components/SubNavBar";
import {useNavigate, useParams} from "react-router-dom";
import {BotaoNavBar} from "../../../components/BotaoNavBar";
import {useEffect, useState} from "react";
import {http} from "../../../http";

export const FormManagers = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [managerName, setManagerName] = useState('');

    useEffect(() => {
        if (params.id){
            http.get(`gestores/${params.id}`)
                .then(response => setManagerName(response.data.name))
        }
    }, [params])

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (params.id) {
            http.patch(`gestores/${params.id}/`, {name: managerName})
                .then(() => alert('Gestor atualizado com sucesso'))
                .then(() => navigate(`/pagina-principal/gestores`))
                .catch(erro => alert('Houve um erro. Não foi possivel cadastrar um novo gestor !'))
        } else {
            http.post(`gestores/`, {name: managerName, is_manager: true})
                .then(() => alert('Gestor cadastrado com sucesso'))
                .then(() => navigate(`/pagina-principal/gestores`))
                .catch(erro => alert('Houve um erro. Não foi possivel atualizar o gestor !'))
        }
        setManagerName('')
    }

    return(
        <div className={styles.Content}>
            <nav className={styles.NavBar}>
            <SubNavBar>
                <li><p>Cadastro de Gestor</p></li>
                <li><BotaoNavBar onClick={() => navigate('/pagina-principal/gestores')}>Voltar</BotaoNavBar></li>
            </SubNavBar>
            </nav>
        <div className={styles.FormWrapper}>
            <form className={styles.Form} action="" onSubmit={onFormSubmit}>
                <label htmlFor="managerName">Nome do Gestor:</label>
                <input onChange={event => setManagerName(event.target.value)}
                       value={managerName}
                       name="managerName"
                       type="text"/>
                <Botao>Salvar</Botao>
            </form>
        </div>
        </div>
    )
}