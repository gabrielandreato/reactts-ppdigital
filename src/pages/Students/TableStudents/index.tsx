import styles from "./TableStudents.module.css";
import {BotaoNavBar} from "../../../components/BotaoNavBar";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {filteredStudentList, studentList} from "../../../state/atomStudent";
import React, {useEffect, useState} from "react";
import IStudent from "../../../interfaces/IStudent";
import {http} from "../../../http";
import {useNavigate} from "react-router-dom";
import {Pagination} from "../../../components/Pagination/Pagination";


export const TableStudents = () => {

    // States from Recoil
    const setStudentListValues = useSetRecoilState<IStudent[]>(studentList);
    const studentListValues = useRecoilValue(filteredStudentList)

    const navigate = useNavigate();

    // Pagination states
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [studentsPerPage] = useState<number>(10);
    // Pagination parameters
    const indexOfLastStudent = currentPage * studentsPerPage
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage
    const currentStudents = studentListValues.slice(indexOfFirstStudent, indexOfLastStudent);
    //Change Page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)


    // Loading data from API
    useEffect(() => {
        http.get('alunos/')
            .then(response => {
                setStudentListValues(response.data)
            })
    }, [])

    return (
        <div className={styles.Content}>

            <table className={styles.Table}>
                <thead className={styles.TableHead}>
                <tr className={styles.TableHeadValue}>
                    <th className={styles.TableHeadValueId}>ID</th>
                    <th>Aluno:</th>
                    <th>Gestor:</th>
                    <th className={styles.TableHeadValueFunctions}>Funções</th>
                </tr>

                </thead>
                <tbody className={styles.TableBody}>
                {currentStudents &&
                    currentStudents.map(
                    student => (
                        <tr className={styles.TableBodyValue} key={student.id}>
                            <td className={styles.TableBodyValueId}>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.supervisor}</td>
                            <td>
                                <BotaoNavBar
                                    onClick={() => navigate(`/pagina-principal/formulario-aluno/${student.id}`)}
                                >Editar</BotaoNavBar>
                                <BotaoNavBar>Inativar</BotaoNavBar>
                            </td>
                        </tr>
                ))}
                </tbody>
            </table>
            <Pagination
                itemsPerPage={studentsPerPage}
                totalItems={studentListValues.length}
                paginate={paginate}
            />
        </div>
    )
}