import { snapshot, subscribe } from 'valtio/vanilla'
import i18next from 'i18next'

const input = document.querySelector('input')
const rssContainer = document.querySelector('div#rssDataContainer')

const render = (state) => {
  const snapshotState = snapshot(state)
  console.log(snapshotState.errorMessage)
  if (snapshotState.isValid) {
    input.value = ''
    input.focus()
  }
}

const renderRss = (state) => {
  const snapshotState = snapshot(state).rssList
  const feedsContainer = document.createElement('div')
  feedsContainer.classList.add('feeds-container')
  const itemsContainer = document.createElement('div')
  itemsContainer.classList.add('items-container')
  snapshotState.forEach((rss) => {
    const data = rss.data
    console.log(data)
    const feedContainer = document.createElement('div')
    feedContainer.id = data.id
    feedContainer.classList.add('feed-container')
    const feedTitle = document.createElement('p')
    feedTitle.textContent = data.title
    const feedDescription = document.createElement('p')
    feedDescription.textContent = data.description
    feedContainer.append(feedTitle)
    feedContainer.append(feedDescription)
    feedsContainer.append(feedContainer)
    data.itemsList.forEach((item) => {
      const itemContainer = document.createElement('div')
      itemContainer.id = item.item_id
      itemContainer.setAttribute('feed_id', data.id)
      itemContainer.classList.add('item-container')
      const itemName = document.createElement('p')
      const itemLink = document.createElement('p')
      itemName.textContent = item.title
      itemLink.textContent = item.link
      itemContainer.append(itemName)
      itemContainer.append(itemLink)
      itemsContainer.append(itemContainer)
    })
  })
  rssContainer.replaceChildren(feedsContainer, itemsContainer)
}

export const initView = (state) => {
  const button = document.querySelector('button')
  const label = document.querySelector('label')
  button.textContent = i18next.t('button_text')
  label.textContent = i18next.t('input_label')
  subscribe(state, () => {
    render(state)
    renderRss(state)
  })
}
