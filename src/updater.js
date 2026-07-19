import axios from 'axios'
import { parseXML } from './parser'
import { normalizeData } from './normalizer'
import { addErrorToState } from './error-validator'

export const startUpdates = (state) => {
  if (!state.updatesStarted) {
    state.updatesStarted = true
    checkUpdates(state)
  }
}

const checkFeed = (feed, posts) => {
  const rssUrl = encodeURIComponent(feed.url)
  return axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${rssUrl}`)
    .then((response) => {
      return parseXML(response.data.contents)
    })
    .then((rssData) => {
      return normalizeData(rssData, feed.id)
    })
    .then((normalizedData) => {
      const normalizedPosts = normalizedData.posts
      const filteredPosts = posts.filter(post => post.feedId === feed.id)
      const newPosts = normalizedPosts.filter((post) => {
        return !filteredPosts.some(feedPost => feedPost.link === post.link)
      })
      return newPosts
    })
}

const checkUpdates = (state) => {
  const promises = state.feeds.map((feed) => {
    return checkFeed(feed, state.posts)
  })
  Promise.all(promises)
    .then((newPostsList) => {
      const newPosts = newPostsList.flat()
      state.posts.push(...newPosts)
    })
    .catch((err) => {
      addErrorToState(err, state)
    })
    .finally(() => {
      setTimeout(() => {
        checkUpdates(state)
      }, 5000)
    })
}
