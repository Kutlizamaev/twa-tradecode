import BalanceCard from '../../components/UI/BalanceCard'
import PromoCard from '../../components/UI/PromoCard'
import ServiceCard from '../../components/UI/ServiceCard'
import styles from './HomePage.module.css'

export default function HomePage() {
    return (
        <div className={styles.page}>
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
    )
}
