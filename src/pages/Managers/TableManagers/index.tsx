import styles from "./TableManagers.module.css";
import {BotaoNavBar} from "../../../components/BotaoNavBar";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {courseList, filteredCourseList} from "../../../state/atom";
import {useEffect} from "react";
import {http} from "../../../http";
import IStudent from "../../../interfaces/IStudent";
import {useNavigate} from "react-router-dom";

export const TableManagers = () => {

    const managersListValues = useRecoilValue<IStudent[]>(filteredCourseList)
    const setManagersListValues = useSetRecoilState<IStudent[]>(courseList)

    const navigate = useNavigate();

    useEffect(() => {
        http.get('gestores/')
            .then(response => setManagersListValues(response.data))

    }, [])

    return (
        <div className={styles.Content}>
        <table className={styles.Table}>
            <thead className={styles.TableHead}>
            <tr className={styles.TableHeadValue}>
                <th className={styles.TableHeadValueId}>ID</th>
                <th>Nome do Gestor</th>
                <th className={styles.TableHeadValueFunctions}>Funções</th>
            </tr>

            </thead>
            <tbody className={styles.TableBody}>
            {managersListValues.map(
                manager => (
                    <tr className={styles.TableBodyValue} key={manager.id}>
                        <td className={styles.TableBodyValueId}>{manager.id}</td>
                        <td>{manager.name}</td>
                        <td>
                            <BotaoNavBar onClick={() => navigate(`/pagina-principal/formulario-gestor/${manager.id}/`)}>Editar</BotaoNavBar>
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