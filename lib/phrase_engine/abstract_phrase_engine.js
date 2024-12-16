import { RandomRendererChooser, SoloRendererChooser }
  from './chooser.js'

const DEFAULT_CHOOSE_PHRASE_EVERY_MS = 5000
const DEFAULT_MAX_ACTIVE_PHRASES = 8

/**
 * A phrase engine is responsible for the following tasks:
 *
 * - keeping an array of phrases,
 * - watching the maximum allowed number of active phrases,
 * - picking a random eligible phrase,
 * - picking a renderer class for the phrase, and
 * - spawning a renderer object for the phrase.
 *
 * A phrase is eligible for being randomly picked unless it
 * has expired or is already being displayed.
 */
export default class AbstractPhraseEngine {
  constructor (config) {
    this.choosePhraseEveryMs = config.choosePhraseEveryMs
      || DEFAULT_CHOOSE_PHRASE_EVERY_MS
    this.maxActivePhrases = config.maxActivePhrases
      || DEFAULT_MAX_ACTIVE_PHRASES
    this.rendererContainer = window.document.getElementById('active-phrases')

    if (config.renderers === undefined) {
      throw('Array of renderers missing; pass it as `renderers`')
    }

    let soloRenderer = config.renderers.find(renderer => renderer.solo)

    this.chooser = (soloRenderer === undefined)
      ? new RandomRendererChooser(config.renderers)
      : new SoloRendererChooser(soloRenderer)
  }

  onChoosePhraseTimer () {
    if (this.phrases.length === 0) {
      console.warn('No phrases loaded; skipping timer event')
      return
    }
    if (this.rendererContainer.childElementCount >= this.maxActivePhrases) {
      console.log(
        `Not spawning new phrase because ${this.rendererContainer.childElementCount}`
          + ' phrases are already active')
      return
    }

    let phrase = this.randomPhrase()

    if (window.document.getElementById(`phrase_${phrase.id}`)) {
      console.log(`Not spawning phrase '${phrase.text}' because it is already active`)
      return
    }
    console.log(`Spawning phrase: ${phrase.text}`)

    this.chooser.next()
      .plugin
      .then(plugin => {
        let renderer = new plugin.default(phrase, this.rendererContainer)
        renderer.setup()
      })
  }

  randomPhrase () {
    let userPhrasesNotInUse = this.phrases
      .filter(phrase => {
        return phrase.expires &&
          phrase.expires > 0 &&
          !window.document.getElementById(`phrase_${phrase.id}`)
      })

    let eligiblePhrases = userPhrasesNotInUse.length > 0 ?
      userPhrasesNotInUse : this.phrases

    let randomIndex =
      Math.floor(eligiblePhrases.length * Math.random())
    return eligiblePhrases[randomIndex]
  }
}
