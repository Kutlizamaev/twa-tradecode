import { useEffect, useRef, useState } from 'react'
import styles from './SubscriptionUIStyles.module.css'

import DropdownIcon from '../../../assets/icons/ui/DropdownIcon.svg'
import SubscriptionCard from './SubscriptionCard'

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

    const bodyTimeoutRef = useRef<number | null>(null)
    const headerTimeoutRef = useRef<number | null>(null)

    const clearTimers = () => {
        if (bodyTimeoutRef.current !== null) {
            window.clearTimeout(bodyTimeoutRef.current)
            bodyTimeoutRef.current = null
        }
        if (headerTimeoutRef.current !== null) {
            window.clearTimeout(headerTimeoutRef.current)
            headerTimeoutRef.current = null
        }
    }

    useEffect(() => {
        return () => {
            clearTimers()
        }
    }, [])

    const handleToggle = () => {
        clearTimers()

        if (isOpen) {
            // закрытие
            setIsClosing(true)
            setIsOpen(false)

            bodyTimeoutRef.current = window.setTimeout(() => {
                setIsClosing(false)

                setIsHeaderClosing(true)
                setIsHeaderOpen(false)

                headerTimeoutRef.current = window.setTimeout(() => {
                    setIsHeaderClosing(false)
                }, HEADER_RADIUS_DURATION)
            }, BODY_CLOSE_DURATION)
        } else {
            // открытие
            setIsHeaderOpening(true)
            setIsHeaderOpen(true)

            headerTimeoutRef.current = window.setTimeout(() => {
                setIsHeaderOpening(false)

                setIsOpen(true)
                setIsClosing(false)
            }, HEADER_RADIUS_DURATION)
        }
    }

    const serviceId =
        name === 'ByBit Eye'
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
                    serviceName={name}
                    title="Zelimxan"
                    uid="963852741"
                    status="active"
                    daysLeft={5}
                    price7={10}
                    price30={30}
                />
                <SubscriptionCard
                    id="2"
                    serviceId={serviceId}
                    serviceName={name}
                    title="Rachel"
                    uid="842568475"
                    status="active"
                    daysLeft={5}
                    price7={10}
                    price30={30}
                />
                <SubscriptionCard
                    id="3"
                    serviceId={serviceId}
                    serviceName={name}
                    title="Zagit"
                    uid="321329123"
                    status="expired"
                    price7={10}
                    price30={30}
                />
                <SubscriptionCard
                    id="4"
                    serviceId={serviceId}
                    serviceName={name}
                    title="Ishak"
                    uid="684659451"
                    status="expired"
                    price7={10}
                    price30={30}
                />
            </div>
        </section>
    )
}

export default SubscriptionAccordeon
