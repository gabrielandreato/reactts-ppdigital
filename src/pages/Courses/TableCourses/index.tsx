import styles from "./TableCourses.module.css";
import {BotaoNavBar} from "../../../components/BotaoNavBar";
import {useRecoilValue} from "recoil";
import {courseList} from "../../../state/atom";

export const TableCourses = () => {

    const listaCursos = useRecoilValue(courseList)

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
            {listaCursos.map(
                course => (
                    <tr className={styles.TableBodyValue} key={course.id}>
                        <td className={styles.TableBodyValueId}>{course.id}</td>
                        <td>{course.course}</td>
                        {/*<td>{course.data_final.getDate()}</td>*/}
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