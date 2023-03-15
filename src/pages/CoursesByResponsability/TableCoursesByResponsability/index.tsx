import styles from "../../../components/Table/Table.module.css";
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
import { BotaoTable } from "../../../components/BotaoTable";

export const TableCoursesByResponsability = () => {

    const coursesByResponsabilityListValues = useRecoilValue<ICourseByResponsability[]>(filteredCoursesByResponsabilityList)
    const setCoursesByResponsabilityListValues = useSetRecoilState<ICourseByResponsability[]>(coursesByResponsabilityList)

    const navigate = useNavigate();

    // Pagination states
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [coursesByResponsabilityPerPage] = useState<number>(20);
    // Pagination parameters
    const indexOfLastStudent = currentPage * coursesByResponsabilityPerPage
    const indexOfFirstStudent = indexOfLastStudent - coursesByResponsabilityPerPage
    const currentCoursesByResponsability = coursesByResponsabilityListValues.slice(indexOfFirstStudent, indexOfLastStudent);
    //Change Page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    // conditional to prevent unhide data when the state has been filtered and pagination in use
    const filteredPaginatedList = coursesByResponsabilityListValues.length < coursesByResponsabilityPerPage ?
        coursesByResponsabilityListValues : currentCoursesByResponsability

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
            <div className={styles.ContentWrapper}>
            <table className={styles.Table}>
                <thead className={styles.TableHead}>
                <tr className={styles.TableHeadValue}>
                    <th className={styles.TableHeadValueId}>ID</th>
                    <th>Nome do Cargo</th>
                    <th>Nome do Curso</th>
                    <th className={styles.TableHeadValueFunctions}>Ações</th>
                </tr>

                </thead>
                <tbody className={styles.TableBody}>
                {filteredPaginatedList.map(
                    courseByResponsability => (
                        <tr className={styles.TableBodyValue} key={courseByResponsability.id}>
                            <td className={styles.TableBodyValueId}>{courseByResponsability.id}</td>
                            <td>{courseByResponsability.responsability_name}</td>
                            <td>{courseByResponsability.course_name}</td>
                            <td>
                                <BotaoTable
                                    onClick={() => navigate(`/pagina-principal/formulario-curso-cargo/${courseByResponsability.id}/`)}>
                                        <i className={`bi bi-pencil-square ${styles.TableIcon}`}></i>Editar
                                    </BotaoTable>
                                <BotaoTable
                                    onClick={() => deleteCourseByResponsability(courseByResponsability)}>
                                        <i className={`bi bi-x-circle ${styles.TableIcon}`}></i>Excluir
                                </BotaoTable>
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
            </div>
            
    )
}