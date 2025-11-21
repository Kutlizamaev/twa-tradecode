import type { PropsWithChildren } from 'react'

export const MainLayout = ({ children }: PropsWithChildren) => {
    return (
        <div
            style={{
                padding: '16px',
                minHeight: '100dvh',
                background: 'var(--tg-bg)',
                color: 'var(--tg-text)',
            }}
        >
            {children}
        </div>
    )
}
