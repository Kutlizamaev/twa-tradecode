interface TelegramWebApp {
    initData: string
    initDataUnsafe: any
    version: string
    platform: string
    ready: () => void
    openTelegramLink?: (url: string) => void
}

interface TelegramNamespace {
    WebApp: TelegramWebApp
}

interface Window {
    Telegram?: TelegramNamespace
}
