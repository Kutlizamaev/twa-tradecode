import styles from './UIStyles.module.css'
import PromoCardImagePng from '../../assets/icons/ui/PromoCardImage.png'

const PromoCard = () => {
    const openTelegramPost = (link: string) => {
        if (window?.Telegram?.WebApp?.openTelegramLink) {
            window.Telegram.WebApp.openTelegramLink(link)
        } else {
            window.open(link, '_blank')
        }
    }

    return (
        <article
            onClick={() => openTelegramPost('https://t.me/p2p_blacklist')}
            className={styles.promoCard}
        >
            <img src={PromoCardImagePng} alt="Promo Card" width={'100%'} />
        </article>
    )
}

export default PromoCard
