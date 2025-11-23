import { useDispatch, useSelector } from 'react-redux'
import { useAuthTelegramMutation } from '../api/baseApi'
import { setAuth } from '../store/sessionSlice'
import type { RootState } from '../store/store'
import { getTelegramInitData } from '../telegram/getInitData'
import { useState } from 'react'

export default function HomePage() {
    const dispatch = useDispatch()
    const session = useSelector((state: RootState) => state.session)

    const [authTelegram, { isLoading, error }] = useAuthTelegramMutation()

    const [manualInitData, setManualInitData] = useState('')

    const handleAuth = async () => {
        // 1. Пытаемся взять реальный initData из Telegram
        const realInitData = getTelegramInitData()

        // 2. Если мы не в Telegram (локальный dev) — используем manualInitData
        const initDataToSend = realInitData || manualInitData

        if (!initDataToSend) {
            alert(
                'initData не найден. Либо открой приложение в Telegram, либо введите initData вручную в поле ниже.'
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

            <button onClick={handleAuth} disabled={isLoading}>
                {isLoading
                    ? 'Авторизация...'
                    : 'Авторизоваться через Telegram initData'}
            </button>

            {error && <div style={{ color: 'red' }}>Ошибка авторизации</div>}

            {/* Блок для локальной отладки вне Telegram */}
            <div style={{ marginTop: 16 }}>
                <h3>Локальная отладка (не в Telegram)</h3>
                <p style={{ fontSize: 12 }}>
                    Если ты запускаешь приложение просто в браузере и у тебя нет
                    window.Telegram.WebApp, можно вручную ввести initData.
                </p>
                <textarea
                    rows={3}
                    style={{ width: '100%', maxWidth: 500 }}
                    placeholder="Вставь сюда initData или что-то в формате telegramId=12345;username=vasya"
                    value={manualInitData}
                    onChange={(e) => setManualInitData(e.target.value)}
                />
            </div>

            <div style={{ marginTop: 16 }}>
                <h2>Session state</h2>
                <pre>{JSON.stringify(session, null, 2)}</pre>
            </div>
        </div>
    )
}
