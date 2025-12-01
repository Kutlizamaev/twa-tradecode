import { useState } from 'react'
import styles from './PaymentPage.module.css'

import UsdtIcon from '../../assets/icons/ui/UsdtIcon.svg'
import CopyIcon from '../../assets/icons/ui/CopyIcon.svg'
import WarningIcon from '../../assets/icons/ui/WarningIcon.svg'

import PageHeader from '../../components/UI/PageHeader'

const PaymentPage = () => {
    const [amount] = useState(100)
    const recipientUid = '283897690'
    const senderUid = '332182940'

    const amountFormatted = amount.toFixed(2)
    const [intPart, decimalPart] = amountFormatted.split('.')

    return (
        <div className={styles.page}>
            <main className={styles.content}>
                <section className={styles.cardPrimary}>
                    <PageHeader title="Оплата" showBackButton />
                    <div className={styles.paymentCardContainer}>
                        <div className={styles.paymentCard}>
                            <div className={styles.paymentHeaderRow}>
                                <div>
                                    <div className={styles.fieldLabel}>
                                        Сумма перевода
                                    </div>
                                    <div className={styles.amountRow}>
                                        <span className={styles.amountInt}>
                                            {intPart}
                                        </span>
                                        <span className={styles.amountDecimal}>
                                            .{decimalPart}
                                        </span>
                                        <div className={styles.amountAsset}>
                                            <img src={UsdtIcon} alt="USDT" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.uidBlock}>
                                <div className={styles.uidRow}>
                                    <div className={styles.fieldLabel}>
                                        UID получателя
                                    </div>
                                    <div className={styles.uidValue}>
                                        {recipientUid}
                                    </div>
                                </div>

                                <button
                                    className={styles.iconButton}
                                    type="button"
                                >
                                    <img src={CopyIcon} alt="" />
                                </button>
                            </div>

                            <div className={styles.uidBlock}>
                                <div className={styles.uidRow}>
                                    <div className={styles.fieldLabel}>
                                        UID отправки
                                    </div>
                                    <div className={styles.uidValue}>
                                        {senderUid}
                                    </div>
                                </div>
                                <button
                                    className={styles.iconButton}
                                    type="button"
                                >
                                    <img src={CopyIcon} alt="" />
                                </button>
                            </div>

                            <div className={styles.notice}>
                                <img
                                    className={styles.noticeIcon}
                                    src={WarningIcon}
                                    alt=""
                                />
                                <div className={styles.noticeText}>
                                    <div className={styles.noticeTitle}>
                                        <span>Переводите только</span>
                                        <span>со своего UID</span>
                                    </div>
                                    <div className={styles.noticeSubtitle}>
                                        Иначе платёж не пройдёт
                                    </div>
                                </div>
                            </div>

                            <div className={styles.statusBlock}>
                                <div className={styles.fieldLabel}>Статус</div>
                                <div className={styles.statusValue}>
                                    Оплата в процессе
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className={styles.bottomBar}>
                    <p>Изменить</p>
                    <div className={styles.submitButtonsContainer}>
                        <button type="button" className={styles.submitButton}>
                            UID
                        </button>
                        <button type="button" className={styles.submitButton}>
                            Метод оплаты
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default PaymentPage
