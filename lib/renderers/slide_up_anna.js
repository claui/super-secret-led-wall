import anime from 'animejs'

const FADE_IN_DURATION_MS_MIN =  5000
const FADE_IN_DURATION_MS_MAX = 20000
const INITIAL_DELAY_MS_MAX = 0
const OPACITY_MIN = 0.3
const X_MIN = 0
const X_MAX = 75
const Y_MIN = 0
const Y_MAX = 90

export default class SlideUpAnnaRenderer {
  constructor ({ id: phraseId, text: phraseText }) {
    this.phraseId = phraseId
    this.phraseText = phraseText

    if (module.hot) {
      if (module.renderersByPhraseId.has(phraseId)) {
        throw(`Phrase #${phraseId} already exists; destroy it first`)
      }

      module.renderersByPhraseId.set(phraseId, this)
    }
  }

  setup () {
    let xPosition = anime.random(X_MIN, X_MAX)
    let yPositionStart = anime.random(Y_MIN, Y_MAX)
    let yPositionEnd = anime.random(Y_MIN, Y_MAX)
    let initialDelay = anime.random(0, INITIAL_DELAY_MS_MAX)
    this.fadeInDuration =
      anime.random(FADE_IN_DURATION_MS_MIN, FADE_IN_DURATION_MS_MAX)
    this.opacity =
      Math.random(1 - OPACITY_MIN) + OPACITY_MIN

    let phraseDiv = window.document.createElement('div')
    phraseDiv.setAttribute('id', `phrase_${this.phraseId}`)
    phraseDiv.style = `
      mix-blend-mode: difference;
      position: absolute;
      transform:
        translateX(${xPosition}vw) translateY(${yPositionStart}vh);`
    let phraseSpan = window.document.createElement('span')
    phraseSpan.textContent = this.phraseText
    phraseDiv.appendChild(phraseSpan)
    window.document.body.appendChild(phraseDiv)

    anime
      .timeline({
        targets: `#phrase_${this.phraseId}`
      })
      .add({
        offset: 0,
        duration: this.fadeInDuration,
        easing: 'easeOutSine',
        opacity: [0, this.opacity],
        translateX: `${xPosition}vw`,
        translateY: `${yPositionEnd}vh`,
      })
  }

  destroy () {
    anime.remove(`#phrase_${this.phraseId}`)
    let phraseDiv =
      window.document.getElementById(`phrase_${this.phraseId}`)
    window.document.body.removeChild(phraseDiv)
    console.log(`Phrase #${this.phraseId} destroyed`)
  }

  get name () { return this.constructor.name }
}

if (module.hot) {
  module.renderersByPhraseId = new Map()

  module.hot.dispose(() => {
    module.renderersByPhraseId.forEach((renderer) => {
      renderer.destroy()
    })
    console.log('All phrases destroyed')
  })
}
