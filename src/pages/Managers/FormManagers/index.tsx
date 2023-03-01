import styles from "../../../components/Form/Form.module.css";
import Botao from "../../../components/Botao";
import {SubNavBar} from "../../../components/SubNavBar";
import {useNavigate, useParams} from "react-router-dom";
import {BotaoNavBar} from "../../../components/BotaoNavBar";
import {useEffect, useState} from "react";
import http from "../../../http";
import {Dropdown} from "../../../components/Dropdown";
import {useRecoilState} from "recoil";
import IStudent from "../../../interfaces/IStudent";
import {managerList} from "../../../state/atomManager";
import IResponsability from "../../../interfaces/IResponsability";
import {responsabilityList} from "../../../state/atomResponsability";
import ISubArea from "../../../interfaces/ISubArea";
import {subAreaList} from "../../../state/atomSubArea";

export const FormManagers = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [managerName, setManagerName] = useState('');
    const [managerResponsability, setManagerResponsability] = useState('')
    const [managerSupervisor, setManagerSupervisor] = useState('')
    const [managerSubArea, setManagerSubArea] = useState('')

    const [managerNameList, setManagerNameList] = useRecoilState<IStudent[]>(managerList);
        const [responsabilityNameList, setResponsabilityNameList] = useRecoilState<IResponsability[]>(responsabilityList);
    const [subAreaNameList, setSubAreaNameList] = useRecoilState<ISubArea[]>(subAreaList);

    useEffect(() => {
        if (params.id){
            http.get(`gestores/${params.id}`)
                .then(response => {
                    console.log(response)
                    setManagerName(response.data.name)
                    setManagerSupervisor(response.data.supervisor)
                    setManagerResponsability(response.data.responsability)
                    setManagerSubArea(response.data.subarea)
                })
        }
    }, [params])

    useEffect(() => {
        http.get('gestores/')
            .then(response => setManagerNameList(response.data))
    }, [])

    useEffect(() => {
        http.get('cargos/')
            .then(response => setResponsabilityNameList(response.data))
    }, [])

    useEffect(() => {
        http.get('subareas/')
            .then(response => setSubAreaNameList(response.data))
    }, [])

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = {
            name: managerName, supervisor: managerSupervisor, responsability: managerResponsability,
            is_active: true, is_manager: true, subarea: managerSubArea
        }

        if (params.id) {
            http.patch(`gestores/${params.id}/`, data)
                .then(() => alert('Gestor atualizado com sucesso'))
                .then(() => navigate(`/pagina-principal/gestores`))
                .catch(erro => alert('Houve um erro. Não foi possivel cadastrar um novo gestor !'))
        } else {
            http.post(`gestores/`, data)
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
                <label htmlFor="manager">Gestor Direto:</label>
                <Dropdown onChange={event => {
                    setManagerSupervisor(event.target.value)
                }} value={managerSupervisor} name={'manager'} id={'manager'}>
                    <option id="selecione-padrao">Selecione um gestor...</option>
                    {managerNameList!.map(manager => (
                            <option key={manager.id} value={manager.id}>{manager.name}</option>
                        )
                    )}
                </Dropdown>
               <label htmlFor="responsability">Cargo:</label>
                <Dropdown onChange={event => {
                    setManagerResponsability(event.target.value)
                }} value={managerResponsability} name={'responsability'} id={'responsability'}>
                    <option id="selecione-padrao">Selecione um cargo...</option>
                        {responsabilityNameList!.map(responsability => (
                            <option key={responsability.id}
                                    value={responsability.id}>{responsability.responsability}</option>
                        ))}
                </Dropdown>
                <label htmlFor="subarea">Sub Area:</label>
                    <Dropdown name="subarea" id="subarea" value={managerSubArea} onChange={event => {
                        setManagerSubArea(event.target.value)
                    }}>
                        <option id="selecione-padrao">Selecione uma sub area...</option>
                        {subAreaNameList.map(subarea => (
                            <option key={subarea.id} value={subarea.id}>{subarea.subarea}</option>
                        ))}
                    </Dropdown>
                <Botao>Salvar</Botao>
            </form>
        </div>
        </div>
    )
}