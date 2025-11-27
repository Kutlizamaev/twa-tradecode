import styles from './SubscriptionUIStyles.module.css'

import CheckMarkGreenIcon from '../../../assets/icons/ui/CheckMarkGreenIcon.svg'
import CheckMarkRedIcon from '../../../assets/icons/ui/CheckMarkRedIcon.svg'

import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
    toggleSelection,
    type PlanType,
} from '../../../features/cart/cartSlice'

type SubscriptionStatus = 'active' | 'expired'

type SubscriptionCardProps = {
    id: string
    serviceId: string
    title: string
    uid: string
    status: SubscriptionStatus
    daysLeft?: number
    price7: number
    price30: number
}

export const SubscriptionCard = ({
    id,
    serviceId,
    title,
    uid,
    status,
    daysLeft,
    price7,
    price30,
}: SubscriptionCardProps) => {
    const dispatch = useAppDispatch()

    const subscriptionKey = `${serviceId}-${id}`

    const cartItem = useAppSelector(
        (state) => state.cart.items[subscriptionKey]
    )
    const selectedPlan = cartItem?.plan ?? null
    const isActiveCard = !!cartItem

    const isExpired = status === 'expired'

    const handleSelectPlan = (plan: PlanType, price: number) => {
        dispatch(
            toggleSelection({
                subscriptionId: subscriptionKey,
                serviceId,
                userName: title,
                uid,
                plan,
                price,
            })
        )
    }

    return (
        <article
            className={`${styles.subscriptionCard} ${
                isActiveCard ? styles.subscriptionCardActive : ''
            }`}
        >
            <div className={styles.subscriptionHeader}>
                <span className={styles.subscriptionTitle}>{title}</span>
                <span className={styles.subscriptionUid}>UID: {uid}</span>
            </div>

            <div className={styles.subscriptionRow}>
                <div
                    className={`${styles.subscriptionStatus} ${
                        isExpired ? styles.subscriptionStatusExpired : ''
                    }`}
                >
                    <img
                        src={isExpired ? CheckMarkRedIcon : CheckMarkGreenIcon}
                        alt=""
                    />
                    <div className={styles.subscriptionStatusTextContainer}>
                        <p
                            className={`${styles.subscriptionStatusText} ${
                                isExpired
                                    ? styles.subscriptionStatusTextExpired
                                    : ''
                            }`}
                        >
                            {isExpired ? 'Не действует' : 'Действует'}
                        </p>
                        {!isExpired && daysLeft !== undefined && (
                            <p className={styles.subscriptionStatusSubtext}>
                                Ещё {daysLeft} дн.
                            </p>
                        )}
                    </div>
                </div>

                <div className={styles.subscriptionPills}>
                    <button
                        type="button"
                        className={`${styles.pillNeutral} ${
                            selectedPlan === 7 ? styles.pillNeutralActive : ''
                        }`}
                        onClick={() => handleSelectPlan(7, price7)}
                    >
                        <p>+7 дн</p>
                        <span
                            className={`${styles.pillAccent} ${
                                selectedPlan === 7
                                    ? styles.pillAccentActive
                                    : ''
                            }`}
                        >
                            ${price7}
                        </span>
                    </button>

                    <button
                        type="button"
                        className={`${styles.pillNeutral} ${
                            selectedPlan === 30 ? styles.pillNeutralActive : ''
                        }`}
                        onClick={() => handleSelectPlan(30, price30)}
                    >
                        <p>+30 дн</p>
                        <span
                            className={`${styles.pillAccent} ${
                                selectedPlan === 30
                                    ? styles.pillAccentActive
                                    : ''
                            }`}
                        >
                            ${price30}
                        </span>
                    </button>
                </div>
            </div>
        </article>
    )
}
