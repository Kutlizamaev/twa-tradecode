declare global {
    interface Window {
        Telegram?: {
            WebApp?: any
        }
    }
}

export const getTelegramWebApp = () => {
    if (typeof window === 'undefined') {
        return null
    }

    return window.Telegram?.WebApp ?? null
}

export const tg = getTelegramWebApp()

export const initTelegram = () => {
    const webApp = getTelegramWebApp()
    if (!webApp) {
        return
    }

    webApp.ready()
    webApp.expand()
    webApp.disableVerticalSwipes()

    document.documentElement.style.setProperty(
        '--tg-bg',
        webApp?.themeParams?.bg_color || '#ffffff'
    )

    document.documentElement.style.setProperty(
        '--tg-text',
        webApp?.themeParams?.text_color || '#000000'
    )
}
