import { Outlet, useLocation } from 'react-router-dom'
import styles from './MainLayout.module.css'
import BottomNav from './UI/BottomNav'
import { CartBar } from './UI/CartBar/CartBar'

const MainLayout = () => {
    const location = useLocation()

    const isSubscriptionsPage = location.pathname === '/subscriptions'

    const selectedUsers = 13
    const totalPrice = '1800 USDT'

    return (
        <div className={styles.root}>
            <div className={styles.inner}>
                <div className={styles.content}>
                    <Outlet />
                </div>
                <div className={styles.bottomDock}>
                    <CartBar
                        visible={isSubscriptionsPage}
                        selectedUsers={selectedUsers}
                        totalPrice={totalPrice}
                    />
                    <BottomNav />
                </div>
            </div>
        </div>
    )
}

export default MainLayout
