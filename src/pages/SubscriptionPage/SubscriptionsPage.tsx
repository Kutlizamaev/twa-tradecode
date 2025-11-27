import SubscriptionAccordeon from '../../components/UI/SubscriptionPage/SubscriptionAccordeon'
import styles from './SubscriptionsPage.module.css'

export const SubscriptionsPage = () => {
    return (
        <div className={styles.page}>
            <div className={styles.pageInner}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Подписки</h1>

                    <button className={styles.segmentedButton}>
                        ByBit Eye
                    </button>
                    <button className={styles.segmentedButton}>
                        PDF Checker
                    </button>
                </div>

                <div className={styles.content}>
                    <SubscriptionAccordeon name="Bybit Eye" />
                    <SubscriptionAccordeon name="PDF Checker" />
                </div>
            </div>
        </div>
    )
}
