import FormLogin from "./FormLogin";
import styles from './PaginaLogin.module.css'

const PaginaLogin = () => {
    return(

        <div className={styles.formLogin}>
            <div className={styles.corpoForm}>
                <FormLogin/>
            </div>
        </div>
    )
}

export default PaginaLogin