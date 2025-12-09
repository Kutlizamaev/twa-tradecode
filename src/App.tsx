import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/Layouts/MainLayout'
import HomePage from './pages/HomePage/HomePage'
import SubscriptionsPage from './pages/SubscriptionPage/SubscriptionsPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import CartPage from './pages/CartPage/CartPage'
import TopUpPage from './pages/TopUpPage/TopUpPage'
import PaymentPage from './pages/PaymentPage/PaymentPage'
import { ServiceOrderPage } from './pages/ServiceOrderPage/ServiceOrderPage'

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

                    <Route
                        path="/order/bybit-eye"
                        element={<ServiceOrderPage serviceId="BYBIT_EYE" />}
                    />
                    <Route
                        path="/order/pdf-checker"
                        element={<ServiceOrderPage serviceId="PDF_CHECKER" />}
                    />
                    <Route
                        path="/order/htx-eye"
                        element={<ServiceOrderPage serviceId="HTX_EYE" />}
                    />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default App
