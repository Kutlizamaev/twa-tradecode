import { CartAccordeon } from '../../components/UI/CartPage/CartAccordeon'
import { CartItem } from '../../components/UI/CartPage/CartItem'
import styles from './CartPage.module.css'

export const CartPage = () => {
    return (
        <div className={styles.page}>
            <div className={styles.inner}>
                <h1 className={styles.title}>Корзина</h1>

                <CartAccordeon title="ByBit Eye" total="$35">
                    <CartItem
                        name="Zelimxan"
                        uid="321 32 91 23"
                        duration="7 дней"
                        price="$10"
                        checked
                    />
                    <CartItem
                        name="Zelimxan"
                        uid="321 32 91 23"
                        duration="30 дней"
                        price="$30"
                        checked
                    />
                    <CartItem
                        name="Zelimxan"
                        uid="321 32 91 23"
                        duration="30 дней"
                        price="$30"
                        checked
                    />
                    <CartItem
                        name="Zelimxan"
                        uid="321 32 91 23"
                        duration="30 дней"
                        price="$30"
                        checked
                    />
                    <CartItem
                        name="Zelimxan"
                        uid="321 32 91 23"
                        duration="30 дней"
                        price="$30"
                        checked
                    />
                    <CartItem
                        name="Zelimxan"
                        uid="321 32 91 23"
                        duration="30 дней"
                        price="$30"
                        checked
                    />
                    <CartItem
                        name="Zelimxan"
                        uid="321 32 91 23"
                        duration="30 дней"
                        price="$30"
                        checked
                    />
                </CartAccordeon>

                <CartAccordeon title="PDF Checker" total="$35">
                    <CartItem
                        name="Zelimxan"
                        uid="321 32 91 23"
                        duration="100 доступов"
                        price="$10"
                        checked
                    />
                    <CartItem
                        name="Zelimxan"
                        uid="321 32 91 23"
                        duration="100 доступов"
                        price="$10"
                        checked
                    />
                    <CartItem
                        name="Zelimxan"
                        uid="321 32 91 23"
                        duration="100 доступов"
                        price="$10"
                        checked
                    />
                </CartAccordeon>

                <CartAccordeon title="Отрисовка" total="$35">
                    <p>Описание</p>
                </CartAccordeon>
            </div>
        </div>
    )
}
