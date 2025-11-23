import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import type { RootState } from '../store/store'
import { removeItem } from '../store/cartSlice'
import { useGetRenderingsQuery } from '../api/baseApi'
import type { RenderingItem } from '../api/types'

export function CartPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector((state: RootState) => state.cart)

    const {
        data: renderingsData,
        isLoading: isRenderingsLoading,
        error: renderingsError,
    } = useGetRenderingsQuery()

    const renderings: RenderingItem[] = renderingsData?.items ?? []

    const cartTotal = cart.items.reduce(
        (sum, item) => sum + item.pricePerUnit * item.count,
        0
    )

    const renderingsTotal = renderings
        .filter((r) => r.status === 'pending')
        .reduce((sum, r) => sum + r.price, 0)

    const total = cartTotal + renderingsTotal

    const handleGoToOrder = () => {
        if (!cart.items.length && !renderings.length) {
            alert('Корзина пуста')
            return
        }
        navigate('/order')
    }

    return (
        <div style={{ padding: 16 }}>
            <h1>Корзина</h1>

            {/* Локальные позиции корзины */}
            <section style={{ marginTop: 16 }}>
                <h2>Локальные заказы (подписки / продления)</h2>

                {cart.items.length === 0 ? (
                    <div>Пока ничего нет</div>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {cart.items.map((item) => (
                            <li
                                key={item.id}
                                style={{
                                    border: '1px solid #ddd',
                                    borderRadius: 8,
                                    padding: 8,
                                    marginBottom: 8,
                                }}
                            >
                                <div>
                                    <strong>Сервис ID:</strong> {item.serviceId}
                                </div>
                                <div>
                                    <strong>Тип:</strong> {item.type} / план:{' '}
                                    {item.plan}
                                </div>
                                <div>
                                    <strong>Количество:</strong> {item.count}
                                </div>
                                <div>
                                    <strong>Цена за единицу:</strong>{' '}
                                    {item.pricePerUnit} USDT
                                </div>
                                <div>
                                    <strong>Сумма:</strong>{' '}
                                    {item.pricePerUnit * item.count} USDT
                                </div>
                                {item.accountNickname && (
                                    <div>
                                        <strong>Аккаунт:</strong>{' '}
                                        {item.accountNickname} (
                                        {item.accountUid})
                                    </div>
                                )}

                                <button
                                    style={{
                                        marginTop: 8,
                                        padding: '4px 8px',
                                        borderRadius: 4,
                                        border: '1px solid #e11',
                                        background: 'white',
                                        color: '#e11',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() =>
                                        dispatch(removeItem(item.id))
                                    }
                                >
                                    Удалить
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                <div style={{ marginTop: 8 }}>
                    <strong>Итого по локальной корзине:</strong> {cartTotal}{' '}
                    USDT
                </div>
            </section>

            {/* Оффлайн-отрисовки с бэка */}
            <section style={{ marginTop: 24 }}>
                <h2>Заказы на отрисовку (с бэка)</h2>

                {isRenderingsLoading && <div>Загружаем...</div>}
                {renderingsError && (
                    <div style={{ color: 'red' }}>
                        Ошибка загрузки отрисовок
                    </div>
                )}

                {!isRenderingsLoading && !renderingsError && (
                    <>
                        {renderings.length === 0 ? (
                            <div>Нет заказов на отрисовку</div>
                        ) : (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {renderings.map((r) => (
                                    <li
                                        key={r.id}
                                        style={{
                                            border: '1px solid #ddd',
                                            borderRadius: 8,
                                            padding: 8,
                                            marginBottom: 8,
                                            opacity:
                                                r.status !== 'pending'
                                                    ? 0.6
                                                    : 1,
                                        }}
                                    >
                                        <div>
                                            <strong>{r.title}</strong>
                                        </div>
                                        <div>
                                            Сервис:{' '}
                                            {r.service?.name ?? r.serviceId}
                                        </div>
                                        <div>
                                            Цена: {r.price} {r.currency}
                                        </div>
                                        <div>Статус: {r.status}</div>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div style={{ marginTop: 8 }}>
                            <strong>Итого по отрисовкам (pending):</strong>{' '}
                            {renderingsTotal} USDT
                        </div>
                    </>
                )}
            </section>

            {/* Общий итог + кнопка */}
            <section style={{ marginTop: 24 }}>
                <h2>Итого</h2>
                <div style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {total} USDT
                </div>

                <button
                    style={{
                        marginTop: 12,
                        padding: '8px 16px',
                        borderRadius: 8,
                        border: 'none',
                        background: '#16a34a',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: 16,
                    }}
                    onClick={handleGoToOrder}
                    disabled={total === 0}
                >
                    Перейти к оформлению
                </button>
            </section>
        </div>
    )
}
