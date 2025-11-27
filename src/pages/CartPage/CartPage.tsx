// src/pages/CartPage/CartPage.tsx
import { CartAccordeon } from '../../components/UI/CartPage/CartAccordeon'
import styles from './CartPage.module.css'

import { useAppSelector } from '../../store/hooks'
import { selectCartItems } from '../../features/cart/cartSlice'
import { CartItem } from '../../components/UI/CartPage/CartItem'

export const CartPage = () => {
    const items = useAppSelector(selectCartItems)

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
                    <p className={styles.empty}>В корзине пока ничего нет</p>
                )}

                {groups.map((group) => (
                    <CartAccordeon
                        key={group.serviceId}
                        title={group.serviceName}
                        total={`$${group.totalPrice}`}
                    >
                        {group.items.map((item) => {
                            const durationLabel =
                                item.plan === 7 ? '+7 дн' : '+30 дн'

                            return (
                                <CartItem
                                    key={item.id}
                                    id={item.id}
                                    name={item.userName}
                                    uid={item.uid}
                                    duration={durationLabel}
                                    price={`$${item.price}`}
                                    isSelected={item.isSelected}
                                />
                            )
                        })}
                    </CartAccordeon>
                ))}
            </div>
        </div>
    )
}
