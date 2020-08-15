import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Prescription } from './Prescription'
import DateTimePicker from 'react-datetime-picker'
import { fetchRxUpdate } from '../../services/Utils'
import { updatePrescription } from './PrescriptionsSlice'
import { Link } from 'react-router-dom'

let mapState = (state) => {
    return {prescriptions: state.prescriptions}
}

let mapDispatch = { updatePrescription }

const PrescriptionsList = ({ prescriptions, updatePrescription }) => {
    const [editRx, setEditRx] = useState(false)
    const [rxToEdit, setRxToEdit] = useState({})
    const [apptDate, setApptDate] = useState('')
    const [cardserial, setCardserial] = useState('')
    const [pickedUp, setPickedUp] = useState('')

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
        if(rx.appt){setApptDate(new Date(rx.appt))}
        setCardserial(rx.cardserial)
        setPickedUp(rx.pickedup)
        setEditRx(true)
    }

    let clearEdit = () => {
        setEditRx(false)
        setRxToEdit({})
        setApptDate('')
        setCardserial('')
        setPickedUp('')
    }

    let handleSubmit = (e) => {
        e.preventDefault()
        let rx = {cardserial: cardserial, pickedup: pickedUp, appt: apptDate}
        fetchRxUpdate(rxToEdit.id, rx, localStorage.token)
            .then(response => {
                if(!response.message) {
                    updatePrescription(response)
                    clearEdit()
                }
            })
    }
    
    const unloadedRxs = prescriptions.filter(rx => rx.loaded === false)
    const rxArr = unloadedRxs.map(rx => {
        return <Prescription key={rx.id} {...rx} edit={handleEdit}/>
    })

    return (
        <>
        <section className='button-break'>
            <Link to='/' className='small-button'>Back</Link>
        </section>
        <section className='display-container filled' style={editRx ? {height: 30+'vh'} : {height: 70+'vh'}}>
            <header className='filled-header'>
                <h2>Filled Prescriptions</h2>
                <div>
                    {/* <h3>Total: {filledNum}</h3> */}
                    {/* <h3>Distributed: ${filledAmt}</h3> */}
                </div>
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
                        <label>Notes: <br/><br/><span>{rxToEdit.notes ? rxToEdit.notes : '-'}</span></label>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className='rx-detail'>
                            <label>
                                Card Serial Number:
                                <input type='text' value={cardserial} onChange={(e) => setCardserial(e.target.value)}/>
                            </label>
                            <label>
                                Appointment:  
                                    <DateTimePicker
                                        onChange={setApptDate}
                                        value={apptDate}
                                        disableClock={true}
                                    />
                            </label>
                            <label>
                                Picked Up:
                                <select value={pickedUp} onChange={(e) => setPickedUp(e.target.value)}>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                            </label>
                        </div>
                        <input type='submit' value='Save' className='small-button'/>
                    </form>
                </section>
        :
            null
        }
        </>
    )
}

export default connect(mapState, mapDispatch)(PrescriptionsList)
