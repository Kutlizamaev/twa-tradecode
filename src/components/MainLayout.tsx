import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.css'

const MainLayout = () => {
    return (
        <div className={styles.root}>
            <div className={styles.inner}>
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout
