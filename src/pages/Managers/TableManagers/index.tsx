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
    const filteredManagersListValues = useRecoilValue<IStudent[]>(filteredManagerList)

    const navigate = useNavigate();

    // Pagination states
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [managersPerPage] = useState<number>(10)
    // Pagination parameters
    const indexOfLastManager = currentPage * managersPerPage
    const indexOfFirstManager = indexOfLastManager - managersPerPage
    const currentManagers = filteredManagersListValues.slice(indexOfFirstManager, indexOfLastManager)
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    // Loading data from API
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
            {currentManagers.map(
                manager => (
                    <tr className={styles.TableBodyValue} key={manager.id}>
                        <td className={styles.TableBodyValueId}>{manager.id}</td>
                        <td>{manager.name}</td>
                        <td>
                            <BotaoNavBar
                                onClick={() => navigate(`/pagina-principal/formulario-gestor/${manager.id}/`)}
                            >Editar</BotaoNavBar>
                            <BotaoNavBar>Inativar</BotaoNavBar>
                        </td>
                    </tr>
                )
            )}
            </tbody>
        </table>
            <Pagination
                itemsPerPage={managersPerPage}
                totalItems={filteredManagersListValues.length}
                paginate={paginate}
            />
        </div>
    )
}