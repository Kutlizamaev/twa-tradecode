import { useEffect, useState } from 'react'
import styles from '../ServiceOrderStyles.module.css'
import { useAppDispatch } from '../../../store/hooks'
import {
    setPdfOrder,
    type PdfFormatId,
} from '../../../features/serviceOrder/serviceOrderSlice'

type PdfOrderFormProps = {
    onTotalChange: (total: number) => void
}

const FORMATS = [
    { id: '100', label: '100', price: 5 },
    { id: '1000', label: '1 000', price: 20 },
    { id: '5000', label: '5 000', price: 70 },
    { id: '1m', label: '1 мес', price: 100 },
] as const

type FormatId = (typeof FORMATS)[number]['id']

export const PdfOrderForm = ({ onTotalChange }: PdfOrderFormProps) => {
    const dispatch = useAppDispatch()
    const [formatId, setFormatId] = useState<FormatId>('100')

    const [accountsByFormat, setAccountsByFormat] = useState<
        Record<FormatId, number>
    >({
        '100': 0,
        '1000': 0,
        '5000': 0,
        '1m': 0,
    })

    const currentFormat = FORMATS.find((f) => f.id === formatId)!
    const currentAccounts = accountsByFormat[formatId]

    useEffect(() => {
        const total = currentAccounts * currentFormat.price

        onTotalChange(total)

        dispatch(
            setPdfOrder({
                formatId: formatId as PdfFormatId,
                accountsByFormat,
                total,
            })
        )
    }, [
        currentAccounts,
        currentFormat,
        formatId,
        accountsByFormat,
        dispatch,
        onTotalChange,
    ])

    const inc = () =>
        setAccountsByFormat((prev) => ({
            ...prev,
            [formatId]: prev[formatId] + 1,
        }))

    const dec = () =>
        setAccountsByFormat((prev) => ({
            ...prev,
            [formatId]: Math.max(0, prev[formatId] - 1),
        }))

    return (
        <div className={styles.formStack}>
            <article className={styles.formCard}>
                <div className={styles.formCardHeader}>
                    <h2 className={styles.formCardTitle}>Оформление доступа</h2>
                </div>

                <div className={styles.segmentedControl}>
                    <span className={styles.formCardSubtitlePdf}>
                        Формат количества проверок
                    </span>

                    <div className={styles.segmentedControlContainer}>
                        <div className={styles.segmentedGroup}>
                            {FORMATS.slice(0, 3).map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    className={`${
                                        styles.segmentedControlItem
                                    } ${
                                        item.id === formatId
                                            ? styles.segmentedControlItemActive
                                            : ''
                                    }`}
                                    onClick={() => setFormatId(item.id)}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        <div className={styles.singleButtonWrapper}>
                            <button
                                type="button"
                                className={`${styles.segmentedControlItem} ${
                                    FORMATS[3].id === formatId
                                        ? styles.segmentedControlItemActive
                                        : ''
                                }`}
                                onClick={() => setFormatId(FORMATS[3].id)}
                            >
                                {FORMATS[3].label}
                            </button>
                        </div>
                    </div>
                </div>

                <div className={styles.formCardFooter}>
                    <div className={styles.counterControl}>
                        <div className={styles.counterInfo}>
                            <span className={styles.formCardSubtitle}>
                                Количество аккаунтов
                            </span>
                            <div className={styles.counterValue}>
                                {currentAccounts}
                            </div>
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
                </div>
            </article>
        </div>
    )
}
