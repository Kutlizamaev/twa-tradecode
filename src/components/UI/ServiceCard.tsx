import styles from './UIStyles.module.css'
import BybitEyeLogo from '../../assets/icons/logo/BybitEyeLogoIcon.svg?react'
import PDFCheckerLogo from '../../assets/icons/logo/PDFCheckerLogoIcon.svg?react'
import HTXEyeLogo from '../../assets/icons/logo/HTXEyeLogoIcon.svg?react'

import ServiceQuestionIcon from '../../assets/icons/ui/ServiceQuestionIcon.svg?react'

type ServiceCardProps = {
    name: string
}

const services = [
    {
        name: 'ByBit Eye',
        description: 'Аналитика и контроль сделок на бирже ByBit',
        buttonText: 'Добавить доступы',
        Icon: BybitEyeLogo,
        telegramPostLink: 'https://t.me/Trade_Code/45',
    },
    {
        name: 'PDF Checker',
        description:
            'Проверка документов и писем на подлинность и корректность',
        buttonText: 'Добавить лимиты',
        Icon: PDFCheckerLogo,
        telegramPostLink: 'https://t.me/Trade_Code/4',
    },
    {
        name: 'HTX Eye',
        description: 'Аналитика и контроль сделок на бирже HTX',
        buttonText: 'Добавить доступы',
        Icon: HTXEyeLogo,
        telegramPostLink: 'https://t.me/Trade_Code/111',
    },
]

const ServiceCard = ({ name }: ServiceCardProps) => {
    const currentServiceCard = services.find((service) => service.name === name)

    const openTelegramPost = (link: string) => {
        if (window?.Telegram?.WebApp?.openTelegramLink) {
            window.Telegram.WebApp.openTelegramLink(link)
        } else {
            window.open(link, '_blank')
        }
    }

    return (
        <article className={styles.serviceCard}>
            <header className={styles.serviceHeader}>
                <div className={styles.serviceLogo}>
                    {currentServiceCard?.Icon && <currentServiceCard.Icon />}
                </div>
                <div className={styles.serviceHeaderText}>
                    <div className={styles.serviceTitleRow}>
                        <h3 className={styles.serviceTitle}>
                            {currentServiceCard?.name}
                        </h3>
                        <div
                            onClick={() => {
                                openTelegramPost(
                                    currentServiceCard?.telegramPostLink || ''
                                )
                            }}
                            className={styles.questionBtn}
                        >
                            <ServiceQuestionIcon />
                        </div>
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
