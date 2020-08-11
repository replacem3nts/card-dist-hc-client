import React, { useState } from 'react'
import { fetchLogin } from '../services/Utils'
import { connect } from 'react-redux'
import { setCbo } from '../features/cbo/cboSlice'
import { setPrescribers } from '../features/prescribers/PrescribersSlice'
import { useHistory } from 'react-router-dom'
import { setPrescriptions } from '../features/prescriptions/PrescriptionsSlice'

const mapDispatch = { setCbo, setPrescribers, setPrescriptions }


const LoginForm = ({ setCbo, setPrescribers, setPrescriptions }) => {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let history = useHistory()


    let handleSubmit = (e) => {
        e.preventDefault()
        let userInfo = {username, password}
        fetchLogin(userInfo)
            .then(response => {
                let {id, name} = response.cbo
                let {token} = response
                setCbo({id, name, token})
                setPrescribers(response.cbo)
                setPrescriptions(response.cbo)
                history.push('/')
            })
    }

    return (
        <form onSubmit={handleSubmit} >
            <label>
                Username:<br/>
                <input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)}/><br/><br/>
            </label>
            <label>
                Password:<br/>
                <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/><br/><br/>
            </label>
            <input type='submit' value='Submit'/><br/>
        </form>
    )
}

export default connect(null, mapDispatch)(LoginForm)