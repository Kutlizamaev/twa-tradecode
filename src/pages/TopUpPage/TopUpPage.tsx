import { useState } from 'react'
import styles from './TopUpPage.module.css'
import UsdtIcon from '../../assets/icons/ui/UsdtIcon.svg'
import PageHeader from '../../components/UI/PageHeader'

const QUICK_AMOUNTS = [10, 25, 50, 100, 500]

const TopUpPage = () => {
    const [amount, setAmount] = useState(0)
    const [method, setMethod] = useState<'UID' | 'Bep20' | 'TRC20'>('UID')

    const handleChangeAmount = (value: number) => {
        if (Number.isNaN(value) || value < 0) return
        setAmount(value)
    }

    const handleQuickAdd = (value: number) => {
        setAmount((prev) => prev + value)
    }

    const handleSubmit = () => {
        if (!amount) return
        console.log('Пополнить на', amount, 'методом', method)
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
                        {['UID', 'Bep20', 'TRC20'].map((item) => (
                            <button
                                key={item}
                                className={`${styles.methodItem} ${
                                    method === item
                                        ? styles.methodItemActive
                                        : ''
                                }`}
                                onClick={() =>
                                    setMethod(item as 'UID' | 'Bep20' | 'TRC20')
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
                    disabled={!amount}
                    onClick={handleSubmit}
                >
                    Пополнить счёт
                </button>
            </div>
        </div>
    )
}

export default TopUpPage
