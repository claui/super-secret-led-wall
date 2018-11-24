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

    this.expirationTimerMap = new WeakMap()
    this.phrases = []
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
      .then(phrases => this.onPhrasesReceive(phrases))

    setInterval(
      () => this.onChoosePhraseTimer(),
      this.choosePhraseEveryMs
    )

    console.log('Done initializing phrase animation')
  }

  onChoosePhraseTimer () {
    if (this.phrases.length === 0) {
      console.warn('No phrases loaded; skipping timer event')
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
  }

  onPhrasesDispose (oldPhrases) {
    var numTimers = 0

    oldPhrases
      .filter(oldPhrase => oldPhrase.expires)
      .forEach(oldPhrase => {
        let timer = this.expirationTimerMap.get(oldPhrase)
        if (timer !== undefined) {
          window.clearTimeout(timer)
          numTimers++
        }
      })

    if (numTimers > 0) {
      console.log(
        `Retired ${numTimers} stale expiration timer(s)`)
    }
  }

  onPhrasesReceive (phrases) {
    this.onPhrasesDispose(this.phrases)

    this.phrases = phrases
    console.log(`Received ${phrases.length} phrase(s) from backend`)

    phrases
      .filter(phrase => phrase.expires)
      .forEach(phrase => {
        let timeoutMs = phrase.expires * 1000
        let timer = window.setTimeout(
          () => {
            let index = phrases.indexOf(phrase)
            if (index > -1) {
              phrases.splice(index, 1)
            }
          },
          timeoutMs
        )
        this.expirationTimerMap.set(phrase, timer)
      })
  }

  randomPhrase () {
    let randomIndex = Math.floor(this.phrases.length * Math.random())
    return this.phrases[randomIndex]
  }
}
