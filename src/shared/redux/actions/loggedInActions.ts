const performLogin = () => {
    return {
        type: 'LOGIN'
    }
}

const performLogout = () => {
    return {
        type: 'LOGOUT'
    }
}

export { performLogin, performLogout }