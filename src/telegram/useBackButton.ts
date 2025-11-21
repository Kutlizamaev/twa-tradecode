import { useEffect } from 'react'
import { getTelegramWebApp } from './webapp'

export const useBackButton = (onClick: () => void) => {
    useEffect(() => {
        const tg = getTelegramWebApp()
        if (!tg?.BackButton) return

        tg.BackButton.show()
        tg.BackButton.onClick(onClick)

        return () => {
            tg.BackButton.offClick(onClick)
            tg.BackButton.hide()
        }
    }, [onClick])
}
