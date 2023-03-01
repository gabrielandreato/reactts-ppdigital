import FormLogin from "./FormLogin";
import logoLg from "./assets/logo-minerva-lg.svg";
import hamArt from "./assets/ham-art.png";
import duxLogo from "./assets/dux.svg";
import styles from "./PaginaLogin.module.css";

const PaginaLogin = () => {

    return (
        <>
        <main className={styles.login__main}>
        <section className={styles.login__wrapper}>
            <div className={`${styles.login__container} ${styles.login__container_art} `}>
                <img className={styles.login__logo} src={logoLg} alt=""/>
                <img className={styles.login__ham_art} src={hamArt} alt=""/>
            </div>
    
            
            <div className={styles.login__container}>
                <div className={styles.login__container_form}>
                    <img className={`${styles.login__logo} ${styles.login__logo_mobile}`} src={logoLg} alt="" />

                            <FormLogin />
                </div>
        </div>
        </section>
        </main>
        <div className={styles.login__bg}>
            <div className={styles.login__bg_red}></div>
            <div className={styles.login__bg_light_blue}></div>
            <div className={styles.login__bg_blue}></div>
        </div>
        </>
    )
}

export default PaginaLogin;