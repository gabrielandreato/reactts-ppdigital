import BarraNavegacao from "./BarraNavegacao";
import BarraLateral from "./BarraLateral";
import {Outlet} from "react-router-dom";
import styles from './PaginaBase.module.css'
import {useState} from "react";
import barraLateral from "./BarraLateral";

const PaginaBase = () => {


    return(
        <div className={styles.paginaBase}>
            <div className={styles.barraNavegacao}>
                <BarraNavegacao />
            </div>
            <div className={`${styles.barraLateral}`}>
                <BarraLateral />
            </div>
            <div className={styles.corpo}>
                <Outlet />
            </div>
        </div>
    )
}
export default PaginaBase