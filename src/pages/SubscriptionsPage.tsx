import { useGetSubscriptionsQuery } from '../api/baseApi'

export function SubscriptionsPage() {
    const { data, isLoading, error } = useGetSubscriptionsQuery()

    if (isLoading) return <div>Загружаем подписки...</div>
    if (error) return <div>Ошибка загрузки подписок</div>
    if (!data || data.items.length === 0) return <div>Подписок пока нет</div>

    return (
        <div style={{ padding: 16 }}>
            <h1>Мои подписки</h1>
            <ul>
                {data.items.map((sub) => (
                    <li key={sub.id} style={{ marginBottom: 8 }}>
                        <strong>
                            {sub.service?.name ?? 'Сервис'} —{' '}
                            {sub.accountNickname}
                        </strong>
                        <div>UID: {sub.accountUid}</div>
                        <div>
                            Статус: {sub.status}{' '}
                            {sub.daysLeft !== null &&
                                `(${sub.daysLeft} дней осталось)`}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
