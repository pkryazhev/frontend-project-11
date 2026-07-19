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

const renderFeeds = (state) => {
  const feeds = snapshot(state).feeds
  const feedsContainer = document.querySelector('div.feeds-container')
  const feedContainers = feeds.map((feed) => {
    const feedContainer = document.createElement('div')
    feedContainer.id = feed.id
    feedContainer.classList.add('feed-container')
    const feedTitle = document.createElement('p')
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
  const postsContainer = document.querySelector('div.posts-container')
  const postContainers = posts.map((post) => {
    const postContainer = document.createElement('div')
    postContainer.id = post.id
    postContainer.setAttribute('feedId', post.feedId)
    postContainer.classList.add('item-container')
    const itemName = document.createElement('p')
    const itemLink = document.createElement('p')
    itemName.textContent = post.title
    itemLink.textContent = post.link
    postContainer.append(itemName)
    postContainer.append(itemLink)
    return postContainer
  })
  postsContainer.replaceChildren(...postContainers)
}

export const initView = (state) => {
  const button = document.querySelector('button')
  const label = document.querySelector('label')
  button.textContent = i18next.t('button_text')
  label.textContent = i18next.t('input_label')
  subscribe(state, () => {
    render(state)
    renderFeeds(state)
    renderPosts(state)
  })
}
