import { useState } from 'react'
import styles from './SubscriptionUIStyles.module.css'

import DropdownIcon from '../../../assets/icons/ui/DropdownIcon.svg'
import { SubscriptionCard } from './SubscriptionCard'

interface AccordeonProps {
    name: string
}

const BODY_CLOSE_DURATION = 350
const HEADER_RADIUS_DURATION = 250

const SubscriptionAccordeon = ({ name }: AccordeonProps) => {
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

    const serviceId =
        name === 'Bybit Eye'
            ? 'BYBIT_EYE'
            : name === 'PDF Checker'
            ? 'PDF_CHECKER'
            : name

    return (
        <section className={styles.serviceSection}>
            <header
                className={`${styles.serviceHeader} ${
                    isHeaderOpen ? styles.serviceHeaderIsOpen : ''
                } ${isHeaderClosing ? styles.serviceHeaderClosing : ''} ${
                    isHeaderOpening ? styles.serviceHeaderOpening : ''
                }`}
            >
                <span className={styles.serviceName}>{name}</span>

                <button
                    className={`${styles.serviceToggle} ${
                        isOpen ? styles.serviceToggleOpen : ''
                    }`}
                    onClick={handleToggle}
                >
                    <span className={styles.serviceToggleIcon}>
                        <img src={DropdownIcon} alt="" />
                    </span>
                </button>
            </header>

            <div
                className={`${styles.serviceBody} ${
                    isOpen ? styles.serviceBodyOpen : styles.serviceBodyClosed
                } ${isClosing ? styles.closing : styles.opening}`}
            >
                <SubscriptionCard
                    id="1"
                    serviceId={serviceId}
                    title="Zelimxan"
                    uid="321 32 91 23"
                    status="active"
                    daysLeft={5}
                    price7={10}
                    price30={30}
                />
                <SubscriptionCard
                    id="2"
                    serviceId={serviceId}
                    title="Zelimxan"
                    uid="321 32 91 23"
                    status="active"
                    daysLeft={5}
                    price7={10}
                    price30={30}
                />
                <SubscriptionCard
                    id="3"
                    serviceId={serviceId}
                    title="Zelimxan"
                    uid="321 32 91 23"
                    status="expired"
                    price7={10}
                    price30={30}
                />
                <SubscriptionCard
                    id="4"
                    serviceId={serviceId}
                    title="Zelimxan"
                    uid="321 32 91 23"
                    status="expired"
                    price7={10}
                    price30={30}
                />
            </div>
        </section>
    )
}

export default SubscriptionAccordeon
