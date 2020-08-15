const BACKEND_HCS = 'http://localhost:4001/api/v1/hcs'
const BACKEND_RX = 'http://localhost:4001/api/v1/rxs'

export const fetchLogin = (userInfo) => {
    return fetch(BACKEND_HCS+'/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userInfo)})
        .then(r => r.json())
}

export const fetchPersistLogin = (token) => {
    return fetch(BACKEND_HCS+'/persist_login', {
        headers: {'Authorization': `Bearer ${token}`}
    })
        .then(r => r.json())
}

export const fetchRxUpdate = (rxId, rx, token) => {
    return fetch(BACKEND_RX+'/hcs', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({rxId, rx})
    })
        .then(r => r.json())
}