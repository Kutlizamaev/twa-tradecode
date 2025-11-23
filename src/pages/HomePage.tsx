import { useDispatch, useSelector } from 'react-redux'
import { useAuthTelegramMutation, useGetDashboardQuery } from '../api/baseApi'
import { setAuth } from '../store/sessionSlice'
import type { RootState } from '../store/store'
import { getTelegramInitData } from '../telegram/getInitData'
import { useState } from 'react'

export default function HomePage() {
    const dispatch = useDispatch()
    const session = useSelector((state: RootState) => state.session)

    const [authTelegram, { isLoading: isAuthLoading, error: authError }] =
        useAuthTelegramMutation()

    const [manualInitData, setManualInitData] = useState('')

    const {
        data: dashboard,
        isLoading: isDashboardLoading,
        error: dashboardError,
    } = useGetDashboardQuery(undefined, {
        skip: !session.token,
    })

    const handleAuth = async () => {
        const realInitData = getTelegramInitData()
        const initDataToSend = realInitData ?? manualInitData

        if (!initDataToSend) {
            alert(
                'InitData не найдено. Открой Mini App в Telegram или введи initData вручную.'
            )
            return
        }

        try {
            const result = await authTelegram({
                initData: initDataToSend,
            }).unwrap()
            dispatch(setAuth(result))
        } catch (e) {
            console.error('Auth error', e)
        }
    }

    return (
        <div style={{ padding: 16 }}>
            <h1>Home</h1>

            <button onClick={handleAuth} disabled={isAuthLoading}>
                {isAuthLoading
                    ? 'Авторизация...'
                    : 'Авторизоваться через Telegram'}
            </button>

            {authError && (
                <div style={{ color: 'red' }}>Ошибка авторизации</div>
            )}

            <div style={{ marginTop: 16 }}>
                <h3>Ручной initData (для браузера)</h3>
                <textarea
                    rows={3}
                    style={{ width: '100%', maxWidth: 500 }}
                    placeholder="Вставь сюда initData"
                    value={manualInitData}
                    onChange={(e) => setManualInitData(e.target.value)}
                />
            </div>

            <div style={{ marginTop: 24 }}>
                <h2>Dashboard</h2>

                {!session.token && (
                    <div>Сначала авторизуйся, чтобы загрузить dashboard</div>
                )}

                {session.token && isDashboardLoading && (
                    <div>Загружаем dashboard...</div>
                )}

                {dashboardError && (
                    <div style={{ color: 'red' }}>
                        Ошибка загрузки dashboard
                    </div>
                )}

                {dashboard && (
                    <div style={{ marginTop: 12 }}>
                        <h3>
                            Пользователь: {dashboard.user.telegramUsername} (
                            {dashboard.user.telegramId})
                        </h3>
                        <p>
                            Баланс: {dashboard.balance.amount}{' '}
                            {dashboard.balance.currency}
                        </p>

                        <h3>Сервисы</h3>
                        <ul>
                            {dashboard.services.map((s) => {
                                const st = dashboard.stats.find(
                                    (x) => x.serviceId === s.id
                                )
                                return (
                                    <li key={s.id}>
                                        <strong>{s.name}</strong> ({s.code})
                                        <br />
                                        {s.description}
                                        {st && (
                                            <div style={{ fontSize: 12 }}>
                                                всего: {st.totalSubscriptions},
                                                активных: {st.activeCount},
                                                скоро заканчиваются:{' '}
                                                {st.expiringSoonCount},
                                                закончились: {st.expiredCount},
                                                не активированы:{' '}
                                                {st.notActivatedCount}
                                            </div>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )}
            </div>

            <div style={{ marginTop: 24 }}>
                <h2>Session state</h2>
                <pre>{JSON.stringify(session, null, 2)}</pre>
            </div>
        </div>
    )
}
