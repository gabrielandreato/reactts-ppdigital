import styles from './PageNotFound.module.css'
import {Link, useNavigate} from "react-router-dom";

/* Component to not found routes */
export const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <section className={styles.Body}>
            <div className={styles.BodyWrapper}>
                <h1 className={styles.Title}>404 Pagina não encontrada.</h1>
                <h3 className={styles.SubTitle}>Não conseguimos encontrar esta pagina.</h3>
                <p className={styles.Text}>Em caso de duvida favor procurar o suporte.<a href="#">"gabriel.andreato@minervafoods.com"</a></p>
                <Link to={'/'} className={styles.Link}>Retornar</Link>
            </div>
        </section>
    )
}