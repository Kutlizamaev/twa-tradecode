import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/Layouts/MainLayout'
import HomePage from './pages/HomePage/HomePage'
import SubscriptionsPage from './pages/SubscriptionPage/SubscriptionsPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import CartPage from './pages/CartPage/CartPage'
import TopUpPage from './pages/TopUpPage/TopUpPage'
import PaymentPage from './pages/PaymentPage/PaymentPage'

const App = () => {
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
                    <Route path="/topup" element={<TopUpPage />} />

                    <Route path="/payment" element={<PaymentPage />} />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default App
