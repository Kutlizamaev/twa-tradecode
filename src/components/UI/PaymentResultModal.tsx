import styles from './UIStyles.module.css'

import ModalGroupIcons from '../../assets/icons/ui/ModalGroupIcons.svg'
import ModalCheckMarkIcon from '../../assets/icons/ui/ModalCheckMarkIcon.svg'

type PaymentResultModalProps = {
    isOpen: boolean
    onClose: () => void
}

const PaymentResultModal = ({ isOpen, onClose }: PaymentResultModalProps) => {
    if (!isOpen) return null

    return (
        <div className={styles.backdrop} onClick={onClose}>
            <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
                <img
                    src={ModalGroupIcons}
                    alt=""
                    className={styles.iconsImage}
                />

                <div className={styles.sheetInner}>
                    <div className={styles.modalTitleContainer}>
                        <div className={styles.mainIcon}>
                            <span className={styles.mainIconCheck}>
                                <img src={ModalCheckMarkIcon} alt="" />
                            </span>
                        </div>

                        <h2 className={styles.modalTitle}>
                            <span>Выдали</span>
                            <br />
                            <span>доступы к</span>
                            <br />
                            <span>продуктам</span>
                        </h2>
                    </div>

                    <button className={styles.primaryButton} onClick={onClose}>
                        ОТЛИЧНО
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PaymentResultModal
