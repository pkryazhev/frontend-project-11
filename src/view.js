import { snapshot, subscribe } from 'valtio/vanilla'
import i18next from 'i18next'

const input = document.querySelector('input')

const render = (state) => {
  const snapshotState = snapshot(state)
  console.log(snapshotState.errorMessage)
  if (snapshotState.isValid) {
    input.value = ''
    input.focus()
  }
}

export const initView = (state) => {
  const button = document.querySelector('button')
  const label = document.querySelector('label')
  button.textContent = i18next.t('button_text')
  label.textContent = i18next.t('input_label')
  subscribe(state, () => {
    render(state)
  })
}
