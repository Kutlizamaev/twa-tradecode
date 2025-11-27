import { useState } from 'react'
import styles from './CartUIStyles.module.css'
import ClearAccordeonIcon from '../../../assets/icons/ui/ClearAccordeonIcon.svg'
import DropdownIcon from '../../../assets/icons/ui/DropdownIcon.svg'

interface CartAccordeonProps {
    title: string
    total: string
    children: React.ReactNode
}

export const CartAccordeon = ({
    title,
    total,
    children,
}: CartAccordeonProps) => {
    const [open, setOpen] = useState(true)

    return (
        <div className={`${styles.accordeon} ${open ? styles.open : ''}`}>
            <div className={styles.accordeonHeader}>
                <div className={styles.headerLeft}>
                    {title === 'Отрисовка' ? null : (
                        <div className={styles.arrow}>
                            <img src={ClearAccordeonIcon} alt="" />
                        </div>
                    )}

                    <span className={styles.accordeonTitle}>{title}</span>
                </div>
                <div className={styles.headerRight}>
                    <div className={styles.totalTag}>
                        <span>Всего</span> {total}
                    </div>
                    <div
                        className={styles.accordeonToggle}
                        onClick={() => setOpen(!open)}
                    >
                        <img src={DropdownIcon} alt="" />
                    </div>
                </div>
            </div>

            {open && <div className={styles.accordeonBody}>{children}</div>}
        </div>
    )
}
