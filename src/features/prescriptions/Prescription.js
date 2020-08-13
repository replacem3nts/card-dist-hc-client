import React from 'react'
import { useTranslation } from 'react-i18next'

export const Prescription = ({ id, rxcode, hcname, clienttel, language, prescribername, amount, appt, cardserial, pickedup, loaded, edit}) => {
    const { t } = useTranslation()

    return (
        <tr onClick={() => edit(id)}>
            <td>{rxcode}</td>
            <td>{hcname}</td>
            <td>{clienttel}</td>
            <td>{language}</td>
            <td>{prescribername}</td>
            <td>${amount}</td>
            <td>{appt ? appt : '-'}</td>
            <td>{cardserial ? cardserial : '-'}</td>
            <td>{pickedup ? t('yes') : t('no')}</td>
            <td>{loaded ? t('yes') : t('no')}</td>
        </tr>
    )
}
