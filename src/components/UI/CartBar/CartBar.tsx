import styles from './CartBar.module.css'

type CartBarProps = {
    visible: boolean
    selectedUsers?: number
    totalPrice: string
    isCartPage?: boolean
    onPrimaryClick?: () => void
}

export const CartBar = ({
    selectedUsers,
    totalPrice,
    visible = true,
    isCartPage,
    onPrimaryClick,
}: CartBarProps) => {
    if (!visible) return null
    const buttonText = isCartPage ? 'Оплатить' : 'В корзину'

    return (
        <div className={styles.cartBar}>
            {isCartPage ? null : (
                <div className={styles.cartInfo}>
                    <span className={styles.cartInfoLabel}>Выбрано</span>
                    <span className={styles.cartInfoValue}>
                        {selectedUsers} пользователей
                    </span>
                </div>
            )}

            <button className={styles.cartButton} onClick={onPrimaryClick}>
                <span>{buttonText}</span>
                <span className={styles.cartPrice}>{totalPrice}</span>
            </button>
        </div>
    )
}
