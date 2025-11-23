interface TelegramWebApp {
    initData: string
    initDataUnsafe: any
    version: string
    platform: string
    ready: () => void
}

interface TelegramNamespace {
    WebApp: TelegramWebApp
}

interface Window {
    Telegram?: TelegramNamespace
}
