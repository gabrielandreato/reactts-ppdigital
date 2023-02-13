import styles from "./FormCoursesByResponsability.module.css"
import Botao from "../../../components/Botao";
import {SubNavBar} from "../../../components/SubNavBar";
import {useNavigate, useParams} from "react-router-dom";
import {BotaoNavBar} from "../../../components/BotaoNavBar";
import React, {useEffect, useState} from "react";
import http from "../../../http";
import {Dropdown} from "../../../components/Dropdown";
import ICourses from "../../../interfaces/ICourses";
import IResponsability from "../../../interfaces/IResponsability";
import {useRecoilState} from "recoil";
import {courseList} from "../../../state/atomCourse";
import {responsabilityList} from "../../../state/atomResponsability";
import {InputCheckbox} from "../../../components/InputCheckbox";

export const FormCoursesByResponsability = () => {
    const navigate = useNavigate();

    const params = useParams();

    const [responsabilityName, setResponsabilityName] = useState('');
    const [courseName, setCourseName] = useState('');
    const [courseRequired, setCourseRequired] = useState<boolean>(true)

    const [responsabilityNameList, setResponsabilityNameList] = useRecoilState<IResponsability[]>(responsabilityList);
    const [courseNameList, setCourseNameList] = useRecoilState<ICourses[]>(courseList);


    useEffect(() => {
        http.get('cargos/')
            .then(response => {
                setResponsabilityNameList(response.data)
        http.get('cursos/')
            .then(response => setCourseNameList(response.data))
            })
    }, [])

    useEffect(() => {
        if (params.id){
            http.get(`matriculas-cargo/${params.id}/`)
                .then(response => {
                    setCourseName(response.data.course_name_id)
                    setResponsabilityName(response.data.responsability_name_id)
                    setCourseRequired(response.data.is_required)
                })
        }
    }, [params])

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = {
            course_name: courseName,
            responsability_name: responsabilityName,
            is_required: courseRequired
        }
        if (params.id) {
            http.put(`cadastrar-matricula-cargo/${params.id}/`, data)
                .then(() => alert('Curso para este cargo foi atualizado com sucesso'))
                .then(() => navigate(`/pagina-principal/curso-cargo`))
                .catch(erro => alert('Houve um erro. Não foi possivel atualizar a curso para este cargo !'))
        } else {
            http.post(`cadastrar-matricula-cargo/`, data)
                .then(() => alert('Curso para este cargo cadastrada com sucesso'))
                .then(() => navigate(`/pagina-principal/curso-cargo`))
                .catch(erro => alert('Houve um erro. Não foi possivel cadastrar uma nova curso para este cargo !'))
        }
        setCourseName('')
        setResponsabilityName('')
    }

    return(
        <div className={styles.Content}>
            <nav className={styles.NavBar}>
            <SubNavBar>
                <li><p>Cadastro de Curso por Cargo</p></li>
                <li><BotaoNavBar onClick={() => navigate('/pagina-principal/curso-cargo')}>Voltar</BotaoNavBar></li>
            </SubNavBar>
            </nav>
        <div className={styles.FormWrapper}>
            <form className={styles.Form} action="" onSubmit={onFormSubmit}>
                <label htmlFor="responsability">Nome do Cargo:</label>
                    <Dropdown onChange={event => {
                        setResponsabilityName(event.target.value)
                    }} value={responsabilityName} name={'responsability'} id={'responsability'}>
                        <option  value=''>Selecione um cargo...</option>
                        {responsabilityNameList.map(responsability => (
                                <option key={responsability.id} value={responsability.id}>{responsability.responsability}</option>
                            )
                        )}
                    </Dropdown>
                <label htmlFor="student">Nome do Curso:</label>
                    <Dropdown onChange={event => {
                        setCourseName(event.target.value)
                    }} value={courseName} name={'course'} id={'course'}>
                        <option id="selecione-padrao">Selecione um curso...</option>
                        {courseNameList!.map(course => (
                                <option key={course.id} value={course.id}>{course.name}</option>
                            )
                        )}
                    </Dropdown>
                    <InputCheckbox htmlFor="courseRequired"
                       type="checkbox"
                       checked={courseRequired}
                       onChange={event => setCourseRequired(event.target.checked)}
                    >Curso obrigatório ?</InputCheckbox>
                <Botao>Salvar</Botao>
            </form>
        </div>
        </div>
    )
}