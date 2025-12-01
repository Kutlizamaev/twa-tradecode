import styles from './UIStyles.module.css'
import BackButtonIcon from '../../assets/icons/ui/BackButtonIcon.svg'

interface PageHeaderProps {
    title?: string
    showBackButton?: boolean
    onBackClick?: () => void
}

const PageHeader = ({
    title,
    showBackButton = true,
    onBackClick,
}: PageHeaderProps) => {
    const handleBack = () => {
        if (onBackClick) {
            onBackClick()
        } else {
            window.history.back()
        }
    }

    return (
        <header className={styles.header}>
            {showBackButton ? (
                <button
                    className={styles.backButton}
                    type="button"
                    onClick={handleBack}
                >
                    <img src={BackButtonIcon} alt="" />
                </button>
            ) : (
                <div className={styles.backButtonPlaceholder} />
            )}

            {title && <h1 className={styles.title}>{title}</h1>}
        </header>
    )
}

export default PageHeader
