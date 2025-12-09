import { useEffect, useState } from 'react'
import styles from '../ServiceOrderStyles.module.css'
import { useAppDispatch } from '../../../store/hooks'
import { setHtxOrder } from '../../../features/serviceOrder/serviceOrderSlice'

type HtxOrderFormProps = {
    onTotalChange: (total: string) => void
}

export const HtxOrderForm = ({ onTotalChange }: HtxOrderFormProps) => {
    const dispatch = useAppDispatch()
    const [accounts, setAccounts] = useState(0)

    useEffect(() => {
        onTotalChange('Бесплатно')

        dispatch(setHtxOrder({ accounts: accounts, total: 0 }))
    }, [accounts, onTotalChange, dispatch])

    const inc = () => setAccounts((v) => v + 1)
    const dec = () => setAccounts((v) => Math.max(0, v - 1))

    return (
        <div className={styles.formStack}>
            <article className={styles.formCard}>
                <div className={styles.formCardHeader}>
                    <h2 className={styles.formCardTitle}>Оформление доступа</h2>
                </div>

                <div className={styles.counterControl}>
                    <div className={styles.counterInfo}>
                        <span className={styles.formCardSubtitle}>
                            Количество аккаунтов
                        </span>
                        <div className={styles.counterValue}>{accounts}</div>
                    </div>
                    <div className={styles.counterButtonsContainer}>
                        <button
                            type="button"
                            className={styles.counterButton}
                            onClick={dec}
                        >
                            −1
                        </button>

                        <button
                            type="button"
                            className={styles.counterButton}
                            onClick={inc}
                        >
                            +1
                        </button>
                    </div>
                </div>
            </article>
        </div>
    )
}
