import styles from './CartUIStyles.module.css'
import checkMarkIcon from '../../../assets/icons/ui/CheckMarkAccordeonIcon.svg'
import { useAppDispatch } from '../../../store/hooks'
import { toggleItemSelection } from '../../../features/cart/cartSlice'

interface CartItemProps {
    id: string
    name: string
    uid: string
    duration: string
    price: string
    isSelected: boolean
}

const CartItem = ({
    id,
    name,
    uid,
    duration,
    price,
    isSelected,
}: CartItemProps) => {
    const dispatch = useAppDispatch()

    const handleChange = () => {
        dispatch(toggleItemSelection(id))
    }

    return (
        <div className={styles.itemRow}>
            <label className={styles.checkboxWrapper}>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={handleChange}
                />
                {isSelected ? (
                    <span className={styles.checkbox}>
                        <img src={checkMarkIcon} alt="" />
                    </span>
                ) : (
                    <span className={styles.checkbox} />
                )}
            </label>

            <div className={styles.itemInfo}>
                <div className={styles.itemName}>{name}</div>
                <div className={styles.itemUid}>UID: {uid}</div>
            </div>

            <div className={styles.itemRight}>
                <div className={styles.itemDuration}>{duration}</div>
                <div className={styles.itemPrice}>{price}</div>
            </div>
        </div>
    )
}

export default CartItem
