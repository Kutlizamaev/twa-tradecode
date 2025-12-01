import BalanceCard from '../../components/UI/HomePageUI/BalanceCard'
import PromoCard from '../../components/UI/HomePageUI/PromoCard'
import ServiceCard from '../../components/UI/HomePageUI/ServiceCard'
import styles from './HomePage.module.css'

const HomePage = () => {
    return (
        <div className={styles.page}>
            <div className={styles.pageInner}>
                <div className={styles.scroll}>
                    <BalanceCard />

                    <section className={styles.section}>
                        <h1 className={styles.sectionTitle}>Сервисы</h1>

                        <ServiceCard name="ByBit Eye" />

                        <ServiceCard name="PDF Checker" />

                        <PromoCard />

                        <ServiceCard name="HTX Eye" />
                    </section>
                </div>
            </div>
        </div>
    )
}

export default HomePage
