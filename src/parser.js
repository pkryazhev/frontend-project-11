export const parseXML = (xmlString) => {
  const parser = new DOMParser()
  const data = parser.parseFromString(xmlString, 'application/xml')
  const result = {}
  const feed = {}
  try {
    feed.title = data.querySelector('channel > title').textContent
    feed.description = data.querySelector('channel > description').textContent
    const items = data.querySelectorAll('item')
    const itemsList = []
    items.forEach((item) => {
      const title = item.querySelector('title').textContent
      const link = item.querySelector('link').textContent
      const description = item.querySelector('description').textContent
      itemsList.push({ title, link, description })
    })
    result.itemsList = itemsList
  }
  catch {
    throw new Error('xml_parsing_error')
  }
  result.feed = feed
  return result
}
