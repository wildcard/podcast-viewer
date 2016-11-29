import itunesIndex from '../tools/itunes-index.json'
import lunr from 'lunr'

import itunesCache from '../tools/itunes-cache.json'
export const podcastsNames = Object.keys(itunesCache).map(k => itunesCache[k].name )

export const index = lunr.Index.load(itunesIndex)

export const getResults = (indexResults) => {
  return indexResults.map(({ ref, score }) => {
    return Object.assign({}, {
      id: ref,
      name: itunesCache[ref].name,
      ...itunesCache[ref].value
    }, { score });
  })
}
