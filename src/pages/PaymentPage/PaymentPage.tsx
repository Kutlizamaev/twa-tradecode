import { useState } from 'react'
import styles from './PaymentPage.module.css'

import UsdtIcon from '../../assets/icons/ui/UsdtIcon.svg'
import CopyIcon from '../../assets/icons/ui/CopyIcon.svg'
import WarningIcon from '../../assets/icons/ui/WarningIcon.svg'

import PageHeader from '../../components/UI/PageHeader'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
    selectPaymentAmount,
    selectPaymentMethod,
    setPaymentStatus,
} from '../../features/payment/paymentSlice'

type PaymentMethod = 'UID' | 'BEP20' | 'TRC20'

const PaymentPage = () => {
    const dispatch = useAppDispatch()

    const amount = useAppSelector(selectPaymentAmount)
    const storeMethod = useAppSelector(selectPaymentMethod)

    const [method, setMethod] = useState<PaymentMethod>(storeMethod)

    const handleCheckPayment = async () => {
        dispatch(setPaymentStatus('processing'))
        await new Promise((res) => setTimeout(res, 1000))
        dispatch(setPaymentStatus('success'))
    }

    const recipientUid = '283897690'
    const recipientBep20Address = '0xb10b3da81748bd50792ee02203a3f541c20c0a25'
    const recipientTrc20Address = 'TNmqb10b3da81748bd50792ee02203a3f541c20'

    const senderUid = '332182940'

    const amountFormatted = amount.toFixed(2)
    const [intPart, decimalPart] = amountFormatted.split('.')

    const getRecipientValue = () => {
        if (method === 'UID') return recipientUid
        if (method === 'BEP20') return recipientBep20Address
        return recipientTrc20Address
    }

    const noticeText =
        method === 'UID'
            ? 'Переводите только со своего UID'
            : 'Переводите только на адрес выше'

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

                            {method === 'UID' ? (
                                <>
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
                                </>
                            ) : (
                                <>
                                    <div className={styles.uidBlock}>
                                        <div className={styles.uidRow}>
                                            <div className={styles.fieldLabel}>
                                                Адрес получателя
                                            </div>
                                            <div
                                                className={styles.addressValue}
                                            >
                                                <p>{getRecipientValue()}</p>
                                            </div>
                                        </div>
                                        <button
                                            className={styles.iconButton}
                                            type="button"
                                        >
                                            <img src={CopyIcon} alt="" />
                                        </button>
                                    </div>
                                </>
                            )}

                            <div className={styles.notice}>
                                <img
                                    className={styles.noticeIcon}
                                    src={WarningIcon}
                                    alt=""
                                />
                                <div className={styles.noticeText}>
                                    <div className={styles.noticeTitle}>
                                        <span>{noticeText}</span>
                                    </div>
                                    <div className={styles.noticeSubtitle}>
                                        Иначе платёж не пройдёт
                                    </div>
                                </div>
                            </div>

                            <div className={styles.statusBlock}>
                                <div className={styles.fieldLabel}>Статус</div>
                                <div className={styles.statusValue}>
                                    Ожидание оплаты
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className={styles.bottomBar}>
                    <p>Изменить метод оплаты на:</p>
                    <div className={styles.paymentMethodButtonsContainer}>
                        <button
                            type="button"
                            className={`${styles.paymentMethodButton} ${
                                method === 'UID'
                                    ? styles.paymentMethodButtonActive
                                    : ''
                            }`}
                            onClick={() => setMethod('UID')}
                        >
                            UID
                        </button>

                        <button
                            type="button"
                            className={`${styles.paymentMethodButton} ${
                                method === 'BEP20'
                                    ? styles.paymentMethodButtonActive
                                    : ''
                            }`}
                            onClick={() => setMethod('BEP20')}
                        >
                            BEP20
                        </button>

                        <button
                            type="button"
                            className={`${styles.paymentMethodButton} ${
                                method === 'TRC20'
                                    ? styles.paymentMethodButtonActive
                                    : ''
                            }`}
                            onClick={() => setMethod('TRC20')}
                        >
                            TRC20
                        </button>
                    </div>
                    <button
                        onClick={handleCheckPayment}
                        type="button"
                        className={styles.checkPaymentButton}
                    >
                        Проверить оплату
                    </button>
                </div>
            </main>
        </div>
    )
}

export default PaymentPage
