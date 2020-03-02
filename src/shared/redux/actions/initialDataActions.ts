const setFullState = (payload: any) => {
    return {
        type: 'FULL',
        payload: payload
    }
}

const setLC = (lcId: string) => {
    return {
        type: 'LC',
        payload: {
            lcId: lcId
        }
    }
}

export { setFullState, setLC };