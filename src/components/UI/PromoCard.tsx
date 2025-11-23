import styles from './UIStyles.module.css'

const PromoCard = () => {
    return (
        <article className={styles.promoCard}>
            <div className={styles.promoInner}>
                <div className={styles.promoText}>
                    <h3 className={styles.promoTitle}>
                        Запускаем P2P Blacklist
                    </h3>
                    <p className={styles.promoSubtitle}>Вступайте в Telegram</p>
                    <button className={styles.promoButton}>Вступить</button>
                </div>
                <div className={styles.promoImage} />
            </div>
        </article>
    )
}

export default PromoCard
