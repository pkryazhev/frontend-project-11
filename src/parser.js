import { uniqueId } from 'es-toolkit/compat'

export const parseXML = (xmlString) => {
  const parser = new DOMParser()
  const data = parser.parseFromString(xmlString, 'application/xml')
  const result = {}
  try {
    result.title = data.querySelector('channel > title').textContent
    result.description = data.querySelector('channel > description').textContent
    result.id = uniqueId('feed_')
    const items = data.querySelectorAll('item')
    const itemsList = []
    items.forEach((item) => {
      const title = item.querySelector('title').textContent
      const link = item.querySelector('link').textContent
      itemsList.push({ item_id: uniqueId('item_'), title, link })
    })
    result.itemsList = itemsList
  }
  catch {
    throw new Error('xml_parsing_error')
  }
  return result
}
