import { uniqueId } from 'es-toolkit/compat'

export const normalizeData = (parsedData, id) => {
  let feedId
  if (id) {
    feedId = id
  }
  else {
    feedId = uniqueId()
  }
  const feed = {
    title: parsedData.feed.title,
    description: parsedData.feed.description,
    id: feedId,
  }
  const posts = []
  // todo: поменять на map
  parsedData.itemsList.forEach((item) => {
    posts.push({
      title: item.title,
      link: item.link,
      id: uniqueId(),
      feedId: feedId,
    })
  })
  return {
    feed,
    posts,
  }
}
