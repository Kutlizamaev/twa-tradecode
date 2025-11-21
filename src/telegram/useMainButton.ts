import { useEffect } from 'react'
import { getTelegramWebApp } from './webapp'

export const useMainButton = (text: string, onClick: () => void) => {
    useEffect(() => {
        const tg = getTelegramWebApp()
        if (!tg?.MainButton) return

        tg.MainButton.setText(text)
        tg.MainButton.show()
        tg.MainButton.onClick(onClick)

        return () => {
            tg.MainButton.offClick(onClick)
            tg.MainButton.hide()
        }
    }, [text, onClick])
}
