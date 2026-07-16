import { snapshot, subscribe } from 'valtio/vanilla'

const input = document.querySelector('input')

const render = (state) => {
    const snapshotState = snapshot(state)
    console.log(snapshotState.errorMessage)
    if (snapshotState.isValid) {
            input.value = ""
            input.focus()
    }
}

export const initView = (state) => {
    subscribe(state, () => {
        render(state)
    })
}