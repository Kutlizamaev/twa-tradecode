import styles from './UIStyles.module.css'
import PromoCardImagePng from '../../assets/icons/ui/PromoCardImage.png'

const PromoCard = () => {
    return (
        <article className={styles.promoCard}>
            <img src={PromoCardImagePng} alt="Promo Card" width={'100%'} />
        </article>
    )
}

export default PromoCard
