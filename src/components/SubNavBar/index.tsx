import styles from "./SubNavBar.module.css";
import React, {ReactNode} from "react";

interface Props {
  children: React.ReactNode
}


export const SubNavBar = ({children}: Props) => {
    return(
        <div className={styles.Header}>
        <nav className={styles.NavHeader}>
            {children}
        </nav>
        </div>
    )
}
