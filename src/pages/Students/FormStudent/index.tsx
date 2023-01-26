import styles from "./FormStudent.module.css"
import Botao from "../../../components/Botao";
import {SubNavBar} from "../../../components/SubNavBar";
import {useNavigate, useParams} from "react-router-dom";
import {BotaoNavBar} from "../../../components/BotaoNavBar";
import {useEffect, useRef, useState} from "react";
import {http} from "../../../http";
import IStudent from "../../../interfaces/IStudent";
import {Dropdown} from "../../../components/Dropdown";
import {useRecoilState} from "recoil";
import {managerList} from "../../../state/atomManager";

export const FormStudent = () => {
    const navigate = useNavigate();

    const params = useParams();

    const studentNameRef = useRef<HTMLInputElement | null>(null)

    const [studentName, setStudentName] = useState('');
    const [studentManager, setStudentManager] = useState('');

    const [managerNameList, setManagerNameList] = useRecoilState<IStudent[]>(managerList);

    useEffect(() => {
        if(params.id) {
            http.get(`alunos/${params.id}`)
                .then(response => {
                    setStudentName(response.data.name)
                    setStudentManager(response.data.supervisor)
                })
        }
    }, [params])

    useEffect(() => {
        http.get('gestores/')
            .then(response => setManagerNameList(response.data))
    }, [])

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (params.id) {
            http.patch(`alunos/${params.id}/`, {name: studentName, supervisor: studentManager})
                .then(() => alert('Aluno atualizado com sucesso !'))
                .then(() => navigate('/pagina-principal/alunos'))
                .catch(erro => alert('Houve um erro. Não foi possivel atualizar o aluno !'))
        } else {
            http.post('alunos/', {name: studentName, is_manager: false, supervisor: studentManager})
                .then(() => alert('Aluno cadastrado com sucesso !'))
                .catch(erro => alert('Houve um erro. Não foi possivel cadastrar um novo aluno !'))
        }
        setStudentName('')
        setStudentManager('')
        studentNameRef.current?.focus()
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
                    ref={studentNameRef}
                    type="text"
                    onChange={event => setStudentName(event.target.value)}
                    value={studentName}
                />
                <label htmlFor="manager">Nome do Gestor:</label>
                    <Dropdown onChange={event => {
                        setStudentManager(event.target.value)
                    }} value={studentManager} name={'course'} id={'course'}>
                        <option id="selecione-padrao">Selecione um gestor...</option>
                        {managerNameList!.map(manager => (
                                <option key={manager.id} value={manager.id}>{manager.name}</option>
                            )
                        )}
                    </Dropdown>
                <Botao>Salvar</Botao>
            </form>
        </div>
        </div>
    )
}