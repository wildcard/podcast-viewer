const lunr = require('lunr');
const itunesCache = require('./itunes-cache.json');
var jsonfile = require('jsonfile')

const indexFields = [
  'artistName',
  'collectionCensoredName',
  'trackCensoredName'
]

var idx = lunr(function () {
  this.field('trackName', { boost: 10 })
  this.field('collectionName', { boost: 5 })
  indexFields.forEach(f => {
    this.field(f)
  })
})

Object.keys(itunesCache).forEach(id => {
  idx.add(Object.assign({ id }, itunesCache[id].value))
})

const indexJson = idx.toJSON()

var file = './tools/itunes-index.json';
jsonfile.writeFile(file, indexJson, { flag: 'w'}, (err) => {
  console.log(err);
})
