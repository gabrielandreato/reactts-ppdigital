import styles from './PageNotFound.module.css'
import img from "./assets/not_found.svg"
import {Link, useNavigate} from "react-router-dom";

/* Component to not found routes */
export const PageNotFound = () => {
    const navigate = useNavigate();

    return (
    <main className={styles.not_found}>
        <h1 className={`${styles.main__title} ${styles.not_found__title}`}>Erro 404 - Página não encontrada</h1>
        <section className={styles.not_found__content}>
            <img className={`${styles.not_found__image} ${styles.not_found__content_item}`} src={img} alt=""/>
            <div className={`${styles.content__description} ${styles.not_found__content_item}`}>
                <h2 className={styles.description__title}>404</h2>
                <h2 className={`${styles.main__title} ${styles.description__subtitle}`}>Página não encontrada</h2>
                <p className={styles.description__paragraph}>Parece que você pode ter tomado um rumo errado.
                    Não se preocupe... acontece com os melhores de nós.
                    Aqui está uma pequena dica que pode ajudá-lo a voltar aos trilhos</p>
                <button onClick={() => navigate('/')} className={styles.btn_red}>Voltar a página inicial</button>
            </div>
        </section>
    </main> 
    )
}