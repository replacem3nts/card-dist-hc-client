import React from 'react'
import { useTranslation } from 'react-i18next'

export const Prescription = ({ id, rxcode, cboname, clienttel, language, prescribername, amount, appt, cardserial, pickedup, loaded, edit}) => {
    const { t } = useTranslation()

    let dateOptions = {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    }

    const appointment = appt ? new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(appt)) : '-'

    return (
        <tr onClick={() => edit(id)}>
            <td>{rxcode}</td>
            <td>{cboname}</td>
            <td>{clienttel}</td>
            <td>{language}</td>
            <td>{prescribername}</td>
            <td>${amount}</td>
            <td>{appointment}</td>
            <td>{cardserial}</td>
            <td>{pickedup ? t('yes') : t('no')}</td>
            <td>{loaded ? t('yes') : t('no')}</td>
        </tr>
    )
}
