export function getTelegramInitData(): string | null {
    if (typeof window === 'undefined') return null

    const tg = window.Telegram
    if (tg && tg.WebApp && tg.WebApp.initData) {
        return tg.WebApp.initData
    }

    return null
}
