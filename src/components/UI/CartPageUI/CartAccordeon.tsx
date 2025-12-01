import styles from './CartUIStyles.module.css'
import ClearAccordeonIcon from '../../../assets/icons/ui/ClearAccordeonIcon.svg'
import DropdownIcon from '../../../assets/icons/ui/DropdownIcon.svg'
import { useState } from 'react'
import { useAppDispatch } from '../../../store/hooks'
import { unselectAll } from '../../../features/cart/cartSlice'

interface CartAccordeonProps {
    title: string
    total: string
    children: React.ReactNode
}

const BODY_CLOSE_DURATION = 350
const HEADER_RADIUS_DURATION = 250

const CartAccordeon = ({ title, total, children }: CartAccordeonProps) => {
    const dispatch = useAppDispatch()

    const unselectAllItems = () => {
        dispatch(unselectAll(title))
    }

    const [isOpen, setIsOpen] = useState(true)
    const [isHeaderClosing, setIsHeaderClosing] = useState(false)
    const [isHeaderOpen, setIsHeaderOpen] = useState(true)
    const [isClosing, setIsClosing] = useState(false)
    const [isHeaderOpening, setIsHeaderOpening] = useState(false)

    const handleToggle = () => {
        if (isOpen) {
            setIsClosing(true)
            setIsOpen(false)

            setTimeout(() => {
                setIsClosing(false)

                setIsHeaderClosing(true)
                setIsHeaderOpen(false)

                setTimeout(() => {
                    setIsHeaderClosing(false)
                }, HEADER_RADIUS_DURATION)
            }, BODY_CLOSE_DURATION)
        } else {
            setIsHeaderOpening(true)
            setIsHeaderOpen(true)

            setTimeout(() => {
                setIsHeaderOpening(false)

                setIsOpen(true)
                setIsClosing(false)
            }, HEADER_RADIUS_DURATION)
        }
    }

    return (
        <section className={styles.accordeon}>
            <header
                className={`${styles.accordeonHeader} ${
                    isHeaderOpen ? styles.accordeonHeaderIsOpen : ''
                } ${isHeaderClosing ? styles.accordeonHeaderClosing : ''} ${
                    isHeaderOpening ? styles.accordeonHeaderOpening : ''
                }`}
            >
                <div className={styles.headerLeft}>
                    {title === 'Отрисовка' ? null : (
                        <button
                            type="button"
                            className={styles.arrow}
                            onClick={unselectAllItems}
                        >
                            <img src={ClearAccordeonIcon} alt="" />
                        </button>
                    )}

                    <span className={styles.accordeonTitle}>{title}</span>
                </div>
                <div className={styles.headerRight}>
                    <div className={styles.totalTag}>
                        <span>Всего</span> {total}
                    </div>
                    <button
                        type="button"
                        className={`${styles.accordeonToggle} ${
                            isOpen ? styles.accordeonToggleOpen : ''
                        }`}
                        onClick={handleToggle}
                    >
                        <img
                            className={styles.accordeonToggleIcon}
                            src={DropdownIcon}
                            alt=""
                        />
                    </button>
                </div>
            </header>

            <div
                className={`${styles.accordeonBody} ${
                    isOpen
                        ? styles.accordeonBodyOpen
                        : styles.accordeonBodyClosed
                } ${isClosing ? styles.closing : styles.opening}`}
            >
                {children}
            </div>
        </section>
    )
}

export default CartAccordeon
