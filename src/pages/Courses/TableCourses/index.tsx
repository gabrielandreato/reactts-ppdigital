import styles from "./TableCourses.module.css";
import {BotaoNavBar} from "../../../components/BotaoNavBar";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {courseList, filteredCourseList} from "../../../state/atomCourse";
import React, {useEffect, useState} from "react";
import {http} from "../../../http";
import ICourses from "../../../interfaces/ICourses";
import {useNavigate} from "react-router-dom";
import {Pagination} from "../../../components/Pagination/Pagination";

export const TableCourses = () => {

    // States from Recoil
    const setCoursesListValues = useSetRecoilState<ICourses[]>(courseList)
    const filteredCoursesListValues = useRecoilValue<ICourses[]>(filteredCourseList)

    const navigate = useNavigate();

    // Pagination states
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [coursesPerPage] = useState<number>(10);
    // Pagination parameters
    const indexOfLastCourse = currentPage * coursesPerPage
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
    const currentCourses = filteredCoursesListValues.slice(indexOfFirstCourse, indexOfLastCourse);
    //Change Page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

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
            {currentCourses.map(
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
        <Pagination
            itemsPerPage={coursesPerPage}
            totalItems={filteredCoursesListValues.length}
            paginate={paginate}
        />
        </div>
    )
}