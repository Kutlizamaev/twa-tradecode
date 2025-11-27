import styles from './CartBar.module.css'

type CartBarProps = {
    selectedUsers?: number
    totalPrice: string
    visible?: boolean
    isCartPage?: boolean
}

export const CartBar = ({
    selectedUsers,
    totalPrice,
    visible = true,
    isCartPage,
}: CartBarProps) => {
    if (!visible) return null

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

            <button className={styles.cartButton}>
                <span>В корзину</span>
                <span className={styles.cartPrice}>{totalPrice}</span>
            </button>
        </div>
    )
}
