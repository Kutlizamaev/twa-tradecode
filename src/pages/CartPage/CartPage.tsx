// src/pages/CartPage/CartPage.tsx
import styles from './CartPage.module.css'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
    clearCartByServiceName,
    selectCartItems,
    type BybitUserForCart,
} from '../../features/cart/cartSlice'

import CartAccordeon from '../../components/UI/CartPageUI/CartAccordeon'
import CartItem from '../../components/UI/CartPageUI/CartItem'

import EmptyCartIcon from '../../assets/icons/ui/EmptyCartIcon.svg'
import { useNavigate } from 'react-router-dom'
import { clearSelectionByServiceName } from '../../features/subscriptions/subscriptionsSlice'

// цены как в BybitOrderForm
const BYBIT_WEEK_PRICE = 10
const BYBIT_MONTH_PRICE = 30

const CartPage = () => {
    const items = useAppSelector(selectCartItems)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleClearService = (serviceName: string) => {
        dispatch(clearCartByServiceName(serviceName))
        dispatch(clearSelectionByServiceName(serviceName))
    }

    const groups = Object.values(
        items.reduce<
            Record<
                string,
                {
                    serviceId: string
                    serviceName: string
                    items: typeof items
                    totalPrice: number
                }
            >
        >((acc, item) => {
            if (!acc[item.serviceId]) {
                acc[item.serviceId] = {
                    serviceId: item.serviceId,
                    serviceName: item.serviceName,
                    items: [],
                    totalPrice: 0,
                }
            }

            acc[item.serviceId].items.push(item)
            acc[item.serviceId].totalPrice += item.price

            return acc
        }, {})
    )

    const isEmpty = groups.length === 0

    return (
        <div className={styles.page}>
            <div className={styles.inner}>
                <h1 className={styles.title}>Корзина</h1>

                {isEmpty && (
                    <div className={styles.emptyCartBlock}>
                        <div className={styles.emptyTitle}>
                            <img src={EmptyCartIcon} alt="" />
                            <p>В корзине пусто</p>
                        </div>

                        <button
                            onClick={() => navigate('/')}
                            className={styles.emptyCartButton}
                        >
                            Добавить доступы в корзину
                        </button>
                    </div>
                )}

                {groups.map((group) => {
                    const renderedItems = group.items.flatMap((item) => {
                        // 1️⃣ Подписки — одна строка на пользователя
                        if (item.kind === 'subscription') {
                            const durationLabel =
                                item.plan === 7 ? '7 дней' : '30 дней'

                            return [
                                <CartItem
                                    key={item.id}
                                    id={item.id}
                                    subscriptionId={item.subscriptionId ?? ''}
                                    name={item.userName ?? ''}
                                    uid={item.uid ?? ''}
                                    duration={durationLabel}
                                    price={`${item.price} USDT`}
                                    isSelected={item.isSelected}
                                />,
                            ]
                        }

                        // 2️⃣ Сервисные заказы
                        const usersCount = item.usersCount ?? 0
                        const totalPrice = item.price

                        // PDF Checker: usersData = string[] (теги)
                        if (item.serviceId === 'PDF_CHECKER' && item.pdfPlan) {
                            const tags = Array.isArray(item.usersData)
                                ? (item.usersData as unknown[])
                                : []

                            const perUserPrice =
                                usersCount > 0
                                    ? totalPrice / usersCount
                                    : totalPrice

                            return tags.map((tag, index) => (
                                <CartItem
                                    key={`${item.id}-pdf-${index}`}
                                    id={item.id}
                                    subscriptionId=""
                                    name={String(tag)} // "PDF Checker"
                                    uid={''}
                                    duration={item.pdfPlan?.label ?? ''}
                                    price={`${perUserPrice} USDT`}
                                    isSelected={item.isSelected}
                                    uidLabel="Telegram ID"
                                />
                            ))
                        }

                        // BYBIT_EYE: usersData = BybitUserForCart[]
                        if (item.serviceId === 'BYBIT_EYE') {
                            const users =
                                Array.isArray(item.usersData) &&
                                item.usersData.length > 0
                                    ? (item.usersData as BybitUserForCart[])
                                    : []

                            return users.map((user, index) => {
                                const durationLabel =
                                    user.accessPeriod === '7_DAYS'
                                        ? '7 дней'
                                        : '30 дней'

                                const userPrice =
                                    user.accessPeriod === '7_DAYS'
                                        ? BYBIT_WEEK_PRICE
                                        : BYBIT_MONTH_PRICE

                                return (
                                    <CartItem
                                        key={`${item.id}-bybit-${index}`}
                                        id={item.id}
                                        subscriptionId=""
                                        name={
                                            user.p2pName ||
                                            `Пользователь ${index + 1}`
                                        }
                                        uid={user.uid}
                                        duration={durationLabel}
                                        price={`${userPrice} USDT`}
                                        isSelected={item.isSelected}
                                    />
                                )
                            })
                        }

                        // HTX_EYE (и прочие сервисы по аналогии):
                        // usersData = массив объектов { uid, p2pName, password }
                        const users =
                            Array.isArray(item.usersData) &&
                            item.usersData.length > 0
                                ? (item.usersData as {
                                      uid?: string
                                      p2pName?: string
                                      password?: string
                                  }[])
                                : []

                        // пока цена за HTX = 0, как ты и хотел
                        const userPrice =
                            usersCount > 0 ? totalPrice / usersCount : 0

                        return users.map((user, index) => (
                            <CartItem
                                key={`${item.id}-htx-${index}`}
                                id={item.id}
                                subscriptionId=""
                                name={
                                    user.p2pName || `Пользователь ${index + 1}`
                                }
                                uid={user.uid ?? ''}
                                duration="Заказ услуги"
                                price={`${userPrice} USDT`}
                                isSelected={item.isSelected}
                            />
                        ))
                    })

                    return (
                        <CartAccordeon
                            key={group.serviceId}
                            title={group.serviceName}
                            total={`${group.totalPrice} USDT`}
                            onClear={() =>
                                handleClearService(group.serviceName)
                            }
                        >
                            {renderedItems}
                        </CartAccordeon>
                    )
                })}
            </div>
        </div>
    )
}

export default CartPage
