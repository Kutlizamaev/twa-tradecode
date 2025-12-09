import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './UsersSelectionPage.module.css'

import PageHeader from '../../components/UI/PageHeader'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
    selectBybitOrder,
    selectHtxOrder,
    selectPdfOrder,
    type PdfFormatId,
} from '../../features/serviceOrder/serviceOrderSlice'
import type { ServiceCode } from '../../api/types'
import { addServiceOrderToCart } from '../../features/cart/cartSlice'

type BybitUserForm = {
    uid: string
    p2pName: string
    password: string
}

const serviceTitleMap: Record<ServiceCode, string> = {
    BYBIT_EYE: 'ByBit Eye',
    PDF_CHECKER: 'PDF Checker',
    HTX_EYE: 'HTX Eye',
}

export const UsersSelectionPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { serviceId } = useParams<{ serviceId: ServiceCode }>()

    const bybitOrder = useAppSelector(selectBybitOrder)
    const htxOrder = useAppSelector(selectHtxOrder)
    const pdfOrder = useAppSelector(selectPdfOrder)

    const normalizedServiceId: ServiceCode = serviceId ?? 'BYBIT_EYE'

    const isBybit = normalizedServiceId === 'BYBIT_EYE'
    const isHtx = normalizedServiceId === 'HTX_EYE'
    const isPdf = normalizedServiceId === 'PDF_CHECKER'

    const bybitUsersCount = useMemo(
        () => bybitOrder.weekCount + bybitOrder.monthCount,
        [bybitOrder.weekCount, bybitOrder.monthCount]
    )

    const htxUsersCount = htxOrder.accounts

    const initialBybitUsersCount = isBybit ? bybitUsersCount : 0
    const initialHtxUsersCount = isHtx ? htxUsersCount : 0

    const [bybitUsers, setBybitUsers] = useState<BybitUserForm[]>(() =>
        Array.from({ length: initialBybitUsersCount }, () => ({
            uid: '',
            p2pName: '',
            password: '',
        }))
    )

    const [htxUsers, setHtxUsers] = useState<BybitUserForm[]>(() =>
        Array.from({ length: initialHtxUsersCount }, () => ({
            uid: '',
            p2pName: '',
            password: '',
        }))
    )

    const pdfFormatLabelMap: Record<PdfFormatId, string> = {
        '100': '100 проверок',
        '1000': '1000 проверок',
        '5000': '5000 проверок',
        '1m': '1 месяц',
    }

    const pdfUsersCount = isPdf
        ? pdfOrder.accountsByFormat[pdfOrder.formatId]
        : 0

    const [pdfTags, setPdfTags] = useState<string[]>(() =>
        Array.from({ length: pdfUsersCount }, () => '')
    )

    const orderTotal = useMemo(() => {
        if (isBybit) return bybitOrder.total
        if (isPdf) return pdfOrder.total
        if (isHtx) return htxOrder.total
        return 0
    }, [
        isBybit,
        isPdf,
        isHtx,
        bybitOrder.total,
        pdfOrder.total,
        htxOrder.total,
    ])

    const handleChangePdfTag = (index: number, value: string) => {
        setPdfTags((prev) => prev.map((tag, i) => (i === index ? value : tag)))
    }

    const handleChangeBybitUser = (
        index: number,
        field: keyof BybitUserForm,
        value: string
    ) => {
        setBybitUsers((prev) =>
            prev.map((user, i) =>
                i === index ? { ...user, [field]: value } : user
            )
        )
    }

    const handleChangeHtxUser = (
        index: number,
        field: keyof BybitUserForm,
        value: string
    ) => {
        setHtxUsers((prev) =>
            prev.map((user, i) =>
                i === index ? { ...user, [field]: value } : user
            )
        )
    }

    const handlePayNow = () => {
        navigate('/payment-order')
    }

    const handleAddToCart = () => {
        // для BYBIT и PDF — не даём добавлять, если total 0
        if (!isHtx && orderTotal <= 0) return

        if (isBybit) {
            const bybitUsersWithPeriod = bybitUsers.map((user, index) => {
                const isWeek = index < bybitOrder.weekCount

                return {
                    ...user,
                    accessPeriod: isWeek ? '7_DAYS' : '30_DAYS',
                }
            })

            if (!bybitUsersWithPeriod.length) return

            dispatch(
                addServiceOrderToCart({
                    serviceId: 'BYBIT_EYE',
                    serviceName: serviceTitleMap['BYBIT_EYE'],
                    totalPrice: orderTotal,
                    usersCount: bybitUsersWithPeriod.length,
                    usersData: bybitUsersWithPeriod,
                })
            )
        } else if (isHtx) {
            if (!htxUsers.length) return

            dispatch(
                addServiceOrderToCart({
                    serviceId: 'HTX_EYE',
                    serviceName: serviceTitleMap['HTX_EYE'],
                    totalPrice: 0, // <--- цена пока 0, но заказ всё равно идёт в корзину
                    usersCount: htxUsers.length,
                    usersData: htxUsers,
                })
            )
        } else if (isPdf) {
            if (!pdfTags.length) return

            dispatch(
                addServiceOrderToCart({
                    serviceId: 'PDF_CHECKER',
                    serviceName: serviceTitleMap['PDF_CHECKER'],
                    totalPrice: orderTotal,
                    usersCount: pdfTags.length,
                    usersData: pdfTags,
                    pdfPlan: {
                        formatId: pdfOrder.formatId,
                        label: pdfFormatLabelMap[pdfOrder.formatId],
                        accountsCount: pdfUsersCount,
                    },
                })
            )
        }

        navigate('/cart')
    }

    const renderBybitUsers = () => {
        if (!isBybit) return null

        if (bybitUsersCount <= 0) {
            return (
                <p className={styles.emptyHint}>
                    Сначала выберите количество аккаунтов на предыдущем шаге.
                </p>
            )
        }

        return bybitUsers.map((user, index) => {
            const periodLabel =
                index < bybitOrder.weekCount ? 'на 7 дней' : 'на 30 дней'

            return (
                <section key={index} className={styles.userCard}>
                    <h2 className={styles.userTitle}>
                        Пользователь {index + 1}
                        <span className={styles.userPeriod}>
                            {' • '}
                            {periodLabel}
                        </span>
                    </h2>

                    <div className={styles.userFields}>
                        <label className={styles.fieldLabel}>
                            <span>UID</span>
                            <input
                                className={styles.textInput}
                                value={user.uid}
                                onChange={(e) =>
                                    handleChangeBybitUser(
                                        index,
                                        'uid',
                                        e.target.value
                                    )
                                }
                            />
                        </label>

                        <label className={styles.fieldLabel}>
                            <span>Никнейм в разделе P2P</span>
                            <input
                                className={styles.textInput}
                                value={user.p2pName}
                                onChange={(e) =>
                                    handleChangeBybitUser(
                                        index,
                                        'p2pName',
                                        e.target.value
                                    )
                                }
                            />
                        </label>

                        <label className={styles.fieldLabel}>
                            <span>Желаемый пароль</span>
                            <input
                                className={styles.textInput}
                                value={user.password}
                                onChange={(e) =>
                                    handleChangeBybitUser(
                                        index,
                                        'password',
                                        e.target.value
                                    )
                                }
                            />
                        </label>
                    </div>
                </section>
            )
        })
    }

    const renderHtxUsers = () => {
        if (!isHtx) return null

        if (htxUsersCount <= 0) {
            return (
                <p className={styles.emptyHint}>
                    Сначала выберите количество аккаунтов на предыдущем шаге.
                </p>
            )
        }

        return htxUsers.map((user, index) => (
            <section key={index} className={styles.userCard}>
                <h2 className={styles.userTitle}>Пользователь {index + 1}</h2>

                <div className={styles.userFields}>
                    <label className={styles.fieldLabel}>
                        <span>UID</span>
                        <input
                            className={styles.textInput}
                            value={user.uid}
                            onChange={(e) =>
                                handleChangeHtxUser(
                                    index,
                                    'uid',
                                    e.target.value
                                )
                            }
                        />
                    </label>

                    <label className={styles.fieldLabel}>
                        <span>Никнейм в разделе P2P</span>
                        <input
                            className={styles.textInput}
                            value={user.p2pName}
                            onChange={(e) =>
                                handleChangeHtxUser(
                                    index,
                                    'p2pName',
                                    e.target.value
                                )
                            }
                        />
                    </label>

                    <label className={styles.fieldLabel}>
                        <span>Желаемый пароль</span>
                        <input
                            className={styles.textInput}
                            value={user.password}
                            onChange={(e) =>
                                handleChangeHtxUser(
                                    index,
                                    'password',
                                    e.target.value
                                )
                            }
                        />
                    </label>
                </div>
            </section>
        ))
    }

    const renderPdfForm = () => {
        if (!isPdf) return null

        if (pdfUsersCount <= 0) {
            return (
                <p className={styles.emptyHint}>
                    Сначала выберите количество аккаунтов на предыдущем шаге.
                </p>
            )
        }

        return pdfTags.map((tag, index) => (
            <section key={index} className={styles.userCard}>
                <h2 className={styles.userTitle}>Пользователь {index + 1}</h2>

                <div className={styles.userFields}>
                    <label className={styles.fieldLabel}>
                        <input
                            className={styles.pdfTextInput}
                            value={tag}
                            onChange={(e) =>
                                handleChangePdfTag(index, e.target.value)
                            }
                            placeholder="@tag или Telegram ID"
                        />
                    </label>
                </div>
            </section>
        ))
    }

    return (
        <div className={styles.page}>
            <div className={styles.inner}>
                <header className={styles.header}>
                    <PageHeader showBackButton />
                    <div className={styles.headerTitle}>
                        <p className={styles.title}>
                            Выбор
                            <br />
                            пользователей
                        </p>
                        <p className={styles.subtitle}>
                            Укажите данные
                            <br />
                            по пользователям
                        </p>
                    </div>
                </header>

                <main className={styles.content}>
                    {renderBybitUsers()}
                    {renderHtxUsers()}
                    {renderPdfForm()}
                </main>

                <section className={styles.bottomDock}>
                    <div className={styles.bottomInner}>
                        {!isHtx && (
                            <button
                                type="button"
                                className={styles.primaryButton}
                                onClick={handlePayNow}
                            >
                                Оплатить сразу
                            </button>
                        )}

                        <button
                            type="button"
                            className={styles.secondaryButton}
                            onClick={handleAddToCart}
                        >
                            В корзину
                        </button>
                    </div>
                </section>
            </div>
        </div>
    )
}
