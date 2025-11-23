import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.css'
import BottomNav from './UI/BottomNav'

const MainLayout = () => {
    return (
        <div className={styles.root}>
            <div className={styles.inner}>
                <div className={styles.content}>
                    <Outlet />
                </div>
                <BottomNav />
            </div>
        </div>
    )
}

export default MainLayout
