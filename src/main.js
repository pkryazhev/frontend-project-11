import './styles.css'
import { string, setLocale } from 'yup'
import { proxy } from 'valtio/vanilla'
import { initView } from './view'
import { initI18Next } from './texts'
import i18next from 'i18next'

const run = () => {
  const form = document.querySelector('form')
  const input = document.querySelector('input')
  const state = proxy({
    isValid: true,
    errorMessage: 'OK',
  })
  initI18Next()
    .then(() => {
      setLocale({
        mixed: {
          default: i18next.t('default_error'),
          required: i18next.t('required_error'),
        },
        string: {
          url: i18next.t('url_error'),
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
            state.errorMessage = i18next.t('ok_message')
          },
          )
          .catch((err) => {
            state.isValid = false
            console.log(err.errors[0])
            state.errorMessage = err.errors[0]
          })
      })
    })
    .catch((error) => {
      console.error(error)
    })
}

run()
