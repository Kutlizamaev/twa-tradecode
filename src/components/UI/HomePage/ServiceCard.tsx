import styles from '../UIStyles.module.css'
import BybitEyeLogo from '../../../assets/icons/logo/BybitEyeLogoIcon.svg'
import PDFCheckerLogo from '../../../assets/icons/logo/PDFCheckerLogoIcon.svg'
import HTXEyeLogo from '../../../assets/icons/logo/HTXEyeLogoIcon.svg'

import ServiceQuestionIcon from '../../../assets/icons/ui/ServiceQuestionIcon.svg?react'

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

const active = 34
const ending = 12
const ended = 12
const notActivated = 34

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
                    <img
                        src={currentServiceCard?.Icon}
                        alt={currentServiceCard?.name}
                    />
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
                        <span className={styles.serviceStatLabel}>
                            <div
                                className={styles.serviceStatsDot}
                                style={{ background: '#61D977' }}
                            ></div>
                            Действует
                        </span>
                        <div className={styles.serviceStatValue}>34</div>
                    </div>
                    <div>
                        <span className={styles.serviceStatLabel}>
                            <div
                                className={styles.serviceStatsDot}
                                style={{ background: '#D99561' }}
                            ></div>
                            Заканчивается
                        </span>
                        <div className={styles.serviceStatValue}>12</div>
                    </div>
                    <div>
                        <span className={styles.serviceStatLabel}>
                            <div
                                className={styles.serviceStatsDot}
                                style={{ background: '#D96169' }}
                            ></div>
                            Закончились
                        </span>
                        <div className={styles.serviceStatValue}>12</div>
                    </div>
                    <div>
                        <span className={styles.serviceStatLabel}>
                            <div
                                className={styles.serviceStatsDot}
                                style={{ background: '#C3C5D9' }}
                            ></div>
                            Не активированы
                        </span>
                        <div className={styles.serviceStatValue}>34</div>
                    </div>
                </div>

                <div className={styles.serviceProgress}>
                    {active > 0 && (
                        <div
                            className={`${styles.serviceProgressBar} ${styles.serviceProgressGreen}`}
                            style={{ flexGrow: active }}
                        />
                    )}
                    {ending > 0 && (
                        <div
                            className={`${styles.serviceProgressBar} ${styles.serviceProgressOrange}`}
                            style={{ flexGrow: ending }}
                        />
                    )}
                    {ended > 0 && (
                        <div
                            className={`${styles.serviceProgressBar} ${styles.serviceProgressRed}`}
                            style={{ flexGrow: ended }}
                        />
                    )}
                    {notActivated > 0 && (
                        <div
                            className={`${styles.serviceProgressBar} ${styles.serviceProgressGray}`}
                            style={{ flexGrow: notActivated }}
                        />
                    )}
                </div>
            </div>

            <button className={styles.serviceButton}>
                {currentServiceCard?.buttonText}
            </button>
        </article>
    )
}

export default ServiceCard
