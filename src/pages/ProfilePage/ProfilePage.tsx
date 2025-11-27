import styles from './ProfilePage.module.css'

import CopyIcon from '../../assets/icons/ui/CopyIcon.svg'
import { useMemo } from 'react'

export const ProfilePage = () => {
    const uid = '321 23 31 23'

    const username = useMemo(() => {
        const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user

        if (tgUser?.username) {
            return `@${tgUser.username}`
        }

        if (tgUser?.first_name) {
            return tgUser.first_name
        }

        return '@tradecode'
    }, [])

    const handleCopyUid = () => {
        navigator.clipboard?.writeText(uid.replace(/\s/g, '')).catch(() => {})
    }

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Профиль</h1>

            <section className={styles.card}>
                <div className={styles.uidRow}>
                    <div>
                        <div className={styles.uidValue}>{uid}</div>
                        <div className={styles.uidLabel}>Основной UID</div>
                    </div>

                    <button
                        type="button"
                        className={styles.copyButton}
                        onClick={handleCopyUid}
                    >
                        <img src={CopyIcon} alt="" />
                    </button>
                </div>

                <div className={styles.usernameBlock}>
                    <div className={styles.username}>{username}</div>
                    <div className={styles.usernameLabel}>
                        Никнейм в Telegram
                    </div>
                </div>

                <div className={styles.activityBlock}>
                    <div className={styles.activityTitle}>
                        Активных аккаунтов
                    </div>

                    <div className={styles.activityGridHeader}>
                        <span>ByBit Eye</span>
                        <span>PDF Checker</span>
                        <span>TC Reqs</span>
                    </div>

                    <div className={styles.activityGridValues}>
                        <span>20</span>
                        <span>12</span>
                        <span>0</span>
                    </div>
                </div>
            </section>
        </div>
    )
}
