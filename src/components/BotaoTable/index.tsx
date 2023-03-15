import styles from "./BotaoTable.module.css";
import IBotao from "../../interfaces/IBotao";


export const BotaoTable = ({onClick, type, children}: IBotao) => {
    return (
        <button className={styles.BotaoTable} onClick={onClick}>
            {children}
        </button>
    )
}