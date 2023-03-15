import styles from "../../../components/Table/Table.module.css";
import { BotaoNavBar } from "../../../components/BotaoNavBar";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { filteredRegistrationList, registrationList } from "../../../state/atomRegistration";
import React, { useEffect, useState } from "react";
import http from "../../../http";
import IRegistration from "../../../interfaces/IRegistration";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../../../components/Pagination/Pagination";
import { BotaoTable } from "../../../components/BotaoTable";

export const TableRegistration = () => {

    const registrationListValues = useRecoilValue<IRegistration[]>(filteredRegistrationList)
    const setRegistrationListValues = useSetRecoilState<IRegistration[]>(registrationList)

    const navigate = useNavigate();

    // Pagination states
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [registrationsPerPage] = useState<number>(20);
    // Pagination parameters
    const indexOfLastRegistration = currentPage * registrationsPerPage
    const indexOfFirstRegistration = indexOfLastRegistration - registrationsPerPage
    const currentRegistrations = registrationListValues.slice(indexOfFirstRegistration, indexOfLastRegistration);

    // conditional to prevent unhide data when the state has been filtered and pagination in use
    const filteredPaginatedList = registrationListValues.length < registrationsPerPage ? registrationListValues : currentRegistrations


    //Change Page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

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
            <div className={styles.ContentWrapper}>
                <table className={styles.Table}>
                    <thead className={styles.TableHead}>
                        <tr className={styles.TableHeadValue}>
                            <th className={styles.TableHeadValueId}>ID</th>
                            <th>Curso</th>
                            <th>Aluno</th>
                            <th className={styles.TableHeadValueFunctions}>Ações</th>
                        </tr>

                    </thead>
                    <tbody className={styles.TableBody}>
                        {filteredPaginatedList.map(
                            registration => (
                                <tr className={styles.TableBodyValue} key={registration.id}>
                                    <td className={styles.TableBodyValueId}>{registration.id}</td>
                                    <td>{registration.course_name}</td>
                                    <td>{registration.student_name}</td>
                                    <td>
                                        <BotaoTable
                                            onClick={() => navigate(`/pagina-principal/formulario-matricula/${registration.id}/`)}>
                                                <i className={`bi bi-pencil-square ${styles.TableIcon}`}></i>Editar
                                        </BotaoTable>
                                        <BotaoTable onClick={() => deleteRegistration(registration)}>
                                            <i className={`bi bi-x-circle ${styles.TableIcon}`}></i>Excluir</BotaoTable>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
                <Pagination
                    itemsPerPage={registrationsPerPage}
                    totalItems={registrationListValues.length}
                    paginate={paginate}
                />
            </div>
        </div>
    )
}