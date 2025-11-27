// MainLayout.tsx
import { Outlet, useLocation } from 'react-router-dom'
import styles from './MainLayout.module.css'
import BottomNav from '../UI/BottomNav'
import { useAppSelector } from '../../store/hooks'
import { selectCartSummary } from '../../features/cart/cartSlice'
import { CartBar } from '../UI/CartBar/CartBar'

const MainLayout = () => {
    const location = useLocation()
    const isSubscriptionsPage = location.pathname === '/subscriptions'

    const { selectedUsers, totalPrice } = useAppSelector(selectCartSummary)

    const hasSelection = selectedUsers > 0

    return (
        <div className={styles.root}>
            <div className={styles.inner}>
                <div className={styles.content}>
                    <Outlet />
                </div>
                <div className={styles.bottomDock}>
                    <CartBar
                        visible={isSubscriptionsPage && hasSelection}
                        selectedUsers={selectedUsers}
                        totalPrice={`${totalPrice} USDT`}
                    />
                    <BottomNav cartBarIsVisible={hasSelection} />
                </div>
            </div>
        </div>
    )
}

export default MainLayout
