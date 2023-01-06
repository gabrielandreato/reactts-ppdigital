import IBotao from '../../interfaces/IBotao'
import styles from './Botao.module.css'

const Botao = ({onClick, type, children}: IBotao) => {
    return(
        <button className={styles.Botao} onClick={onClick} type={type}>
            {children}
        </button>
    )
}
export default Botao