import styles from "./TableRegistration.module.css";
import {BotaoNavBar} from "../../../components/BotaoNavBar";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {filteredRegistrationList, registrationList} from "../../../state/atomRegistration";
import {useEffect} from "react";
import {http} from "../../../http";
import IRegistration from "../../../interfaces/IRegistration";
import {useNavigate} from "react-router-dom";

export const TableRegistration = () => {

    const registrationListValues = useRecoilValue<IRegistration[]>(filteredRegistrationList)
    const setRegistrationListValues = useSetRecoilState<IRegistration[]>(registrationList)

    const navigate = useNavigate();

    useEffect(() => {
        http.get('matriculas/')
            .then(response => setRegistrationListValues(response.data))
    }, [setRegistrationListValues])

        const deleteRegistration = (registration: IRegistration) => {

        if (window.confirm(`Deseja realmente excluir a matricula de ${registration.course_name} para ${registration.student_name} ?`)) {
            http.delete(`matriculas/${registration.id}/`)
                .then(() => setRegistrationListValues(registrationListValues.filter(item => item.id !== registration.id)))
                .catch(() => alert('Não foi possivel excluir esse curso para este cargo.'))
        }
    }

    return (
        <div className={styles.Content}>
        <table className={styles.Table}>
            <thead className={styles.TableHead}>
            <tr className={styles.TableHeadValue}>
                <th className={styles.TableHeadValueId}>ID</th>
                <th>Curso</th>
                <th>Aluno</th>
                <th className={styles.TableHeadValueFunctions}>Funções</th>
            </tr>

            </thead>
            <tbody className={styles.TableBody}>
            {registrationListValues.map(
                registration => (
                    <tr className={styles.TableBodyValue} key={registration.id}>
                        <td className={styles.TableBodyValueId}>{registration.id}</td>
                        <td>{registration.course_name}</td>
                        <td>{registration.student_name}</td>
                        {/*<td>{registration.data_final.getDate()}</td>*/}
                        <td>
                            <BotaoNavBar onClick={() => navigate(`/pagina-principal/formulario-matricula/${registration.id}/`)}>Editar</BotaoNavBar>
                            <BotaoNavBar onClick={() => deleteRegistration(registration)}>Excluir</BotaoNavBar>
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