import anime from 'animejs'

const DURATION_MS_MIN = 6000
const DURATION_MS_MAX = 20000
const FADE_IN_DURATION_MS = 4000
const FADE_OUT_DURATION_MS = 4000
const INITIAL_DELAY_MS_MAX = 3000
const OPACITY_MIN = 0.5
const X_MIN = 50
const X_MAX = 1000
const Y_MIN = 0
const Y_MAX = 1000

export default class ApparitionRenderer {
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
    let initialDelay = anime.random(0, INITIAL_DELAY_MS_MAX)
    this.grossDuration =
      anime.random(DURATION_MS_MIN, DURATION_MS_MAX)
        + FADE_IN_DURATION_MS + FADE_OUT_DURATION_MS
    this.opacity =
      Math.random(1 - OPACITY_MIN) + OPACITY_MIN

    let phraseDiv = window.document.createElement('div')
    phraseDiv.setAttribute('id', `phrase_${this.phraseId}`)
    phraseDiv.style = `
      color: mediumvioletred;
      position: absolute;
      opacity: 0;
    `
    let phraseSpan = window.document.createElement('span')
    phraseSpan.textContent = this.phraseText
    phraseDiv.appendChild(phraseSpan)
    window.document.body.appendChild(phraseDiv)

    window.setTimeout(() => this._renderApparition(), initialDelay)
  }

  destroy () {
    anime.remove(`#phrase_${this.phraseId}`)
    let phraseDiv =
      window.document.getElementById(`phrase_${this.phraseId}`)
    window.document.body.removeChild(phraseDiv)
    console.log(`Phrase #${this.phraseId} destroyed`)
  }

  get name () { return this.constructor.name }

  _renderApparition () {
    let xPositionStart = anime.random(X_MIN, X_MAX)
    let xPositionEnd = anime.random(X_MIN, X_MAX)
    let yPosition = anime.random(Y_MIN, Y_MAX)
    let phraseDiv =
      window.document.getElementById(`phrase_${this.phraseId}`)
	
	
	var colors = ['#FF324A', '#31FFA6', '#206EFF', '#FFFF99']
	let randomColor = colors[anime.random(0, colors.length - 1)]
    phraseDiv.style = `
      colors: ${randomColor};
      mix-blend-mode: hard-light;
      position: absolute;
      transform:
        translateX(${xPositionStart}px)
        translateY(${yPosition}px);
    `

    anime
      .timeline({
        targets: `#phrase_${this.phraseId}`,
        complete: (() => this._renderApparition()),
      })
      .add({
        offset: 0,
        duration: FADE_IN_DURATION_MS,
        easing: 'easeInSine',
        opacity: [0, this.opacity],
        translateX: xPositionStart
          + (FADE_IN_DURATION_MS / this.grossDuration)
            * (xPositionEnd - xPositionStart),
        translateY: yPosition,
        scale: 1
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
        easing: 'easeOutSine',
        opacity: 0,
        translateX: xPositionEnd,
        translateY: yPosition,
        scale: 1
      })
    }
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
