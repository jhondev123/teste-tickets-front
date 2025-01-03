import styles from "./page.module.css";

export default function Page() {
    return (
        <div className={styles.page}>
            <div className={styles.menu}>
                <a className={styles.btnMenu} href={"home"}>Ver Projeto</a>
                <a className={styles.btnMenu} href={"https://google.com"}>Github Geral</a>
                <a className={styles.btnMenu} href={"https://google.com"}>Github Front-End</a>
                <a className={styles.btnMenu} href={"https://github.com/jhondev123/teste-tickets-back"}>Github Back-End</a>
                <a className={styles.btnMenu} href={"https://google.com"}>Swagger</a>
                <a className={styles.btnMenu} href={"https://www.jhonattancurtarelli.com.br"}>Meu Portfólio</a>
            </div>
        </div>
    );
}
