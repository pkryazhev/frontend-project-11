import './styles.css'
import { string, setLocale } from 'yup'
import { proxy } from 'valtio/vanilla'
import { initView } from './view'
import { initI18Next } from './texts'
import i18next from 'i18next'
import axios from 'axios'
import { parseXML } from './parser'
import { validateError } from './error-validator'

const run = () => {
  const form = document.querySelector('form')
  const input = document.querySelector('input')
  const state = proxy({
    isValid: true,
    errorMessage: 'OK',
    rssList: [],
  })
  const addErrorToState = (error) => {
    const errorMessage = validateError(error)
    state.isValid = false
    state.errorMessage = errorMessage
  }
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
        const value = input.value.trim()
        schema.validate(value)
          .then(() => {
            if (state.rssList.some(rss => rss.url === value)) {
              throw new Error('rss_duplicate_error')
            }
          })
          .then(() => {
            const rssUrl = encodeURIComponent(`${value}`)
            return axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${rssUrl}`)
          })
          .then((response) => {
            return parseXML(response.data.contents)
          },
          )
          .then((rssData) => {
            state.rssList.push({ url: value, data: rssData })
            state.isValid = true
            state.errorMessage = i18next.t('ok_message')
          })
          .catch((err) => {
            addErrorToState(err)
          })
      })
    })
    .catch((err) => {
      addErrorToState(err)
    })
}

run()
