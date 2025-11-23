import type { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface MainLayoutProps {
    children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    const navigate = useNavigate()
    const location = useLocation()

    const isActive = (path: string) => location.pathname === path

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                background: '#020617',
                color: 'white',
            }}
        >
            {/* Контент страницы */}
            <div style={{ flex: 1, paddingBottom: 56 }}>{children}</div>

            {/* Нижнее меню навигации (как табы) */}
            <nav
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 56,
                    borderTop: '1px solid #1f2933',
                    background: '#020617',
                    display: 'flex',
                }}
            >
                <NavButton
                    label="Главная"
                    active={isActive('/')}
                    onClick={() => navigate('/')}
                />
                <NavButton
                    label="Подписки"
                    active={isActive('/subscriptions')}
                    onClick={() => navigate('/subscriptions')}
                />
                <NavButton
                    label="Корзина"
                    active={isActive('/cart')}
                    onClick={() => navigate('/cart')}
                />
                <NavButton
                    label="Профиль"
                    active={isActive('/profile')}
                    onClick={() => navigate('/profile')}
                />
            </nav>
        </div>
    )
}

interface NavButtonProps {
    label: string
    active: boolean
    onClick: () => void
}

function NavButton({ label, active, onClick }: NavButtonProps) {
    return (
        <button
            onClick={onClick}
            style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                color: active ? '#22c55e' : '#9ca3af',
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                cursor: 'pointer',
            }}
        >
            {label}
        </button>
    )
}
