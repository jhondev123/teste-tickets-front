import styles from "./page.module.css";

export default function Page() {
    return (
        <div className={styles.page}>
            <div className={styles.menu}>
                <a className={styles.btnMenu} href={"/employee"}>Ver Projeto</a>
                <a className={styles.btnMenu} href={"https://google.com"}>Github Geral</a>
                <a className={styles.btnMenu} href={"https://github.com/jhondev123/teste-tickets-front"}>Github Front-End</a>
                <a className={styles.btnMenu} href={"https://github.com/jhondev123/teste-tickets-back"}>Github Back-End</a>
                <a className={styles.btnMenu} href={"http://teste-tickets-api.projetos.jhonattancurtarelli.com.br/api/documentation"}>Swagger</a>
                <a className={styles.btnMenu} href={"https://www.jhonattancurtarelli.com.br"}>Meu Portfólio</a>
            </div>
        </div>
    );
}
