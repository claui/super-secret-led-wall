import { RandomRendererChooser, SoloRendererChooser }
  from './phrase_engine/chooser.js'

import renderers from './renderers.js'

const DEFAULT_CHOOSE_PHRASE_EVERY_MS = 5000
const DEFAULT_QUERY_PHRASE_EVERY_MS = 10000

if (module.hot) {
  module.hot.dispose(() => window.location.reload(true))
}

export default class PhraseEngine {
  constructor (config) {
    this.choosePhraseEveryMs = config.choosePhraseEveryMs
      || DEFAULT_CHOOSE_PHRASE_EVERY_MS
    this.queryPhrasesEveryMs = config.queryPhrasesEveryMs
      || DEFAULT_QUERY_PHRASE_EVERY_MS
    if (config.sourceUrl === undefined) {
      throw('Source URL missing; pass it as `sourceUrl`')
    }
    this.sourceUrl = config.sourceUrl
  }

  run () {
    console.log('Initializing phrase animation')

    let soloRenderer = renderers.find(renderer => renderer.solo)

    this.chooser = (soloRenderer === undefined)
      ? new RandomRendererChooser(renderers)
      : new SoloRendererChooser(soloRenderer)

    console.log('Querying backend for new phrases')
    fetch(this.sourceUrl)
      .then(response => response.json())
      .then(phrases => this.onPhrasesReceived(phrases))

    setInterval(() => {
      if (this.phrases === undefined || this.phrases.length === 0) {
        return
      }

      let phrase = this.randomPhrase()

      if (window.document.getElementById(`phrase_${phrase.id}`)) {
        console.log(`Ignoring phrase: ${phrase.text}`)
        return
      } else {
        console.log(`Spawning phrase: ${phrase.text}`)
      }

      this.chooser.next()
        .plugin
        .then(plugin => {
          let renderer = new plugin.default(phrase)
          renderer.setup()
        })
    }, this.choosePhraseEveryMs)

    console.log('Done initializing phrase animation')
  }

  onPhrasesReceived (phrases) {
    this.phrases = phrases
    console.log(`Received ${phrases.length} phrase(s) from backend`)
  }

  randomPhrase () {
    let randomIndex = Math.floor(this.phrases.length * Math.random())
    return this.phrases[randomIndex]
  }
}
