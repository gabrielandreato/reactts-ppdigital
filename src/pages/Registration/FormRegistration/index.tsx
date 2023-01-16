import styles from "./FormRegistration.module.css"
import Botao from "../../../components/Botao";
import {SubNavBar} from "../../../components/SubNavBar";
import {useNavigate, useParams} from "react-router-dom";
import {BotaoNavBar} from "../../../components/BotaoNavBar";
import {ReactEventHandler, useEffect, useState} from "react";
import {http} from "../../../http";
import {Dropdown} from "../../../components/Dropdown";
import IStudent from "../../../interfaces/IStudent";
import ICourses from "../../../interfaces/ICourses";
import {useRecoilState} from "recoil";
import {courseList, studentList} from "../../../state/atom";

export const FormRegistration = () => {
    const navigate = useNavigate();

    const params = useParams();

    const [studentName, setStudentName] = useState('');
    const [studentNameList, setStudentNameList] = useRecoilState<IStudent[]>(studentList);
    const [courseName, setCourseName] = useState('');
    const [courseNameList, setCourseNameList] = useRecoilState<ICourses[]>(courseList);



    useEffect(() => {
        http.get('alunos/')
            .then(response => {
                setStudentNameList(response.data)
            })
    }, [])

    useEffect(() => {
        http.get('cursos/')
            .then(response => setCourseNameList(response.data))
    }, [])

    useEffect(() => {
        if (params.id){
            http.get(`cadastrar-matricula/${params.id}/`)
                .then(response => {
                    setCourseName(response.data.course_name)
                    setStudentName(response.data.student_name)
                })
            console.log(courseName, studentName)
        }
    }, [params])

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (params.id) {
            http.put(`cadastrar-matricula/${params.id}/`, {course_name: courseName, student_name: studentName})
                .then(() => alert('Matricula atualizada com sucesso'))
                .then(() => navigate(`/pagina-principal/matriculas`))
                .catch(erro => alert('Houve um erro. Não foi possivel cadastrar uma nova matricula !'))
        } else {
            http.post(`cadastrar-matricula/`, {course_name: courseName, student_name: studentName})
                .then(() => alert('Matricula cadastrada com sucesso'))
                .then(() => navigate(`/pagina-principal/matriculas`))
                .catch(erro => alert('Houve um erro. Não foi possivel cadastrar uma nova matricula !'))
        }
        setCourseName('')
        setStudentName('')
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
                <label htmlFor="student">Nome do Aluno:</label>
                    <Dropdown onChange={event => {
                        setStudentName(event.target.value)
                    }} value={studentName} name={'student'} id={'student'}>
                        <option  value=''>Selecione um aluno...</option>
                        {studentNameList.map(student => (
                                <option key={student.id} value={student.id}>{student.name}</option>
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
                <Botao>Salvar</Botao>
            </form>
        </div>
        </div>
    )
}