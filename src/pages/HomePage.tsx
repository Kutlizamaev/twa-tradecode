import { useMainButton } from '../telegram/useMainButton'
import { useGetProfileQuery } from '../api/userApi'

export default function HomePage() {
    const { data, isLoading } = useGetProfileQuery()

    useMainButton('Продолжить', () => {
        alert('MainButton clicked!')
    })

    return (
        <div>
            <h1>Telegram WebApp Template</h1>
            {isLoading ? 'Загрузка...' : JSON.stringify(data)}
        </div>
    )
}
