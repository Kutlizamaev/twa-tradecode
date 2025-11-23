export function getTelegramInitData(): string | null {
    if (typeof window === 'undefined') return null

    const tg = window.Telegram
    if (!tg || !tg.WebApp) {
        return null
    }

    if (typeof tg.WebApp.initData === 'string') {
        return tg.WebApp.initData
    }

    return null
}
