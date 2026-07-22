import { snapshot, subscribe } from 'valtio/vanilla'
import * as bootstrap from 'bootstrap'
import i18next from 'i18next'

const input = document.querySelector('input')
const modalTitle = document.querySelector('.modal-title')
const modalBody = document.querySelector('.modal-body')
const readMoreLink = document.querySelector('div.modal-footer > a.btn-primary')
const closeButton = document.querySelector('div.modal-footer > button.btn-secondary')
const validationMessage = document.querySelector('p#validation-message')

const render = (state) => {
  const snapshotState = snapshot(state)
  validationMessage.textContent = snapshotState.errorMessage
  if (snapshotState.isValid) {
    validationMessage.className = 'text-success'
    input.value = ''
    input.focus()
  }
  else {
    validationMessage.className = 'text-danger'
  }
}

const renderFeeds = (state) => {
  const feeds = snapshot(state).feeds
  const feedsCard = document.querySelector('div#feeds-container')
  const feedsContainer = document.querySelector('div#feeds-container > div.list-group')
  const feedsHeader = document.querySelector('div#feeds-container > div.card-body > h2')
  if (feeds.length > 0) {
    feedsCard.classList.remove('d-none')
    feedsHeader.textContent = i18next.t('feeds_header')
  }
  const feedContainers = feeds.map((feed) => {
    const feedContainer = document.createElement('div')
    feedContainer.classList.add('list-group-item', 'feed-container')
    feedContainer.id = feed.id
    const feedTitle = document.createElement('h3')
    feedTitle.textContent = feed.title
    const feedDescription = document.createElement('p')
    feedDescription.textContent = feed.description
    feedContainer.append(feedTitle)
    feedContainer.append(feedDescription)
    return feedContainer
  })
  feedsContainer.replaceChildren(...feedContainers)
}

const renderPosts = (state) => {
  const posts = snapshot(state).posts
  const postsCard = document.querySelector('div#posts-container')
  const postsContainer = document.querySelector('div#posts-container > div.list-group')
  const postsHeader = document.querySelector('div#posts-container > div.card-body > h2')
  if (posts.length > 0) {
    postsCard.classList.remove('d-none')
    postsHeader.textContent = i18next.t('posts_header')
  }
  const postContainers = posts.map((post) => {
    const postContainer = document.createElement('div')
    postContainer.classList.add('list-group-item')
    postContainer.dataset.postId = post.id
    const flexPostContainer = document.createElement('div')
    flexPostContainer.classList.add('d-flex', 'justify-content-between', 'align-items-start')
    const linkElement = document.createElement('a')
    linkElement.classList.add(post.isRead ? 'fw-normal' : 'fw-bold')
    linkElement.href = post.link
    linkElement.dataset.postId = post.id
    linkElement.textContent = post.title
    const button = document.createElement('button')
    button.classList.add('btn', 'btn-outline-secondary')
    button.dataset.postId = post.id
    button.textContent = 'Просмотр'
    flexPostContainer.append(linkElement)
    flexPostContainer.append(button)
    postContainer.append(flexPostContainer)
    return postContainer
  })
  postsContainer.replaceChildren(...postContainers)
}

const renderModal = (state, modal) => {
  const snapshotState = snapshot(state)
  const modalPostId = snapshotState.modalPostId
  if (modalPostId) {
    const clickedPost = snapshotState.posts.find(post => post.id === modalPostId)
    const description = document.querySelector('.modal-body p')
    description.textContent = clickedPost.description
    modalBody.replaceChildren(description)
    modalTitle.textContent = clickedPost.title
    readMoreLink.href = clickedPost.link
    readMoreLink.textContent = i18next.t('modal_submit_button_text')
    closeButton.textContent = i18next.t('modal_close_button_text')
    modal.show()
    state.modalPostId = null
  }
}

export const initView = (state) => {
  const button = document.querySelector('button')
  const label = document.querySelector('form label')
  const modal = new bootstrap.Modal(document.getElementById('postModal'))
  const input = document.querySelector('input')
  input.placeholder = i18next.t('input_label')
  const formHeader = document.querySelector('form h1')
  formHeader.textContent = i18next.t('form_header')
  const formSubHeader = document.querySelector('form h5')
  formSubHeader.textContent = i18next.t('form_subheader')
  button.textContent = i18next.t('button_text')
  label.textContent = i18next.t('input_label')
  subscribe(state, () => {
    render(state)
    renderFeeds(state)
    renderPosts(state)
    renderModal(state, modal)
  })
}
