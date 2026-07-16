import './styles.css'
import { string, setLocale } from 'yup'
import { proxy } from 'valtio/vanilla'
import { initView } from './view'

const run = () => {
  const form = document.querySelector('form')
  const input = document.querySelector('input')
  const state = proxy({
    isValid: true,
    errorMessage: 'OK',
  })

  setLocale({
    mixed: {
      default: 'Неизвестная ошибка',
      required: 'Не должно быть пустым',
    },
    string: {
      url: 'Ссылка должна быть валидным URL',
    },
  })
  const schema = string().required().url()

  initView(state)

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const value = input.value
    schema.validate(value.trim())
      .then(() => {
        state.isValid = true
        state.errorMessage = 'OK'
      },
      )
      .catch((err) => {
        state.isValid = false
        state.errorMessage = err.errors[0]
      })
  })
}

run()
