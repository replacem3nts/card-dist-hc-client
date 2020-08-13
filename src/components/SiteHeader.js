import React, { useState } from 'react';
import logo from '../logo.svg'
import Switch from "react-switch";
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeHc } from '../features/hc/HcSlice';

let mapState = (state) => {
    return {
        hcName: state.hc.name
    }
}

let mapDispatch = { removeHc }

const SiteHeader = ({ hcName, removeHc }) => {
    const [eng, setEng] = useState(false)
    const history = useHistory()
    const { t } = useTranslation()

    const changeLanguage = lng => {
        i18n.changeLanguage(lng)
    }

    const handleChange = () => {
        setEng(eng => !eng)
        eng ? changeLanguage('en') : changeLanguage('sp')
    }

    const handleLogout = (e) => {
        e.preventDefault()
        removeHc()
        history.push('/')
    }

    return (
        <div>
            <img src={logo} className="App-logo" alt="logo" onClick={() => {history.push('/')}}/>
            {localStorage.token ?
            <h3>{hcName}</h3>
            :
            <h3>{t('Welcome!')}</h3>
            }
            <div className='right-header'>
                <Switch
                    checked={eng}
                    onChange={handleChange}
                    className='react-switch'
                    onColor="#ffffff"
                    onHandleColor="#28377E"
                    offColor="#ffffff"
                    offHandleColor="#28377E"
                    height={30}
                    width={60}
                    uncheckedIcon={
                        <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            fontSize: 15,
                            fontWeight: 700,
                            color: "#28377E",
                            paddingRight: 2
                        }}
                        >
                        EN
                        </div>
                    }
                    checkedIcon={
                        <div
                        style={{
                            display: "flex",
                            fontWeight: 700,
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            fontSize: 15,
                            color: "#28377E",
                            paddingRight: 2
                        }}
                        >
                        SP
                        </div>
                    }
                />
                {localStorage.token ? 
                <button className='small-button' onClick={(e) => handleLogout(e)} >Logout</button>
                :
                null
                }
            </div>
        </div>
    )
}

export default connect(mapState, mapDispatch)(SiteHeader)