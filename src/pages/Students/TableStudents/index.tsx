import styles from "../../../components/Table/Table.module.css";
import { BotaoNavBar } from "../../../components/BotaoNavBar";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { filteredStudentList, studentList } from "../../../state/atomStudent";
import React, { useEffect, useState } from "react";
import IStudent from "../../../interfaces/IStudent";
import http from "../../../http";
import { useNavigate, useParams } from "react-router-dom";
import { Pagination } from "../../../components/Pagination/Pagination";


export const TableStudents = () => {

    // States from Recoil
    const [studentListValues, setStudentListValues] = useRecoilState<IStudent[]>(studentList);
    const filteredstudentListValues = useRecoilValue(filteredStudentList)

    const navigate = useNavigate();

    // Pagination states
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [studentsPerPage] = useState<number>(20);
    // Pagination parameters
    const indexOfLastStudent = currentPage * studentsPerPage
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage
    const currentStudents = filteredstudentListValues.slice(indexOfFirstStudent, indexOfLastStudent);

    // Conditional to prevent unhide data when the state has been filtered and pagination in use
    const filteredPaginatedList = filteredstudentListValues.length < studentsPerPage ? filteredstudentListValues : currentStudents

    // Change Page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)


    // Loading data from API
    useEffect(() => {
        http.get('alunos/')
            .then(response => {
                setStudentListValues(response.data)
            })
    }, [])


    const inativaStudent = (id: number) => {
        if (window.confirm('Deseja realmente inativar esse aluno ?')) {
            http.patch(`/alunos/${id}/`, { is_active: false })
                .then(() => alert(`Aluno inativado com sucesso!`))
                .then(() => filteredPaginatedList.filter(item => item.id !== id))
                .then(() => setStudentListValues(studentListValues.filter(item => item.id !== id)))
                .catch(() => alert(`Houve algum problema ao inativar esse aluno`)
                )
        }
    }

    return (
        <div className={styles.Content}>
            <div className={styles.ContentWrapper}>

                <table className={styles.Table}>
                    <thead className={styles.TableHead}>
                        <tr className={styles.TableHeadValue}>
                            <th className={styles.TableHeadValueId}>ID</th>
                            <th>Aluno:</th>
                            <th>Gestor:</th>
                            <th>Cargo:</th>
                            <th>Sub Area:</th>
                            <th className={styles.TableHeadValueFunctions}>Ações</th>
                        </tr>

                    </thead>
                    <tbody className={styles.TableBody}>
                        {filteredPaginatedList.map(
                            student => (
                                <tr className={styles.TableBodyValue} key={student.id}>
                                    <td className={styles.TableBodyValueId}>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.supervisor.name}</td>
                                    <td>{student.responsability.responsability}</td>
                                    <td>{student.subarea.subarea}</td>
                                    <td>
                                        <BotaoNavBar
                                            onClick={() => navigate(`/pagina-principal/formulario-aluno/${student.id}`)}
                                        >Editar</BotaoNavBar>
                                        <BotaoNavBar onClick={() => inativaStudent(student.id)}>Inativar</BotaoNavBar>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <Pagination
                    itemsPerPage={studentsPerPage}
                    totalItems={filteredstudentListValues.length}
                    paginate={paginate}
                />
            </div>
        </div>
    )
}