import styles from './UIStyles.module.css'

const BalanceCard = () => {
    return (
        <section className={styles.balanceCard}>
            <div className={styles.balanceTop}>
                <span className={styles.balanceLabel}>ТЕКУЩИЙ БАЛАНС</span>
                <div className={styles.balanceValueRow}>
                    <span className={styles.balanceCurrency}>$</span>
                    <span className={styles.balanceValue}>13720</span>
                    <span className={styles.balanceCents}>.00</span>
                </div>
            </div>
            <button className={styles.balanceButton}>пополнить</button>
        </section>
    )
}

export default BalanceCard
