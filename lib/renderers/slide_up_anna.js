import anime from 'animejs'

const DURATION_MS_MIN = 0
const DURATION_MS_MAX = 20000
const FADE_IN_DURATION_MS = 20000
const FADE_OUT_DURATION_MS = 0
const INITIAL_DELAY_MS_MAX = 0
const OPACITY_MIN = 0.3
const X_MIN = 0
const X_MAX = 1000
const Y_MIN = 200
const Y_MAX = 1000

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
    let baseX0 = anime.random(X_MIN, X_MAX)
    let baseY0 = anime.random(Y_MIN, Y_MAX)
    let baseY1 = anime.random(baseY0, Y_MAX)
    let baseDuration = anime.random(DURATION_MS_MIN, DURATION_MS_MAX)
    let initialDelay = anime.random(0, INITIAL_DELAY_MS_MAX)
    this.grossDuration =
      anime.random(DURATION_MS_MIN, DURATION_MS_MAX)
        + FADE_IN_DURATION_MS + FADE_OUT_DURATION_MS
    this.opacity =
      Math.random(1 - OPACITY_MIN) + OPACITY_MIN

    let phraseDiv = window.document.createElement('div')
    phraseDiv.setAttribute('id', `phrase_${this.phraseId}`)
    phraseDiv.style = `
    mix-blend-mode: difference;
    transform:
      translateX(${baseX0}px) translateY(${baseY0}px);`
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
        duration: FADE_IN_DURATION_MS,
        opacity: [0, this.opacity],
        translateX: baseX0,
        translateY: [
          {
            value: 0,
            elasticity: 0
          },
        ],
      })
      .add({
        offset: 0,
        duration: FADE_IN_DURATION_MS,
        easing: 'linear',
        opacity: [0, this.opacity],
        translateX: xPositionStart
          + (FADE_IN_DURATION_MS / this.grossDuration)
            * (xPositionEnd - xPositionStart),
        translateY: yPosition,
        scale: [0.5, 1]
      })
      .add({
        offset: FADE_IN_DURATION_MS,
        duration: this.grossDuration
          - FADE_IN_DURATION_MS - FADE_OUT_DURATION_MS,
        easing: 'linear',
        opacity: this.opacity,
        translateX: xPositionStart
          + (1 - FADE_OUT_DURATION_MS / this.grossDuration)
            * (xPositionEnd - xPositionStart),
        translateY: yPosition,
        scale: 1
      })
       .add({
        offset: this.grossDuration - FADE_OUT_DURATION_MS,
        duration: FADE_OUT_DURATION_MS,
        easing: 'linear',
        opacity: 0,
        translateX: xPositionEnd,
        translateY: yPosition,
        scale: [1, 0.5]
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
