import styles from './UIStyles.module.css'
import BybitEyeLogo from '../../assets/icons/logo/BybitEyeLogoIcon.svg?react'
import PDFCheckerLogo from '../../assets/icons/logo/PDFCheckerLogoIcon.svg?react'
import HTXEyeLogo from '../../assets/icons/logo/HTXEyeLogoIcon.svg?react'

import BBELogo from '../../assets/icons/logo/BybitEyeLogoIcon.png'

type ServiceCardProps = {
    name: string
}

const services = [
    {
        name: 'Bybit Eye',
        description: 'Аналитика и контроль сделок на бирже ByBit',
        buttonText: 'Добавить доступы',
        Icon: BybitEyeLogo,
    },
    {
        name: 'PDF Checker',
        description:
            'Проверка документов и писем на подлинность и корректность',
        buttonText: 'Добавить лимиты',
        Icon: PDFCheckerLogo,
    },
    {
        name: 'HTX Eye',
        description: 'Аналитика и контроль сделок на бирже HTX',
        buttonText: 'Добавить доступы',
        Icon: HTXEyeLogo,
    },
]

const ServiceCard = ({ name }: ServiceCardProps) => {
    const currentServiceCard = services.find((service) => service.name === name)

    return (
        <article className={styles.serviceCard}>
            <header className={styles.serviceHeader}>
                <div className={styles.serviceLogo}>
                    {currentServiceCard?.Icon && <currentServiceCard.Icon />}
                    {/* <img src={BBELogo} alt="" /> */}
                </div>
                <div className={styles.serviceHeaderText}>
                    <div className={styles.serviceTitleRow}>
                        <h3 className={styles.serviceTitle}>
                            {currentServiceCard?.name}
                        </h3>
                        <span className={styles.serviceDot} />
                    </div>
                    <p className={styles.serviceDescription}>
                        {currentServiceCard?.description}
                    </p>
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
                {currentServiceCard?.buttonText}
            </button>
        </article>
    )
}

export default ServiceCard
