import styles from "./BotaoNavBar.module.css";
import IBotao from "../../interfaces/IBotao";


export const BotaoNavBar = ({onClick, type, children}: IBotao) => {
    return (
        <button className={styles.BotaoNavBar} onClick={onClick}>
            {children}
        </button>
    )
}