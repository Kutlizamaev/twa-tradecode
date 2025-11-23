import { useDispatch, useSelector } from 'react-redux'
import { useAuthTelegramMutation } from '../api/baseApi'
import { setAuth } from '../store/sessionSlice'
import type { RootState } from '../store/store'
import { getTelegramInitData } from '../telegram/getInitData'
import { useMemo, useState } from 'react'

type EnvInfo = {
    hasWindow: boolean
    hasTelegram: boolean
    hasWebApp: boolean
    initDataSnippet: string
}

export default function HomePage() {
    const dispatch = useDispatch()
    const session = useSelector((state: RootState) => state.session)

    const [authTelegram, { isLoading, error }] = useAuthTelegramMutation()
    const [manualInitData, setManualInitData] = useState('')

    // 🔍 Диагностика окружения Telegram — считаем один раз при первом рендере
    const envInfo: EnvInfo = useMemo(() => {
        if (typeof window === 'undefined') {
            return {
                hasWindow: false,
                hasTelegram: false,
                hasWebApp: false,
                initDataSnippet: '',
            }
        }

        const tg = (window as any).Telegram

        return {
            hasWindow: true,
            hasTelegram: !!tg,
            hasWebApp: !!tg?.WebApp,
            initDataSnippet:
                typeof tg?.WebApp?.initData === 'string'
                    ? tg.WebApp.initData.slice(0, 80)
                    : '',
        }
    }, [])

    const handleAuth = async () => {
        const realInitData = getTelegramInitData()
        const initDataToSend = realInitData ?? manualInitData

        if (!initDataToSend) {
            alert(
                'InitData не найдено. Либо открой приложение в Telegram Mini App, либо введи initData вручную.'
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

            {/* Блок диагностики окружения */}
            <div
                style={{
                    marginTop: 16,
                    padding: 12,
                    border: '1px solid #ccc',
                    borderRadius: 8,
                    maxWidth: 600,
                    fontSize: 14,
                }}
            >
                <h3>Telegram env debug</h3>
                <div>hasWindow: {String(envInfo.hasWindow)}</div>
                <div>hasTelegram: {String(envInfo.hasTelegram)}</div>
                <div>hasWebApp: {String(envInfo.hasWebApp)}</div>
                <div>
                    initDataSnippet:{' '}
                    {envInfo.initDataSnippet
                        ? envInfo.initDataSnippet
                        : '(пусто или нет строки)'}
                </div>
            </div>

            {/* Для локальной отладки вне Telegram */}
            <div style={{ marginTop: 16 }}>
                <h3>Ручной initData (для браузера)</h3>
                <textarea
                    rows={3}
                    style={{ width: '100%', maxWidth: 500 }}
                    placeholder="Вставь сюда initData или строку типа telegramId=12345;username=vasya"
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
