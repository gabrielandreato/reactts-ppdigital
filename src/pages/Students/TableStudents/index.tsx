import styles from "./TableStudents.module.css";
import {BotaoNavBar} from "../../../components/BotaoNavBar";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {studentList} from "../../../state/atom";
import {useEffect, useState} from "react";
import axios from "axios";
import IStudent from "../../../interfaces/IStudent";

export const TableStudents = () => {

    const [studentListState, setStudentListState] = useRecoilState<IStudent[]>(studentList);


    useEffect(() => {
    axios.get('http://localhost:8000/funcionarios/')
        .then(response => {setStudentListState(response.data)
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
            {studentListState.map(
                student => (
                    <tr className={styles.TableBodyValue} key={student.id}>
                        <td className={styles.TableBodyValueId}>{student.id}</td>
                        <td>{student.name}</td>
                        {/*<td>{student.manager}</td>*/}
                        <td>
                            <BotaoNavBar>Editar</BotaoNavBar>
                            <BotaoNavBar>Excluir</BotaoNavBar>
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