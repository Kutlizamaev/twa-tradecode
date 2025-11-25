import { useState } from 'react'
import styles from './SubscriptionsPage.module.css'

import CheckMarkGreenIcon from '../../assets/icons/ui/CheckMarkGreenIcon.svg'
import CheckMarkRedIcon from '../../assets/icons/ui/CheckMarkRedIcon.svg'
import DropdownIcon from '../../assets/icons/ui/DropdownIcon.svg'

export const SubscriptionsPage = () => {
    const [isBybitOpen, setIsBybitOpen] = useState(true)
    const [isPdfOpen, setIsPdfOpen] = useState(true)

    const [isClosingBybit, setIsClosingBybit] = useState(false)
    const [isClosingPdf, setIsClosingPdf] = useState(false)

    return (
        <div className={styles.page}>
            <div className={styles.pageInner}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Подписки</h1>

                    <button className={styles.segmentedButton}>
                        ByBit Eye
                    </button>
                    <button className={styles.segmentedButton}>
                        PDF Checker
                    </button>
                </div>

                <div className={styles.content}>
                    {/* ByBit Eye */}
                    <section className={styles.serviceSection}>
                        <header
                            className={`${styles.serviceHeader} ${
                                isBybitOpen ? styles.serviceHeaderIsOpen : ''
                            } ${
                                isClosingBybit
                                    ? styles.serviceHeaderClosing
                                    : ''
                            }`}
                        >
                            <span className={styles.serviceName}>
                                ByBit Eye
                            </span>

                            <button
                                className={`${styles.serviceToggle} ${
                                    isBybitOpen ? styles.serviceToggleOpen : ''
                                }`}
                                onClick={() => {
                                    if (isBybitOpen) {
                                        setIsClosingBybit(true)
                                        setIsBybitOpen(false)
                                        setTimeout(
                                            () => setIsClosingBybit(false),
                                            300
                                        )
                                    } else {
                                        setIsBybitOpen(true)
                                    }
                                }}
                            >
                                <span className={styles.serviceToggleIcon}>
                                    <img src={DropdownIcon} alt="" />
                                </span>
                            </button>
                        </header>

                        <div
                            className={`${styles.serviceBody} ${
                                isBybitOpen
                                    ? styles.serviceBodyOpen
                                    : styles.serviceBodyClosed
                            } ${
                                isClosingBybit ? styles.closing : styles.opening
                            }`}
                        >
                            <article className={styles.subscriptionCard}>
                                <div className={styles.subscriptionHeader}>
                                    <span className={styles.subscriptionTitle}>
                                        Zelimxan
                                    </span>
                                    <span className={styles.subscriptionUid}>
                                        UID: 321 32 91 23
                                    </span>
                                </div>

                                <div className={styles.subscriptionRow}>
                                    <div className={styles.subscriptionStatus}>
                                        <img src={CheckMarkGreenIcon} alt="" />
                                        <div
                                            className={
                                                styles.subscriptionStatusTextContainer
                                            }
                                        >
                                            <p
                                                className={
                                                    styles.subscriptionStatusText
                                                }
                                            >
                                                Действует
                                            </p>
                                            <p
                                                className={
                                                    styles.subscriptionStatusSubtext
                                                }
                                            >
                                                Ещё 5 дн.
                                            </p>
                                        </div>
                                    </div>

                                    <div className={styles.subscriptionPills}>
                                        <div className={styles.pillNeutral}>
                                            <p>+7 дн</p>
                                            <span className={styles.pillAccent}>
                                                $10
                                            </span>
                                        </div>
                                        <span className={styles.pillNeutral}>
                                            <p>+30 дн</p>
                                            <span className={styles.pillAccent}>
                                                $30
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </article>
                            <article
                                className={`${styles.subscriptionCard} ${styles.subscriptionCardActive}`}
                            >
                                <div className={styles.subscriptionHeader}>
                                    <span className={styles.subscriptionTitle}>
                                        Zelimxan
                                    </span>
                                    <span className={styles.subscriptionUid}>
                                        UID: 321 32 91 23
                                    </span>
                                </div>

                                <div className={styles.subscriptionRow}>
                                    <div className={styles.subscriptionStatus}>
                                        <img src={CheckMarkGreenIcon} alt="" />
                                        <div
                                            className={
                                                styles.subscriptionStatusTextContainer
                                            }
                                        >
                                            <p
                                                className={
                                                    styles.subscriptionStatusText
                                                }
                                            >
                                                Действует
                                            </p>
                                            <p
                                                className={
                                                    styles.subscriptionStatusSubtext
                                                }
                                            >
                                                Ещё 5 дн.
                                            </p>
                                        </div>
                                    </div>

                                    <div className={styles.subscriptionPills}>
                                        <div
                                            className={`${styles.pillNeutral} ${styles.pillNeutralActive}`}
                                        >
                                            <p>+7 дн</p>
                                            <span
                                                className={`${styles.pillAccent} ${styles.pillAccentActive}`}
                                            >
                                                $10
                                            </span>
                                        </div>
                                        <span className={styles.pillNeutral}>
                                            <p>+30 дн</p>
                                            <span className={styles.pillAccent}>
                                                $30
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </article>
                            <article className={styles.subscriptionCard}>
                                <div className={styles.subscriptionHeader}>
                                    <span className={styles.subscriptionTitle}>
                                        Zelimxan
                                    </span>
                                    <span className={styles.subscriptionUid}>
                                        UID: 321 32 91 23
                                    </span>
                                </div>

                                <div className={styles.subscriptionRow}>
                                    <div
                                        className={`${styles.subscriptionStatus} ${styles.subscriptionStatusExpired}`}
                                    >
                                        <img src={CheckMarkRedIcon} alt="" />
                                        <div
                                            className={
                                                styles.subscriptionStatusTextContainer
                                            }
                                        >
                                            <p
                                                className={`${styles.subscriptionStatusText} ${styles.subscriptionStatusTextExpired}`}
                                            >
                                                Не действует
                                            </p>
                                        </div>
                                    </div>

                                    <div className={styles.subscriptionPills}>
                                        <div className={styles.pillNeutral}>
                                            <p>+7 дн</p>
                                            <span className={styles.pillAccent}>
                                                $10
                                            </span>
                                        </div>
                                        <span className={styles.pillNeutral}>
                                            <p>+30 дн</p>
                                            <span className={styles.pillAccent}>
                                                $30
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </article>
                            <article
                                className={`${styles.subscriptionCard} ${styles.subscriptionCardActive}`}
                            >
                                <div className={styles.subscriptionHeader}>
                                    <span className={styles.subscriptionTitle}>
                                        Zelimxan
                                    </span>
                                    <span className={styles.subscriptionUid}>
                                        UID: 321 32 91 23
                                    </span>
                                </div>

                                <div className={styles.subscriptionRow}>
                                    <div
                                        className={`${styles.subscriptionStatus} ${styles.subscriptionStatusExpired}`}
                                    >
                                        <img src={CheckMarkRedIcon} alt="" />
                                        <div
                                            className={
                                                styles.subscriptionStatusTextContainer
                                            }
                                        >
                                            <p
                                                className={`${styles.subscriptionStatusText} ${styles.subscriptionStatusTextExpired}`}
                                            >
                                                Не действует
                                            </p>
                                        </div>
                                    </div>

                                    <div className={styles.subscriptionPills}>
                                        <div className={styles.pillNeutral}>
                                            <p>+7 дн</p>
                                            <span className={styles.pillAccent}>
                                                $10
                                            </span>
                                        </div>
                                        <span
                                            className={`${styles.pillNeutral} ${styles.pillNeutralActive}`}
                                        >
                                            <p>+30 дн</p>
                                            <span
                                                className={`${styles.pillAccent} ${styles.pillAccentActive}`}
                                            >
                                                $30
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </section>

                    {/* PDF Checker */}
                    <section className={styles.serviceSection}>
                        <header
                            className={`${styles.serviceHeader} ${
                                isPdfOpen ? styles.serviceHeaderIsOpen : ''
                            } ${
                                isClosingPdf ? styles.serviceHeaderClosing : ''
                            }`}
                        >
                            <span className={styles.serviceName}>
                                PDF Checker
                            </span>

                            <button
                                className={`${styles.serviceToggle} ${
                                    isPdfOpen ? styles.serviceToggleOpen : ''
                                }`}
                                onClick={() => {
                                    if (isPdfOpen) {
                                        setIsClosingPdf(true)
                                        setIsPdfOpen(false)
                                        setTimeout(
                                            () => setIsClosingPdf(false),
                                            300
                                        )
                                    } else {
                                        setIsPdfOpen(true)
                                    }
                                }}
                            >
                                <span className={styles.serviceToggleIcon}>
                                    <img src={DropdownIcon} alt="" />
                                </span>
                            </button>
                        </header>

                        <div
                            className={`${styles.serviceBody} ${
                                isPdfOpen
                                    ? styles.serviceBodyOpen
                                    : styles.serviceBodyClosed
                            } ${
                                isClosingPdf ? styles.closing : styles.opening
                            }`}
                        >
                            <article className={styles.subscriptionCard}>
                                <div className={styles.subscriptionHeader}>
                                    <span className={styles.subscriptionTitle}>
                                        Zelimxan
                                    </span>
                                    <span className={styles.subscriptionUid}>
                                        UID: 321 32 91 23
                                    </span>
                                </div>

                                <div className={styles.subscriptionRow}>
                                    <div className={styles.subscriptionStatus}>
                                        <img src={CheckMarkGreenIcon} alt="" />
                                        <div
                                            className={
                                                styles.subscriptionStatusTextContainer
                                            }
                                        >
                                            <p
                                                className={
                                                    styles.subscriptionStatusText
                                                }
                                            >
                                                Действует
                                            </p>
                                            <p
                                                className={
                                                    styles.subscriptionStatusSubtext
                                                }
                                            >
                                                Ещё 5 дн.
                                            </p>
                                        </div>
                                    </div>

                                    <div className={styles.subscriptionPills}>
                                        <div className={styles.pillNeutral}>
                                            <p>+7 дн</p>
                                            <span className={styles.pillAccent}>
                                                $10
                                            </span>
                                        </div>
                                        <span className={styles.pillNeutral}>
                                            <p>+30 дн</p>
                                            <span className={styles.pillAccent}>
                                                $30
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </article>
                            <article
                                className={`${styles.subscriptionCard} ${styles.subscriptionCardActive}`}
                            >
                                <div className={styles.subscriptionHeader}>
                                    <span className={styles.subscriptionTitle}>
                                        Zelimxan
                                    </span>
                                    <span className={styles.subscriptionUid}>
                                        UID: 321 32 91 23
                                    </span>
                                </div>

                                <div className={styles.subscriptionRow}>
                                    <div className={styles.subscriptionStatus}>
                                        <img src={CheckMarkGreenIcon} alt="" />
                                        <div
                                            className={
                                                styles.subscriptionStatusTextContainer
                                            }
                                        >
                                            <p
                                                className={
                                                    styles.subscriptionStatusText
                                                }
                                            >
                                                Действует
                                            </p>
                                            <p
                                                className={
                                                    styles.subscriptionStatusSubtext
                                                }
                                            >
                                                Ещё 5 дн.
                                            </p>
                                        </div>
                                    </div>

                                    <div className={styles.subscriptionPills}>
                                        <div
                                            className={`${styles.pillNeutral} ${styles.pillNeutralActive}`}
                                        >
                                            <p>+7 дн</p>
                                            <span
                                                className={`${styles.pillAccent} ${styles.pillAccentActive}`}
                                            >
                                                $10
                                            </span>
                                        </div>
                                        <span className={styles.pillNeutral}>
                                            <p>+30 дн</p>
                                            <span className={styles.pillAccent}>
                                                $30
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </article>
                            <article className={styles.subscriptionCard}>
                                <div className={styles.subscriptionHeader}>
                                    <span className={styles.subscriptionTitle}>
                                        Zelimxan
                                    </span>
                                    <span className={styles.subscriptionUid}>
                                        UID: 321 32 91 23
                                    </span>
                                </div>

                                <div className={styles.subscriptionRow}>
                                    <div
                                        className={`${styles.subscriptionStatus} ${styles.subscriptionStatusExpired}`}
                                    >
                                        <img src={CheckMarkRedIcon} alt="" />
                                        <div
                                            className={
                                                styles.subscriptionStatusTextContainer
                                            }
                                        >
                                            <p
                                                className={`${styles.subscriptionStatusText} ${styles.subscriptionStatusTextExpired}`}
                                            >
                                                Не действует
                                            </p>
                                        </div>
                                    </div>

                                    <div className={styles.subscriptionPills}>
                                        <div className={styles.pillNeutral}>
                                            <p>+7 дн</p>
                                            <span className={styles.pillAccent}>
                                                $10
                                            </span>
                                        </div>
                                        <span className={styles.pillNeutral}>
                                            <p>+30 дн</p>
                                            <span className={styles.pillAccent}>
                                                $30
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </article>
                            <article
                                className={`${styles.subscriptionCard} ${styles.subscriptionCardActive}`}
                            >
                                <div className={styles.subscriptionHeader}>
                                    <span className={styles.subscriptionTitle}>
                                        Zelimxan
                                    </span>
                                    <span className={styles.subscriptionUid}>
                                        UID: 321 32 91 23
                                    </span>
                                </div>

                                <div className={styles.subscriptionRow}>
                                    <div
                                        className={`${styles.subscriptionStatus} ${styles.subscriptionStatusExpired}`}
                                    >
                                        <img src={CheckMarkRedIcon} alt="" />
                                        <div
                                            className={
                                                styles.subscriptionStatusTextContainer
                                            }
                                        >
                                            <p
                                                className={`${styles.subscriptionStatusText} ${styles.subscriptionStatusTextExpired}`}
                                            >
                                                Не действует
                                            </p>
                                        </div>
                                    </div>

                                    <div className={styles.subscriptionPills}>
                                        <div className={styles.pillNeutral}>
                                            <p>+7 дн</p>
                                            <span className={styles.pillAccent}>
                                                $10
                                            </span>
                                        </div>
                                        <span
                                            className={`${styles.pillNeutral} ${styles.pillNeutralActive}`}
                                        >
                                            <p>+30 дн</p>
                                            <span
                                                className={`${styles.pillAccent} ${styles.pillAccentActive}`}
                                            >
                                                $30
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
