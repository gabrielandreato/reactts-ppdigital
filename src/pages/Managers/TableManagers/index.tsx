import styles from "./TableManagers.module.css";
import {BotaoNavBar} from "../../../components/BotaoNavBar";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {filteredManagerList, managerList} from "../../../state/atomManager";
import React, {useEffect, useState} from "react";
import http from "../../../http";
import IStudent from "../../../interfaces/IStudent";
import {useNavigate} from "react-router-dom";
import {Pagination} from "../../../components/Pagination/Pagination";

export const TableManagers = () => {

    // States from Recoil
    const setManagersListValues = useSetRecoilState<IStudent[]>(managerList)
    const managersListValues = useRecoilValue<IStudent[]>(filteredManagerList)

    const navigate = useNavigate();

    // Pagination states
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [managersPerPage] = useState<number>(20)
    // Pagination parameters
    const indexOfLastManager = currentPage * managersPerPage
    const indexOfFirstManager = indexOfLastManager - managersPerPage
    const currentManagers = managersListValues.slice(indexOfFirstManager, indexOfLastManager)
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    // conditional to prevent unhide data when the state has been filtered and pagination in use
    const filteredPaginatedList = managersListValues.length < managersPerPage ? managersListValues : currentManagers

    // Loading data from API
    useEffect(() => {
        http.get('gestores/')
            .then(response => setManagersListValues(response.data))
    }, [])

    const inativaManager = (id: number) => {
        if (window.confirm('Deseja realmente inativar esse gestor ?')) {
            http.patch(`/gestores/${id}/`, {is_active: false})
                .then(() => alert(`Gestor inativado com sucesso!`))
                .then(() => filteredPaginatedList.filter(item => item.id !== id))
                .then(() => setManagersListValues(managersListValues.filter(item => item.id !== id)))
                .catch(() => alert(`Houve algum problema ao inativar esse aluno`)
            )
        }
    }



    return (
        <div className={styles.Content}>
        <table className={styles.Table}>
            <thead className={styles.TableHead}>
            <tr className={styles.TableHeadValue}>
                <th className={styles.TableHeadValueId}>ID</th>
                <th>Nome do Gestor</th>
                <th>Cargo</th>
                <th className={styles.TableHeadValueFunctions}>Funções</th>
            </tr>

            </thead>
            <tbody className={styles.TableBody}>
            {filteredPaginatedList.map(
                manager => (
                    <tr className={styles.TableBodyValue} key={manager.id}>
                        <td className={styles.TableBodyValueId}>{manager.id}</td>
                        <td>{manager.name}</td>
                        <td>{manager.responsability.responsability}</td>
                        <td>
                            <BotaoNavBar
                                onClick={() => navigate(`/pagina-principal/formulario-gestor/${manager.id}/`)}
                            >Editar</BotaoNavBar>
                            <BotaoNavBar onClick={() => inativaManager(manager.id)}>Inativar</BotaoNavBar>
                        </td>
                    </tr>
                )
            )}
            </tbody>
        </table>
            <Pagination
                itemsPerPage={managersPerPage}
                totalItems={managersListValues.length}
                paginate={paginate}
            />
        </div>
    )
}