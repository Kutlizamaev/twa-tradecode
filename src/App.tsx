import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { MainLayout } from './components/MainLayout'

export const App = () => {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    )
}
