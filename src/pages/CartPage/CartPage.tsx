import styles from './CartPage.module.css'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
    clearCartByServiceName,
    selectCartItems,
} from '../../features/cart/cartSlice'

import CartAccordeon from '../../components/UI/CartPageUI/CartAccordeon'
import CartItem from '../../components/UI/CartPageUI/CartItem'

import EmptyCartIcon from '../../assets/icons/ui/EmptyCartIcon.svg'
import { useNavigate } from 'react-router-dom'
import { clearSelectionByServiceName } from '../../features/subscriptions/subscriptionsSlice'

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

                {groups.map((group) => (
                    <CartAccordeon
                        key={group.serviceId}
                        title={group.serviceName}
                        total={`$${group.totalPrice}`}
                        onClear={() => handleClearService(group.serviceName)}
                    >
                        {group.items.map((item) => {
                            const durationLabel =
                                item.plan === 7 ? '7 дней' : '30 дней'

                            return (
                                <CartItem
                                    key={item.id}
                                    id={item.id}
                                    subscriptionId={item.subscriptionId}
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

export default CartPage
