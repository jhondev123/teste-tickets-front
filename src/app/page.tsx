import styles from "./page.module.css";

export default function Page() {
    return (
        <div className={styles.page}>
            <div className={styles.menu}>
                <a className={styles.btnMenu} href={"/employee"}>Ver Projeto</a>
                <a className={styles.btnMenu} href={"https://github.com/jhondev123/teste-tickets"}>Github Geral</a>
                <a className={styles.btnMenu} href={"https://github.com/jhondev123/teste-tickets-front"}>Github Front-End</a>
                <a className={styles.btnMenu} href={"https://github.com/jhondev123/teste-tickets-back"}>Github Back-End</a>
                <a className={styles.btnMenu} href={"https://app.swaggerhub.com/apis-docs/JHONATTANCURTARELLI1/tickets-api/1.0.0"}>Swagger</a>
                <a className={styles.btnMenu} href={"https://www.jhonattancurtarelli.com.br"}>Meu Portfólio</a>
            </div>
        </div>
    );
}
