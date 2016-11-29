const searchitunes = require ('searchitunes');
var jsonfile = require('jsonfile')

 const itunesArts = require('./itunes.json')

function createPodcastMap(itunesArts) {
  let podcastsMap = {}
  itunesArts.forEach(({ podcastName: name, podcastLink: link }) => {
    var match = link.match(/(?:\/id)(\d+)/i);
    const id = match[1];
    podcastsMap[id] = { name };
  });

  return podcastsMap;
}

function lookupPodcastData(podcastsMap, outputMap) {
  let counter = 0;
  let podcastsIds = Object.keys(podcastsMap);

  return podcastsIds.map((id) => {
    return new Promise(function (fulfill, reject) {
      searchitunes({ id, country: 'IL', }, (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }
        fulfill({ id, data});
      });
    })
  });
}

function validatePodcastMap(podcastsMap) {
  return Object.keys(podcastsMap).every((id) => {
    return id == podcastsMap[id].value.trackId;
  });
}

(function main() {
  let podcastsMap = createPodcastMap(itunesArts)

  Promise.all(lookupPodcastData(podcastsMap)).then(values => {
    let enhancedPodcastsMap = values.reduce((memo, { id, data }) => {
      memo[id] = Object.assign({}, podcastsMap[id], { value: data });
      return memo
    }, {});

    console.log('Finished lookup on itunes');

    if (validatePodcastMap(enhancedPodcastsMap)) {
      console.log('data is valid');

      var file = './tools/itunes-cache.json'
      jsonfile.writeFile(file, enhancedPodcastsMap, { flag: 'w' }, function (err) {
        console.log(err)
      })
    } else {
      console.log('data is not valid');
    }
  });
})()
