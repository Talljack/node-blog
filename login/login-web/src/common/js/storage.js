import storage from 'good-storage'

const TOKEN = 'token'

export function getToken () {
    return storage.get(TOKEN)
}

export function setToken (token) {
    storage.set(TOKEN, token)
}

export function clearToken () {
    storage.remove(TOKEN)
    return []
}
