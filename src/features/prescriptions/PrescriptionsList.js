import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Prescription } from './Prescription'

let mapState = (state) => {
    return {prescriptions: state.prescriptions}
}

const PrescriptionsList = ({ prescriptions }) => {
    const [editRx, setEditRx] = useState(false)
    const [rxToEdit, setRxToEdit] = useState({})

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
    
    const rxArr = prescriptions.map(rx => {
        return <Prescription key={rx.id} {...rx} edit={handleEdit}/>
    })

    return (
        <>
        <section className='display-container filled'>
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
                    <div className='rx-detail'>
                        <form>
                            <label>
                                Card Serial Number:
                                {/* <input type='text' value={rxToEdit.cardserial} onChange={(e) => setRxToEdit(rxToEdit => {...rxToEdit, cardserial: e.target.value})}/> */}
                            </label>
                        </form>
                    </div>
                </section>
        :
            null
        }
        </>
    )
}

export default connect(mapState)(PrescriptionsList)
