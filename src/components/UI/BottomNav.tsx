import styles from './UIStyles.module.css'
import HomeIcon from '../../assets/icons/HomePageLinkIcon.svg?react'
import SubcriptionIcon from '../../assets/icons/SubcriptionPageLinkIcon.svg?react'
import ProfileIcon from '../../assets/icons/ProfilePageLinkIcon.svg?react'
import CartIcon from '../../assets/icons/CartPageLinkIcon.svg?react'
import { useLocation, useNavigate } from 'react-router-dom'

const tabs = [
    { id: 'home', path: '/', label: 'Главная', Icon: HomeIcon },
    {
        id: 'subscriptions',
        path: '/subscriptions',
        label: 'Подписки',
        Icon: SubcriptionIcon,
    },
    { id: 'profile', path: '/profile', label: 'Профиль', Icon: ProfileIcon },
    { id: 'cart', path: '/cart', label: 'Корзина', Icon: CartIcon },
]

const BottomNav = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const activeIndex =
        tabs.findIndex((tab) =>
            tab.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(tab.path)
        ) || 0

    return (
        <nav className={styles.bottomNav}>
            <div className={styles.bottomNavInner}>
                <div
                    className={styles.bottomNavActiveBg}
                    style={{
                        transform: `translateX(${activeIndex * 100}%)`,
                    }}
                />

                {tabs.map((tab, index) => {
                    const isActive = index === activeIndex
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => navigate(tab.path)}
                            className={`${styles.bottomNavItem} ${
                                isActive ? styles.bottomNavItemActive : ''
                            }`}
                        >
                            <span className={styles.bottomNavIcon}>
                                <tab.Icon
                                    className={
                                        isActive
                                            ? styles.iconActive
                                            : styles.icon
                                    }
                                />
                            </span>
                            <span className={styles.bottomNavLabel}>
                                {tab.label}
                            </span>
                        </button>
                    )
                })}
            </div>
        </nav>
    )
}

export default BottomNav
