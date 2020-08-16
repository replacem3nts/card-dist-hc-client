import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Prescription } from './Prescription'
import { Link } from 'react-router-dom'

let mapState = (state) => {
    return {prescriptions: state.prescriptions}
}

const PrescriptionsList = ({ prescriptions, updatePrescription }) => {
    const [editRx, setEditRx] = useState(false)
    const [rxToEdit, setRxToEdit] = useState({})

    let dateOptions = {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    }

    let handleEdit = (id) => {
        if(!editRx || rxToEdit.id !== id) {
            setupEdit(id)
        } else {
            clearEdit()
        }
    }

    let setupEdit = (id) => {
        let rx = prescriptions.find(presc => presc.id === id)
        setRxToEdit(rx)
        setEditRx(true)
    }

    let clearEdit = () => {
        setEditRx(false)
        setRxToEdit({})
    }

    let handleCancel = (e) => {
        e.preventDefault()
        clearEdit()
    }

    const unloadedRxs = prescriptions.filter(rx => rx.loaded === true)
    const rxArr = unloadedRxs.map(rx => {
        return <Prescription key={rx.id} {...rx} edit={handleEdit}/>
    })

    return (
        <>
        <section className='button-break'>
            <Link to='/' className='small-button'>Rxs in Progress</Link>
        </section>
        <section className='display-container filled' style={editRx ? {height: 30+'vh'} : {height: 70+'vh'}}>
            <header className='filled-header'>
                <h2>Prescriptions in Progress:</h2>
            </header>
            <table>
                <thead>
                    <tr>
                        <th>Rx Code</th>
                        <th>Org.</th>
                        <th>Client Tel.</th>
                        <th>Lang.</th>
                        <th>Presc.</th>
                        <th>Amount</th>
                        <th>Appt.</th>
                        <th>Card Serial</th>
                        <th>Picked Up</th>
                        <th>Loaded</th>
                    </tr>
                </thead>
                <tbody>
                    {rxArr}
                </tbody>
            </table>
        </section>
        {editRx ? 
                <section className='rx-container'>
                    <div className='rx-detail'>
                        <label>Rx Code: <span>{rxToEdit.rxcode}</span></label>
                        <label>Client Telephone: <span>{rxToEdit.clienttel}</span></label>
                        <label>Language: <span>{rxToEdit.language}</span></label>
                    </div>
                    <div className='rx-detail' style={{width: 80+'%'}}>
                        <label>Notes: <br/><br/><span>{rxToEdit.notes}</span></label>
                    </div>
                    <div className='rx-detail'>
                        <label>Card Serial Number: <span>{rxToEdit.cardserial}</span></label>
                        <label>Appointment: <span>{new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(rxToEdit.appt))}</span></label>
                    </div>
                    <button onClick={(e) => handleCancel(e)} className='small-button'>Close</button>
                </section>
        :
            null
        }
        </>
    )
}

export default connect(mapState)(PrescriptionsList)
