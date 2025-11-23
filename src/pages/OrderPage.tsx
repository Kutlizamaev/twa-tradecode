import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import type { RootState } from '../store/store'
import { useGetRenderingsQuery } from '../api/baseApi'

export function OrderPage() {
    const navigate = useNavigate()
    const cart = useSelector((state: RootState) => state.cart)

    const {
        data: renderingsData,
        isLoading: isRenderingsLoading,
        error: renderingsError,
    } = useGetRenderingsQuery()

    const renderings = renderingsData?.items ?? []

    const cartTotal = cart.items.reduce(
        (sum, item) => sum + item.pricePerUnit * item.count,
        0
    )

    const renderingsTotal = renderings
        .filter((r) => r.status === 'pending')
        .reduce((sum, r) => sum + r.price, 0)

    const total = cartTotal + renderingsTotal

    const handleBackToCart = () => {
        navigate('/cart')
    }

    const handleConfirmOrder = () => {
        // здесь в будущем будет запрос на бэк: /checkout
        // пока просто лог
        console.log('Оформление заказа', {
            cartItems: cart.items,
            renderings: renderings.filter((r) => r.status === 'pending'),
            total,
        })
        alert('Здесь потом будет логика оформления заказа')
    }

    return (
        <div style={{ padding: 16 }}>
            <h1>Оформление заказа</h1>

            <button style={{ marginBottom: 16 }} onClick={handleBackToCart}>
                ← Назад в корзину
            </button>

            {/* Резюме локальных позиций */}
            <section style={{ marginTop: 8 }}>
                <h2>Подписки и продления</h2>
                {cart.items.length === 0 ? (
                    <div>Нет локальных позиций</div>
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
                                    <strong>План:</strong> {item.plan}
                                </div>
                                <div>
                                    <strong>Количество:</strong> {item.count}
                                </div>
                                <div>
                                    <strong>Сумма:</strong>{' '}
                                    {item.pricePerUnit * item.count} USDT
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/* Резюме отрисовок */}
            <section style={{ marginTop: 16 }}>
                <h2>Отрисовка документов</h2>

                {isRenderingsLoading && <div>Загружаем отрисовки...</div>}
                {renderingsError && (
                    <div style={{ color: 'red' }}>
                        Ошибка загрузки отрисовок
                    </div>
                )}

                {!isRenderingsLoading && !renderingsError && (
                    <>
                        {renderings.filter((r) => r.status === 'pending')
                            .length === 0 ? (
                            <div>Нет отрисовок, ожидающих оплаты</div>
                        ) : (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {renderings
                                    .filter((r) => r.status === 'pending')
                                    .map((r) => (
                                        <li
                                            key={r.id}
                                            style={{
                                                border: '1px solid #ddd',
                                                borderRadius: 8,
                                                padding: 8,
                                                marginBottom: 8,
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
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </>
                )}
            </section>

            {/* Итого + выбор способа оплаты */}
            <section style={{ marginTop: 24 }}>
                <h2>Оплата</h2>

                <div style={{ marginBottom: 8 }}>
                    <strong>Итого к оплате:</strong>{' '}
                    <span style={{ fontSize: 18, fontWeight: 'bold' }}>
                        {total} USDT
                    </span>
                </div>

                <div style={{ marginBottom: 8 }}>
                    <label>
                        <input type="radio" name="pay_method" defaultChecked />{' '}
                        Со счёта аккаунта
                    </label>
                    <br />
                    <label>
                        <input type="radio" name="pay_method" /> Перевод на UID
                    </label>
                    <br />
                    <label>
                        <input type="radio" name="pay_method" /> Bep20
                    </label>
                    <br />
                    <label>
                        <input type="radio" name="pay_method" /> TRC20
                    </label>
                </div>

                <button
                    style={{
                        marginTop: 8,
                        padding: '8px 16px',
                        borderRadius: 8,
                        border: 'none',
                        background: '#0f766e',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: 16,
                    }}
                    disabled={total === 0}
                    onClick={handleConfirmOrder}
                >
                    Подтвердить заказ
                </button>
            </section>
        </div>
    )
}
