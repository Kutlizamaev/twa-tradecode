import styles from './UIStyles.module.css'

const BottomNav = () => {
    return (
        <nav className={styles.bottomNav}>
            <div className={styles.bottomNavInner}>
                <button
                    className={`${styles.bottomNavItem} ${styles.bottomNavItemActive}`}
                >
                    <span className={styles.bottomNavIcon}>🏠</span>
                    <span className={styles.bottomNavLabel}>Главная</span>
                </button>
                <button className={styles.bottomNavItem}>
                    <span className={styles.bottomNavIcon}>📊</span>
                    <span className={styles.bottomNavLabel}>Подписки</span>
                </button>
                <button className={styles.bottomNavItem}>
                    <span className={styles.bottomNavIcon}>👤</span>
                    <span className={styles.bottomNavLabel}>Профиль</span>
                </button>
                <button className={styles.bottomNavItem}>
                    <span className={styles.bottomNavIcon}>🧺</span>
                    <span className={styles.bottomNavLabel}>Корзина</span>
                </button>
            </div>
        </nav>
    )
}

export default BottomNav
