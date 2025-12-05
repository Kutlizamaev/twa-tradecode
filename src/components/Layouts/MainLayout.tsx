import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styles from './MainLayout.module.css'
import BottomNav from '../UI/BottomNav'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectCartSummary } from '../../features/cart/cartSlice'
import {
    selectSubscriptionsSummary,
    selectSelectedForCartList,
} from '../../features/subscriptions/subscriptionsSlice'
import { addManyFromSubscriptions } from '../../features/cart/cartSlice'
import CartBar from '../UI/CartBarUI/CartBar'
import PaymentResultModal from '../UI/PaymentResultModal'
import {
    resetPayment,
    selectPaymentStatus,
} from '../../features/payment/paymentSlice'

const MainLayout = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const isSubscriptionsPage = location.pathname === '/subscriptions'
    const isCartPage = location.pathname === '/cart'
    const isTopUpPage = location.pathname === '/topup'
    const isPaymentPage = location.pathname === '/payment'

    const dispatch = useAppDispatch()

    const { selectedUsers: cartUsers, totalPrice: cartTotal } =
        useAppSelector(selectCartSummary)

    const { selectedUsers: subsUsers, totalPrice: subsTotal } = useAppSelector(
        selectSubscriptionsSummary
    )

    const selectedForCart = useAppSelector(selectSelectedForCartList)
    const hasSelectionOnSubscriptions = subsUsers > 0

    const paymentStatus = useAppSelector(selectPaymentStatus)
    const isPaymentSuccess = paymentStatus === 'success'

    const handleAddToCart = () => {
        if (!selectedForCart.length) return
        dispatch(addManyFromSubscriptions(selectedForCart))
        navigate('/cart')
    }

    const handlePay = () => {
        navigate('/payment')
    }

    const handleClosePaymentModal = () => {
        dispatch(resetPayment())
    }

    return (
        <div className={styles.root}>
            <div className={styles.inner}>
                <div className={styles.content}>
                    <Outlet />
                </div>
                <div className={styles.bottomDock}>
                    <CartBar
                        visible={
                            isSubscriptionsPage && hasSelectionOnSubscriptions
                        }
                        selectedUsers={subsUsers}
                        totalPrice={`${subsTotal} USDT`}
                        onPrimaryClick={handleAddToCart}
                    />

                    <CartBar
                        visible={isCartPage}
                        selectedUsers={cartUsers}
                        totalPrice={`${cartTotal} USDT`}
                        isCartPage
                        onPrimaryClick={handlePay}
                    />

                    {!isTopUpPage && !isPaymentPage && (
                        <BottomNav
                            cartBarIsVisible={
                                isSubscriptionsPage &&
                                hasSelectionOnSubscriptions
                            }
                            isCartPage={isCartPage}
                        />
                    )}
                </div>
                <PaymentResultModal
                    isOpen={isPaymentSuccess}
                    onClose={handleClosePaymentModal}
                />
            </div>
        </div>
    )
}

export default MainLayout
