import './styles.css'
import { string, setLocale } from 'yup'
import { proxy } from 'valtio/vanilla'
import { initView } from './view'
import { initI18Next } from './texts'
import i18next from 'i18next'
import axios from 'axios'
import { parseXML } from './parser'
import { normalizeData } from './normalizer'
import { startUpdates } from './updater'
import { addErrorToState } from './error-validator'

const run = () => {
  const form = document.querySelector('form')
  const input = document.querySelector('input')
  const state = proxy({
    isValid: true,
    updatesStarted: false,
    modalPostId: null,
    errorMessage: 'OK',
    feeds: [],
    posts: [],
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
        const value = input.value.trim()
        schema.validate(value)
          .then(() => {
            if (state.feeds.some(feed => feed.url === value)) {
              throw new Error('rss_duplicate_error')
            }
          })
          .then(() => {
            const rssUrl = encodeURIComponent(value)
            return axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${rssUrl}`)
          })
          .then((response) => {
            return parseXML(response.data.contents)
          },
          )
          .then((rssData) => {
            const normalizedData = normalizeData(rssData)
            state.feeds.push({ url: value, ...normalizedData.feed })
            state.posts.push(...normalizedData.posts)
            state.isValid = true
            state.errorMessage = i18next.t('ok_message')
          })
          .then(() => {
            startUpdates(state)
          })
          .catch((err) => {
            addErrorToState(err, state)
          })
      })
      const postsContainer = document.querySelector('div#posts-container')
      postsContainer.addEventListener('click', (event) => {
        if (event.target.hasAttribute('data-post-id')) {
          const id = event.target.dataset.postId
          const clickedPost = state.posts.find(post => post.id === id)
          clickedPost.isRead = true
          if (event.target.tagName === 'BUTTON') {
            state.modalPostId = clickedPost.id
          }
        }
      })
    })
    .catch((err) => {
      addErrorToState(err, state)
    })
}

run()
