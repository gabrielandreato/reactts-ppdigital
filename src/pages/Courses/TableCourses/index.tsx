import styles from "./TableCourses.module.css";
import {BotaoNavBar} from "../../../components/BotaoNavBar";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {courseList, filteredCourseList} from "../../../state/atomCourse";
import React, {useEffect, useState} from "react";
import http from "../../../http";
import ICourses from "../../../interfaces/ICourses";
import {useNavigate} from "react-router-dom";
import {Pagination} from "../../../components/Pagination/Pagination";


export const TableCourses = () => {

    // States from Recoil
    const setCoursesListValues = useSetRecoilState<ICourses[]>(courseList)
    const coursesListValues = useRecoilValue<ICourses[]>(filteredCourseList)

    const navigate = useNavigate();

    // Pagination states
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [coursesPerPage] = useState<number>(20);
    // Pagination parameters
    const indexOfLastCourse = currentPage * coursesPerPage
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
    const currentCourses = coursesListValues.slice(indexOfFirstCourse, indexOfLastCourse);

    // conditional to prevent unhide data when the state has been filtered and pagination in use
    const filteredPaginatedList = coursesListValues.length < coursesPerPage ? coursesListValues : currentCourses

    //Change Page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    useEffect(() => {
        http.get('cursos/')
            .then(response => setCoursesListValues(response.data))

    }, [])

    const dateFormat = (value: string) => {
        const day = new Date(value).getUTCDate()
        const month = new Date(value).getMonth()
        const year = new Date(value).getFullYear()
        return new Date(year, month, day).toLocaleDateString('pt-BR')
    }


    return (
        <div className={styles.Content}>
        <table className={styles.Table}>
            <thead className={styles.TableHead}>
            <tr className={styles.TableHeadValue}>
                <th className={styles.TableHeadValueId}>ID</th>
                <th>Nome do Curso</th>
                <th className={styles.TableHeadValueId}>ID Kaptiva</th>
                <th>Prazo Final</th>
                <th className={styles.TableHeadValueFunctions}>Funções</th>
            </tr>

            </thead>
            <tbody className={styles.TableBody}>
            {filteredPaginatedList.map(
                course => (
                    <tr className={styles.TableBodyValue} key={course.id}>
                        <td className={styles.TableBodyValueId}>{course.id}</td>
                        <td>{course.name}</td>
                        <td>{course.id_kaptiva}</td>
                        <td>{dateFormat(course.due_date.toString())}</td>
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
            totalItems={coursesListValues.length}
            paginate={paginate}
        />
        </div>
    )
}