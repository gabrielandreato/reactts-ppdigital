import styles from "./FormStudent.module.css"
import Botao from "../../../components/Botao";
import {SubNavBar} from "../../../components/SubNavBar";
import {useNavigate, useParams} from "react-router-dom";
import {BotaoNavBar} from "../../../components/BotaoNavBar";
import {useEffect, useRef, useState} from "react";
import http from "../../../http";
import IStudent from "../../../interfaces/IStudent";
import {Dropdown} from "../../../components/Dropdown";
import {useRecoilState} from "recoil";
import {managerList} from "../../../state/atomManager";
import {responsabilityList} from "../../../state/atomResponsability";
import IResponsability from "../../../interfaces/IResponsability";
import ISubArea from "../../../interfaces/ISubArea";
import {subAreaList} from "../../../state/atomSubArea";

export const FormStudent = () => {
    const navigate = useNavigate();

    const params = useParams();

    const studentNameRef = useRef<HTMLInputElement | null>(null)
    const buttonRef = useRef<HTMLInputElement | null>(null)

    // Input states
    const [studentName, setStudentName] = useState('');
    const [studentManager, setStudentManager] = useState('');
    const [studentResponsability, setStudentResponsability] = useState('');
    const [studentSubArea, setStudentSubArea] = useState('');

    const [managerNameList, setManagerNameList] = useRecoilState<IStudent[]>(managerList);
    const [responsabilityNameList, setResponsabilityNameList] = useRecoilState<IResponsability[]>(responsabilityList);
    const [subAreaNameList, setSubAreaNameList] = useRecoilState<ISubArea[]>(subAreaList);

    useEffect(() => {
        if (params.id) {
            http.get(`alunos/${params.id}`)
                .then(response => {
                    setStudentName(response.data.name)
                    setStudentManager(response.data.supervisor.id)
                    setStudentResponsability(response.data.responsability.id)
                    setStudentSubArea(response.data.subarea)
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
            name: studentName, supervisor: studentManager, responsability: studentResponsability,
            is_active: true, is_manager: false, subarea: studentSubArea
        }

        if (params.id) {
            http.patch(`alunos/${params.id}/`, data)
                .then(() => alert('Aluno atualizado com sucesso !'))
                .then(() => navigate('/pagina-principal/alunos'))
                .catch(erro => alert('Houve um erro. Não foi possivel atualizar o aluno !'))
        } else {
            http.post('alunos/', data)
                .then(() => alert('Aluno cadastrado com sucesso !'))
                .catch(erro => alert('Houve um erro. Não foi possivel cadastrar um novo aluno !'))
        }
        setStudentName('')
        setStudentManager('')
        studentNameRef.current?.focus()
    }

    return (
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
                        ref={studentNameRef}
                        type="text"
                        onChange={event => setStudentName(event.target.value)}
                        value={studentName}
                    />
                    <label htmlFor="manager">Gestor Direto:</label>
                    <Dropdown onChange={event => {
                        setStudentManager(event.target.value)
                    }} value={studentManager} name={'manager'} id={'manager'}>
                        <option id="selecione-padrao">Selecione um gestor...</option>
                        {managerNameList!.map(manager => (
                                <option key={manager.id} value={manager.id}>{manager.name}</option>
                            )
                        )}
                    </Dropdown>
                    <label htmlFor="responsability">Cargo:</label>
                    <Dropdown onChange={event => {
                        setStudentResponsability(event.target.value)
                    }} value={studentResponsability} name={'responsability'} id={'responsability'}>
                        <option id="selecione-padrao">Selecione um cargo...</option>
                            {responsabilityNameList!.map(responsability => (
                                <option key={responsability.id}
                                        value={responsability.id}>{responsability.responsability}</option>
                            ))}
                    </Dropdown>
                    <label htmlFor="subarea">Sub Area:</label>
                    <Dropdown name="subarea"
                              id="subarea"
                              value={studentSubArea}
                              onChange={event => {setStudentSubArea(event.target.value)}}
                    >
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