import { useState } from 'react'
import styles from './TopUpPage.module.css'
import UsdtIcon from '../../assets/icons/ui/UsdtIcon.svg'
import PageHeader from '../../components/UI/PageHeader'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { setPaymentParams } from '../../features/payment/paymentSlice'

const QUICK_AMOUNTS = [10, 25, 50, 100, 500]

const TopUpPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [amount, setAmount] = useState(0)
    const [method, setMethod] = useState<'UID' | 'BEP20' | 'TRC20'>('UID')

    const handleChangeAmount = (value: number) => {
        if (Number.isNaN(value) || value < 0) return
        if (value > 1000000) return
        setAmount(value)
    }

    const handleQuickAdd = (value: number) => {
        if (amount + value > 1000000) return
        setAmount((prev) => prev + value)
    }

    const handleSubmitButton = () => {
        dispatch(setPaymentParams({ amount, method }))
        if (amount !== 0) {
            navigate('/payment')
        }
    }

    return (
        <div className={styles.page}>
            <main className={styles.content}>
                <section className={styles.cardPrimary}>
                    <PageHeader title="Пополнение счёта" showBackButton />

                    <div className={styles.topupForm}>
                        <div className={styles.balanceRow}>
                            <span className={styles.balanceLabel}>
                                ТЕКУЩИЙ БАЛАНС
                            </span>
                            <div className={styles.balanceValueRow}>
                                <span className={styles.balanceCurrency}>
                                    $
                                </span>
                                <span className={styles.balanceValue}>
                                    13720
                                </span>
                                <span className={styles.balanceCents}>.00</span>
                            </div>
                        </div>
                        <div className={styles.topupFormInput}>
                            <div className={styles.sectionTitle}>
                                Сумма пополнения
                            </div>

                            <div className={styles.amountInputWrapper}>
                                <input
                                    className={styles.amountInput}
                                    value={amount}
                                    onChange={(e) =>
                                        handleChangeAmount(
                                            Number(e.target.value)
                                        )
                                    }
                                />
                                <img src={UsdtIcon} alt="" />
                            </div>

                            <div className={styles.quickButtonsRow}>
                                {QUICK_AMOUNTS.map((value) => (
                                    <button
                                        key={value}
                                        type="button"
                                        className={styles.quickButton}
                                        onClick={() => handleQuickAdd(value)}
                                    >
                                        +{value}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.cardSecondary}>
                    <div className={styles.sectionTitle}>Способ пополнения</div>

                    <div className={styles.methodsList}>
                        {['UID', 'BEP20', 'TRC20'].map((item) => (
                            <button
                                key={item}
                                className={`${styles.methodItem} ${
                                    method === item
                                        ? styles.methodItemActive
                                        : ''
                                }`}
                                onClick={() =>
                                    setMethod(item as 'UID' | 'BEP20' | 'TRC20')
                                }
                            >
                                <span
                                    className={`${styles.radioOuter} ${
                                        method === item
                                            ? styles.radioOuterActive
                                            : ''
                                    }`}
                                ></span>
                                <span className={styles.methodLabel}>
                                    {item}
                                </span>
                            </button>
                        ))}
                    </div>
                </section>
            </main>

            <div className={styles.bottomBar}>
                <button
                    type="button"
                    className={styles.submitButton}
                    onClick={handleSubmitButton}
                >
                    Пополнить счёт
                </button>
            </div>
        </div>
    )
}

export default TopUpPage
