import { useNavigate } from 'react-router-dom'
import styles from './HomeUIStyles.module.css'

const BalanceCard = () => {
    const navigate = useNavigate()

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
            <button
                className={styles.balanceButton}
                onClick={() => {
                    navigate('/topup')
                }}
            >
                ПОПОЛНИТЬ
            </button>
        </section>
    )
}

export default BalanceCard
