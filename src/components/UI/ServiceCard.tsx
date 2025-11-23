import styles from './UIStyles.module.css'

type ServiceCardProps = {
    name: string
    description: string
    buttonText?: string
}

const ServiceCard = ({ name, description, buttonText }: ServiceCardProps) => {
    return (
        <article className={styles.serviceCard}>
            <header className={styles.serviceHeader}>
                <div className={styles.serviceLogo}>B</div>
                <div className={styles.serviceHeaderText}>
                    <div className={styles.serviceTitleRow}>
                        <h3 className={styles.serviceTitle}>{name}</h3>
                        <span className={styles.serviceDot} />
                    </div>
                    <p className={styles.serviceDescription}>{description}</p>
                </div>
            </header>

            <div className={styles.serviceStatsCard}>
                <h4 className={styles.serviceStatsTitle}>34 подписки</h4>

                <div className={styles.serviceStatsGrid}>
                    <div>
                        <span
                            className={`${styles.serviceStatLabel} ${styles.serviceStatLabelGreen}`}
                        >
                            Действует
                        </span>
                        <span className={styles.serviceStatValue}>34</span>
                    </div>
                    <div>
                        <span
                            className={`${styles.serviceStatLabel} ${styles.serviceStatLabelOrange}`}
                        >
                            Заканчивается
                        </span>
                        <span className={styles.serviceStatValue}>12</span>
                    </div>
                    <div>
                        <span className={styles.serviceStatLabel}>
                            Закончилась
                        </span>
                        <span className={styles.serviceStatValue}>12</span>
                    </div>
                    <div>
                        <span className={styles.serviceStatLabel}>
                            Не активировалась
                        </span>
                        <span className={styles.serviceStatValue}>34</span>
                    </div>
                </div>

                <div className={styles.serviceProgress}>
                    <div
                        className={`${styles.serviceProgressBar} ${styles.serviceProgressGreen}`}
                    />
                    <div
                        className={`${styles.serviceProgressBar} ${styles.serviceProgressOrange}`}
                    />
                    <div
                        className={`${styles.serviceProgressBar} ${styles.serviceProgressGray}`}
                    />
                </div>
            </div>

            <button className={styles.serviceButton}>
                {buttonText ?? 'Добавить доступы'}
            </button>
        </article>
    )
}

export default ServiceCard
