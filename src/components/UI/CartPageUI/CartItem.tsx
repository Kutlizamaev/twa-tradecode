import styles from './CartUIStyles.module.css'
import { useAppDispatch } from '../../../store/hooks'
import { removeItem } from '../../../features/cart/cartSlice'
import TrashIcon from '../../../assets/icons/ui/TrashIcon.svg'
import { removeSelectionById } from '../../../features/subscriptions/subscriptionsSlice'

interface CartItemProps {
    id: string
    subscriptionId: string
    name: string
    uid: string
    duration: string
    price: string
    isSelected: boolean
    uidLabel?: string
}

const CartItem = ({
    id,
    subscriptionId,
    name,
    uid,
    duration,
    price,
    uidLabel = 'UID',
}: CartItemProps) => {
    const dispatch = useAppDispatch()

    const handleRemoveItem = () => {
        if (subscriptionId) {
            dispatch(removeSelectionById(subscriptionId))
        }
        dispatch(removeItem(id))
    }

    return (
        <div className={styles.itemRow}>
            <div className={styles.itemInfo}>
                <div className={styles.itemName}>{name}</div>
                <div className={styles.itemUid}>
                    {uidLabel}: {uid}
                </div>
            </div>

            <div className={styles.itemRight}>
                <div className={styles.itemDuration}>{duration}</div>
                <div className={styles.itemPrice}>{price}</div>
            </div>

            <div className="">
                <img onClick={handleRemoveItem} src={TrashIcon} alt="" />
            </div>
        </div>
    )
}

export default CartItem
