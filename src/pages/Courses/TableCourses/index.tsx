import styles from "./TableCourses.module.css";
import {BotaoNavBar} from "../../../components/BotaoNavBar";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {courseList, filteredCourseList} from "../../../state/atomCourse";
import {useEffect} from "react";
import {http} from "../../../http";
import ICourses from "../../../interfaces/ICourses";
import {useNavigate} from "react-router-dom";

export const TableCourses = () => {

    const coursesListValues = useRecoilValue<ICourses[]>(filteredCourseList)
    const setCoursesListValues = useSetRecoilState<ICourses[]>(courseList)

    const navigate = useNavigate();

    useEffect(() => {
        http.get('cursos/')
            .then(response => setCoursesListValues(response.data))

    }, [])

    return (
        <div className={styles.Content}>
        <table className={styles.Table}>
            <thead className={styles.TableHead}>
            <tr className={styles.TableHeadValue}>
                <th className={styles.TableHeadValueId}>ID</th>
                <th>Nome do Curso</th>
                <th className={styles.TableHeadValueFunctions}>Funções</th>
            </tr>

            </thead>
            <tbody className={styles.TableBody}>
            {coursesListValues.map(
                course => (
                    <tr className={styles.TableBodyValue} key={course.id}>
                        <td className={styles.TableBodyValueId}>{course.id}</td>
                        <td>{course.name}</td>
                        {/*<td>{course.data_final.getDate()}</td>*/}
                        <td>
                            <BotaoNavBar onClick={() => navigate(`/pagina-principal/formulario-curso/${course.id}/`)}>Editar</BotaoNavBar>
                        </td>
                    </tr>
                )
            )}
            </tbody>
        </table>

                <ul className={styles.TableFoot}>
                    <li> Anterior</li>
                    <li>Proxima</li>
                </ul>
        </div>
    )
}