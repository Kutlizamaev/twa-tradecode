import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ServiceOrderStyles.module.css'

import BybitEyeLogoIcon from '../../assets/icons/logo/BybitEyeLogoIcon.svg'
import PDFCheckerLogoIcon from '../../assets/icons/logo/PDFCheckerLogoIcon.svg'
import HTXEyeLogoIcon from '../../assets/icons/logo/HTXEyeLogoIcon.svg'

import UsdtIcon from '../../assets/icons/ui/UsdtIcon.svg'

import { BybitOrderForm } from './Forms/BybitOrderForm'
import { PdfOrderForm } from './Forms/PdfOrderForm'
import { HtxOrderForm } from './Forms/HtxOrderForm'

import PageHeader from '../../components/UI/PageHeader'
import type { ServiceCode } from '../../api/types'
import { useAppDispatch } from '../../store/hooks'
import { setPaymentAmount } from '../../features/payment/paymentSlice'

type ServiceFormProps = {
    onTotalChange: (total: number | string) => void
}

type ServiceConfig = {
    title: string
    description: string
    Logo: string
    Form: React.ComponentType<ServiceFormProps>
}

const SERVICE_CONFIG: Record<ServiceCode, ServiceConfig> = {
    BYBIT_EYE: {
        title: 'ByBit Eye',
        description:
            'Профессиональный инструмент для аналитики и контроля торговых сделок на бирже ByBit.',
        Logo: BybitEyeLogoIcon,
        Form: BybitOrderForm,
    },
    PDF_CHECKER: {
        title: 'PDF Checker',
        description:
            'Профессиональный сервис проверки PDF-документов контрагентов на подлинность и корректность.',
        Logo: PDFCheckerLogoIcon,
        Form: PdfOrderForm,
    },
    HTX_EYE: {
        title: 'HTX Eye',
        description: 'Аналитический инструмент для биржи HTX.',
        Logo: HTXEyeLogoIcon,
        Form: HtxOrderForm,
    },
}

interface ServiceOrderPageProps {
    serviceId: ServiceCode
}

export const ServiceOrderPage = ({ serviceId }: ServiceOrderPageProps) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const config = SERVICE_CONFIG[serviceId]

    const [total, setTotal] = useState<number | string>(0)

    const { Logo, Form } = config

    const formattedTotal = typeof total === 'number' ? total.toFixed(2) : total

    const handleSelectUsers = () => {
        if (typeof total === 'number' && total > 0) {
            dispatch(setPaymentAmount(total))
            navigate(`/users/select/${serviceId}`)
        } else if (total === 'Бесплатно') {
            navigate(`/users/select/${serviceId}`)
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.inner}>
                <section className={styles.cardPrimary}>
                    <header className={styles.header}>
                        <PageHeader showBackButton />

                        <div className={styles.serviceInfo}>
                            <div className={styles.serviceLogoWrapper}>
                                <img
                                    src={Logo}
                                    className={styles.serviceLogo}
                                    alt={config.title}
                                />
                                <h1 className={styles.serviceTitle}>
                                    {config.title}
                                </h1>
                            </div>

                            <p className={styles.serviceDescription}>
                                {config.description}
                            </p>
                        </div>
                    </header>

                    <main className={styles.content}>
                        <Form onTotalChange={setTotal} />
                    </main>
                </section>

                <section className={styles.bottomDock}>
                    <div className={styles.bottomInner}>
                        <div className={styles.totalRow}>
                            <span className={styles.totalLabel}>Итого</span>

                            <span className={styles.totalValue}>
                                {formattedTotal}
                                {serviceId !== 'HTX_EYE' && (
                                    <img src={UsdtIcon} alt="" />
                                )}
                            </span>
                        </div>

                        <button
                            className={styles.selectUsersButton}
                            onClick={handleSelectUsers}
                        >
                            Выбрать пользователей
                        </button>
                    </div>
                </section>
            </div>
        </div>
    )
}
