import styles from "./TableCoursesByResponsability.module.css";
import {BotaoNavBar} from "../../../components/BotaoNavBar";
import {useRecoilValue, useSetRecoilState} from "recoil";
import React, {useEffect, useState} from "react";
import http from "../../../http";
import {useNavigate} from "react-router-dom";
import {
    coursesByResponsabilityList,
    filteredCoursesByResponsabilityList
} from "../../../state/atomCourseByResponsability";
import ICourseByResponsability from "../../../interfaces/ICourseByResponsability";
import {Pagination} from "../../../components/Pagination/Pagination";

export const TableCoursesByResponsability = () => {

    const coursesByResponsabilityListValues = useRecoilValue<ICourseByResponsability[]>(filteredCoursesByResponsabilityList)
    const setCoursesByResponsabilityListValues = useSetRecoilState<ICourseByResponsability[]>(coursesByResponsabilityList)

    const navigate = useNavigate();

    // Pagination states
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [coursesByResponsabilityPerPage] = useState<number>(10);
    // Pagination parameters
    const indexOfLastStudent = currentPage * coursesByResponsabilityPerPage
    const indexOfFirstStudent = indexOfLastStudent - coursesByResponsabilityPerPage
    const currentCoursesByResponsability = coursesByResponsabilityListValues.slice(indexOfFirstStudent, indexOfLastStudent);
    //Change Page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    useEffect(() => {
        http.get('matriculas-cargo/')
            .then(response => setCoursesByResponsabilityListValues(response.data))
    }, [setCoursesByResponsabilityListValues])

    const deleteCourseByResponsability = (courseByResponsability: ICourseByResponsability) => {

        if (window.confirm(`Deseja realmente excluir ${courseByResponsability.course_name} para ${courseByResponsability.responsability_name} ?`)) {
            http.delete(`matriculas-cargo/${courseByResponsability.id}/`)
                .then(() => setCoursesByResponsabilityListValues(coursesByResponsabilityListValues.filter(item => item.id !== courseByResponsability.id)))
                .catch(() => alert('Não foi possivel excluir esse curso para este cargo.'))
        }
    }
    //.then(() => setRegistrationListValues(registrationListValues.filter(item => item.id !== registration.id)))
    return (
        <div className={styles.Content}>
        <table className={styles.Table}>
            <thead className={styles.TableHead}>
            <tr className={styles.TableHeadValue}>
                <th className={styles.TableHeadValueId}>ID</th>
                <th>Nome do Cargo</th>
                <th>Nome do Curso</th>
                <th className={styles.TableHeadValueFunctions}>Funções</th>
            </tr>

            </thead>
            <tbody className={styles.TableBody}>
            {currentCoursesByResponsability.map(
                courseByResponsability => (
                    <tr className={styles.TableBodyValue} key={courseByResponsability.id}>
                        <td className={styles.TableBodyValueId}>{courseByResponsability.id}</td>
                        <td>{courseByResponsability.responsability_name}</td>
                        <td>{courseByResponsability.course_name}</td>
                        <td>
                            <BotaoNavBar onClick={() => navigate(`/pagina-principal/formulario-curso-cargo/${courseByResponsability.id}/`)}>Editar</BotaoNavBar>
                            <BotaoNavBar onClick={() => deleteCourseByResponsability(courseByResponsability)}>Excluir</BotaoNavBar>
                        </td>
                    </tr>
                )
            )}
            </tbody>
        </table>
            <Pagination
                itemsPerPage={coursesByResponsabilityPerPage}
                totalItems={coursesByResponsabilityListValues.length}
                paginate={paginate}
            />
        </div>
    )
}