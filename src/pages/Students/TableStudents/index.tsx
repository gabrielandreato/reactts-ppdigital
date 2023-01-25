import styles from "./TableStudents.module.css";
import {BotaoNavBar} from "../../../components/BotaoNavBar";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {studentList, filteredStudentList} from "../../../state/atomStudent";
import React, {useEffect, useState} from "react";
import IStudent from "../../../interfaces/IStudent";
import {http} from "../../../http";
import {useNavigate} from "react-router-dom";
import {Pagination} from "../../../components/Pagination/Pagination";


export const TableStudents = () => {

    // States for pagination

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);


    const setStudentListState = useSetRecoilState<IStudent[]>(studentList);
    const filteredStudentListSelector = useRecoilValue(filteredStudentList)

    const navigate = useNavigate();

    useEffect(() => {
        http.get('alunos/')
            .then(response => {
                setStudentListState(response.data)
            })
    }, [])

    // Get current Post
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentStudents = filteredStudentListSelector.slice(indexOfFirstPost, indexOfLastPost);

    //Change Page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)


    return (
        <div className={styles.Content}>

            <table className={styles.Table}>
                <thead className={styles.TableHead}>
                <tr className={styles.TableHeadValue}>
                    <th className={styles.TableHeadValueId}>ID</th>
                    <th>Aluno:</th>
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
                            {/*<td>{student.manager}</td>*/}
                            <td>
                                <BotaoNavBar onClick={() => navigate(`/pagina-principal/formulario-aluno/${student.id}`)}>Editar</BotaoNavBar>
                                <BotaoNavBar>Inativar</BotaoNavBar>
                            </td>
                        </tr>
                )
                )}
                </tbody>
            </table>
            {/*<ul className={styles.TableFoot}>*/}
            {/*    <li> Anterior</li>*/}
            {/*    <li>Proxima</li>*/}
            {/*</ul>*/}
            <Pagination itemsPerPage={postsPerPage} totalItems={filteredStudentListSelector.length} paginate={paginate} />
        </div>
    )
}