const async = require('async')

const wikidataToOsm = require('./wikidataToOsm.json')

module.exports = {
  init (callback) {
    async.eachOf(wikidataToOsm, (d, property, done) => {
      if (d.file) {
        fetch('data/' + d.file)
          .then(res => res.json())
          .then(json => {
            d.mapping = json
            done()
          })
      } else {
        done()
      }
    },
    callback)
  },

  getMissingTags (ob) {
    let missTags = []

    if (ob.data.wikidata && ob.data.wikidata.length) {
      let wikidata = ob.data.wikidata[0]

      for (let k in wikidataToOsm) {
        let d = wikidataToOsm[k]

        if (wikidata.claims[k]) {
          missTags.push(d.tag += "=" + wikidata.claims[k].map(v => {
            return v.mainsnak.datavalue.value.id
          }).join(';'))
        }
      }
    }

    return missTags
  }
}