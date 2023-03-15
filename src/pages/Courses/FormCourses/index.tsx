import styles from "../../../components/Form/Form.module.css";
import Botao from "../../../components/Botao";
import {SubNavBar} from "../../../components/SubNavBar";
import {useNavigate, useParams} from "react-router-dom";
import {BotaoNavBar} from "../../../components/BotaoNavBar";
import {useEffect, useState} from "react";
import http from "../../../http";
import {useRecoilState, useRecoilValue} from "recoil";
import {originList} from "../../../state/atomOrigin";
import IOrigin from "../../../interfaces/IOrigin";
import {Dropdown} from "../../../components/Dropdown";
import {subAreaList} from "../../../state/atomSubArea";
import ISubArea from "../../../interfaces/ISubArea";


export const FormCourses = () => {
    const navigate = useNavigate();

    const params = useParams();

    const [courseName, setCourseName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [idKaptiva, setIdKaptiva] = useState('');
    const [originName, setOriginName] = useState('');
    const [subAreaName, setSubAreaName] = useState('')


    const [originNameList, setOriginNameList] = useRecoilState<IOrigin[]>(originList);
    const [subAreaNameList, setSubAreaNameList] = useRecoilState<ISubArea[]>(subAreaList)

    useEffect(() => {
        if (params.id){
            http.get(`cursos/${params.id}`)
                .then(response => {
                    setCourseName(response.data.name);
                    setDueDate(response.data.due_date);
                    setIdKaptiva(response.data.id_kaptiva);
                    if (response.data.origin) {setOriginName(response.data.origin)} else return "";
                    if (response.data.subarea) { setSubAreaName(response.data.subarea)} else return "";
                });
        }
    }, [params])

    useEffect(() => {
        http.get('origens/')
            .then(response => setOriginNameList(response.data));
        http.get('subareas/')
            .then(response => setSubAreaNameList(response.data))
    }, [])

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = {
            name: courseName,
            due_date: dueDate,
            id_kaptiva: idKaptiva,
            origin: originName,
            subarea: subAreaName,

        }

        if (params.id) {
            http.put(`cursos/${params.id}/`, data)
                .then(() => alert('Curso atualizado com sucesso'))
                .then(() => navigate(`/pagina-principal/cursos`))
                .catch(erro => alert('Houve um erro. Não foi possivel cadastrar um novo curso !'));
        } else {
            // console.log(data)
            http.post(`cursos/`, data)
                .then(() => alert('Curso cadastrado com sucesso'))
                .then(() => navigate(`/pagina-principal/cursos`))
                .catch(erro => alert(`Houve um erro. Não foi possivel atualizar o curso!`));
        }
    }

    return(
        <div className={styles.Content}>
            <nav className={styles.NavBar}>
            <SubNavBar>
                <li><p>Cadastro de Cursos</p></li>
                {/* <li><BotaoNavBar onClick={() => navigate('/pagina-principal/cursos')}>Voltar</BotaoNavBar></li> */}
            </SubNavBar>
            </nav>
        <div className={styles.FormWrapper}>
            <form className={styles.Form} action="" onSubmit={onFormSubmit}>

                <label htmlFor="courseName">Nome do Curso:</label>
                <input onChange={event => setCourseName(event.target.value)}
                       value={courseName}
                       name="courseName"
                       type="text"
                       minLength={10}
                       required
                />

                <label htmlFor="dueDate">Prazo do Curso:</label>
                <input type="date"
                        value={dueDate}
                       name="dueDate"
                       onChange={event => setDueDate(event.target.value)}
                       required
                />

                <label htmlFor="idKaptiva">ID Kaptiva:</label>
                <input type="number"
                        value={idKaptiva}
                       name="idKaptiva"
                       onChange={event => setIdKaptiva(event.target.value)}
                       required
                />
                <label htmlFor="originName">Origem:</label>

                <Dropdown name={originName}
                          id={originName}
                          value={originName}
                          onChange={event => setOriginName(event.target.value)}>
                    <option id="selecione-padrao">Selecione uma origem...</option>
                    {originNameList.map(origin => (
                        <option
                            key={origin.id}
                            value={origin.id}
                        >{origin.name}</option>
                    ))}
                </Dropdown>

                <label htmlFor="subAreaName">Subarea:</label>
                <Dropdown name={subAreaName}
                          id={subAreaName}
                          value={subAreaName}
                          onChange={event => setSubAreaName(event.target.value)}>
                    <option id="selecione-padrao">Selecione uma origem...</option>
                    {subAreaNameList.map(origin => (
                        <option
                            key={origin.id}
                            value={origin.id}
                        >{origin.subarea}</option>
                    ))}
                </Dropdown>

                <Botao>Salvar</Botao>
            </form>
        </div>
        </div>
    )
}