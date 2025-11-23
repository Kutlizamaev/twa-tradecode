// src/App.tsx
import React from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import HomePage from './pages/HomePage/HomePage'
import { SubscriptionsPage } from './pages/SubscriptionsPage'
import { ProfilePage } from './pages/ProfilePage'
import { CartPage } from './pages/CartPage'

const App: React.FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/subscriptions"
                        element={<SubscriptionsPage />}
                    />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/cart" element={<CartPage />} />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default App
