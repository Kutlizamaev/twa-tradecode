import { useEffect, useState } from 'react'
import styles from '../ServiceOrderStyles.module.css'
import { useAppDispatch } from '../../../store/hooks'
import { setBybitOrder } from '../../../features/serviceOrder/serviceOrderSlice'

type BybitOrderFormProps = {
    onTotalChange: (total: number) => void
}

const WEEK_PRICE = 10
const MONTH_PRICE = 30

export const BybitOrderForm = ({ onTotalChange }: BybitOrderFormProps) => {
    const dispatch = useAppDispatch()
    const [weekCount, setWeekCount] = useState(0)
    const [monthCount, setMonthCount] = useState(0)

    useEffect(() => {
        const total = weekCount * WEEK_PRICE + monthCount * MONTH_PRICE
        onTotalChange(total)

        dispatch(
            setBybitOrder({
                weekCount: weekCount,
                monthCount: monthCount,
                total: total,
            })
        )
    }, [weekCount, monthCount, onTotalChange, dispatch])

    const incWeek = () => {
        console.log('incWeek') // временно для проверки
        setWeekCount((prev) => prev + 1)
    }

    const decWeek = () => setWeekCount((prev) => Math.max(0, prev - 1))

    const incMonth = () => {
        console.log('incMonth') // временно
        setMonthCount((prev) => prev + 1)
    }

    const decMonth = () => setMonthCount((prev) => Math.max(0, prev - 1))

    return (
        <div className={styles.formStack}>
            <article className={styles.formCard}>
                <div className={styles.formCardHeader}>
                    <h2 className={styles.formCardTitle}>Доступ на 7 дней</h2>
                </div>

                <div className={styles.counterControl}>
                    <div className={styles.counterInfo}>
                        <span className={styles.formCardSubtitle}>
                            Количество аккаунтов
                        </span>
                        <div className={styles.counterValue}>{weekCount}</div>
                    </div>

                    <div className={styles.counterButtonsContainer}>
                        <button
                            type="button"
                            className={styles.counterButton}
                            onClick={decWeek}
                        >
                            −1
                        </button>

                        <button
                            type="button"
                            className={styles.counterButton}
                            onClick={incWeek}
                        >
                            +1
                        </button>
                    </div>
                </div>
            </article>

            <article className={styles.formCard}>
                <div className={styles.formCardHeader}>
                    <h2 className={styles.formCardTitle}>Доступ на 30 дней</h2>
                </div>

                <div className={styles.counterControl}>
                    <div className={styles.counterInfo}>
                        <span className={styles.formCardSubtitle}>
                            Количество аккаунтов
                        </span>
                        <div className={styles.counterValue}>{monthCount}</div>
                    </div>
                    <div className={styles.counterButtonsContainer}>
                        <button
                            type="button"
                            className={styles.counterButton}
                            onClick={decMonth}
                        >
                            −1
                        </button>

                        <button
                            type="button"
                            className={styles.counterButton}
                            onClick={incMonth}
                        >
                            +1
                        </button>
                    </div>
                </div>
            </article>
        </div>
    )
}
