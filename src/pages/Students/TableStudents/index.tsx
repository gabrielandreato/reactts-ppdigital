import styles from "./TableStudents.module.css";
import {BotaoNavBar} from "../../../components/BotaoNavBar";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {studentList, filteredStudentList} from "../../../state/atom";
import React, {useEffect, useState} from "react";
import IStudent from "../../../interfaces/IStudent";
import {http} from "../../../http";
import {useNavigate} from "react-router-dom";
import ReactPaginate from "react-paginate";


export const TableStudents = () => {


    const setStudentListState = useSetRecoilState<IStudent[]>(studentList);
    const filteredStudentListSelector = useRecoilValue(filteredStudentList)

    const navigate = useNavigate();

    useEffect(() => {
        http.get('alunos/')
            .then(response => {
                setStudentListState(response.data)
            })
    }, [])


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
                {filteredStudentListSelector &&
                    filteredStudentListSelector.map(
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
            <ul className={styles.TableFoot}>
                <li> Anterior</li>
                <li>Proxima</li>
            </ul>
        </div>
    )
}