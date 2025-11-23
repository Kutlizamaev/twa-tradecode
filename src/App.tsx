import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import { CartPage } from './pages/CartPage'
import { OrderPage } from './pages/OrderPage'
import { SubscriptionsPage } from './pages/SubscriptionsPage'
import { ProfilePage } from './pages/ProfilePage'

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/order" element={<OrderPage />} />
                <Route path="/subscriptions" element={<SubscriptionsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </BrowserRouter>
    )
}
