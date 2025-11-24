// import { useDispatch, useSelector } from 'react-redux'
// import { useAuthTelegramMutation, useGetDashboardQuery } from '../api/baseApi'
// import { setAuth } from '../store/sessionSlice'
// import type { RootState } from '../store/store'
// import { getTelegramInitData } from '../telegram/getInitData'
// import { useState } from 'react'

import BalanceCard from '../../components/UI/BalanceCard'
import PromoCard from '../../components/UI/PromoCard'
import ServiceCard from '../../components/UI/ServiceCard'
import styles from './HomePage.module.css'

export default function HomePage() {
    // const dispatch = useDispatch()
    // const session = useSelector((state: RootState) => state.session)

    // const [authTelegram, { isLoading: isAuthLoading, error: authError }] =
    //     useAuthTelegramMutation()

    // const [manualInitData, setManualInitData] = useState('')

    // const {
    //     data: dashboard,
    //     isLoading: isDashboardLoading,
    //     error: dashboardError,
    // } = useGetDashboardQuery(undefined, {
    //     skip: !session.token,
    // })

    // const handleAuth = async () => {
    //     const realInitData = getTelegramInitData()
    //     const initDataToSend = realInitData ?? manualInitData

    //     if (!initDataToSend) {
    //         alert(
    //             'InitData не найдено. Открой Mini App в Telegram или введи initData вручную.'
    //         )
    //         return
    //     }

    //     try {
    //         const result = await authTelegram({
    //             initData: initDataToSend,
    //         }).unwrap()
    //         dispatch(setAuth(result))
    //     } catch (e) {
    //         console.error('Auth error', e)
    //     }
    // }

    return (
        <div className={styles.page}>
            <div className={styles.scroll}>
                <BalanceCard />

                <section className={styles.section}>
                    <h1 className={styles.sectionTitle}>Сервисы</h1>

                    <ServiceCard name="Bybit Eye" />

                    <ServiceCard name="PDF Checker" />

                    <PromoCard />

                    <ServiceCard name="HTX Eye" />
                </section>
            </div>
        </div>
    )
}
