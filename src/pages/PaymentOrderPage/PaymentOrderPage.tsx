import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './PaymentOrderPage.module.css'
import PageHeader from '../../components/UI/PageHeader'
import { useAppSelector } from '../../store/hooks'
import { selectPaymentAmount } from '../../features/payment/paymentSlice'

type PaymentMethod = 'ACCOUNT' | 'UID' | 'BEP20' | 'TRC20'

const PaymentOrderPage = () => {
    const navigate = useNavigate()
    const amount = useAppSelector(selectPaymentAmount)

    const [method, setMethod] = useState<PaymentMethod>('ACCOUNT')

    const handleTopUpClick = () => {
        navigate('/top-up')
    }

    const handlePay = () => {
        if (!method) return

        if (method === 'ACCOUNT') {
            console.log('Pay from account', { amount })
            navigate('/')
            return
        }

        navigate('/payment')
    }

    return (
        <div className={styles.page}>
            <main className={styles.content}>
                <section className={styles.cardPrimary}>
                    <PageHeader title="Оплата" showBackButton />

                    <div className={styles.amountBlock}>
                        <span className={styles.amountLabel}>
                            СУММА К ОПЛАТЕ
                        </span>

                        <div className={styles.amountRow}>
                            <span className={styles.amountCurrency}>$</span>
                            <span className={styles.amountValue}>{amount}</span>
                            <span className={styles.amountCents}>.00</span>
                        </div>
                    </div>
                </section>

                <section className={styles.methodsSection}>
                    <div className={styles.methodsCard}>
                        <h2 className={styles.methodsTitle}>Способ оплаты</h2>
                        <button
                            type="button"
                            className={`${styles.methodRow} ${
                                method === 'ACCOUNT' ? styles.methodActive : ''
                            }`}
                            onClick={() => setMethod('ACCOUNT')}
                        >
                            <div className={styles.methodLeft}>
                                <span
                                    className={`${styles.radioOuter} ${
                                        method === 'ACCOUNT'
                                            ? styles.radioOuterActive
                                            : ''
                                    }`}
                                />
                                <div className={styles.balanceText}>
                                    <span className={styles.balanceTitle}>
                                        С моего счёта
                                    </span>
                                    <span className={styles.balanceSubtitle}>
                                        Баланс: $250
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                className={styles.topUpButton}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleTopUpClick()
                                }}
                            >
                                Пополнить
                            </button>
                        </button>

                        <button
                            type="button"
                            className={`${styles.methodRow} ${
                                method === 'UID' ? styles.methodActive : ''
                            }`}
                            onClick={() => setMethod('UID')}
                        >
                            <div className={styles.methodLeft}>
                                <span
                                    className={`${styles.radioOuter} ${
                                        method === 'UID'
                                            ? styles.radioOuterActive
                                            : ''
                                    }`}
                                />
                                <span className={styles.methodLabel}>UID</span>
                            </div>
                        </button>

                        <button
                            type="button"
                            className={`${styles.methodRow} ${
                                method === 'BEP20' ? styles.methodActive : ''
                            }`}
                            onClick={() => setMethod('BEP20')}
                        >
                            <div className={styles.methodLeft}>
                                <span
                                    className={`${styles.radioOuter} ${
                                        method === 'BEP20'
                                            ? styles.radioOuterActive
                                            : ''
                                    }`}
                                />
                                <span className={styles.methodLabel}>
                                    BEP20
                                </span>
                            </div>
                        </button>

                        <button
                            type="button"
                            className={`${styles.methodRow} ${
                                method === 'TRC20' ? styles.methodActive : ''
                            }`}
                            onClick={() => setMethod('TRC20')}
                        >
                            <div className={styles.methodLeft}>
                                <span
                                    className={`${styles.radioOuter} ${
                                        method === 'TRC20'
                                            ? styles.radioOuterActive
                                            : ''
                                    }`}
                                />
                                <span className={styles.methodLabel}>
                                    TRC20
                                </span>
                            </div>
                        </button>
                    </div>
                </section>

                <section className={styles.bottomDock}>
                    <div className={styles.bottomInner}>
                        <button
                            type="button"
                            className={styles.paymentButton}
                            disabled={!method}
                            onClick={handlePay}
                        >
                            Оплатить
                        </button>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default PaymentOrderPage
