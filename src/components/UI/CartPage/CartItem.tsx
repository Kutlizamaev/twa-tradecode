import styles from './CartUIStyles.module.css'
import checkMarkIcon from '../../../assets/icons/ui/CheckMarkAccordeonIcon.svg'

interface CartItemProps {
    name: string
    uid: string
    duration: string
    price: string
    checked?: boolean
}

export const CartItem = ({
    name,
    uid,
    duration,
    price,
    checked,
}: CartItemProps) => {
    return (
        <div className={styles.itemRow}>
            <label className={styles.checkboxWrapper}>
                <input type="checkbox" defaultChecked={checked} />
                {checked && (
                    <span className={styles.checkbox}>
                        <img src={checkMarkIcon} alt="" />
                    </span>
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
