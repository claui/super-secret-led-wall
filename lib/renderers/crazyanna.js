import anime from 'animejs'

const DURATION_MS_MIN = 10
const DURATION_MS_MAX = 250
const X_MIN = 0
const X_MAX = 600
const Y_MIN = 0
const Y_MAX = 500

export default class CrazyRenderer {
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
    let baseX1 = anime.random(baseX0, X_MAX)
    let baseY0 = anime.random(Y_MIN, Y_MAX)
    let baseY1 = anime.random(baseY0, Y_MAX)
    let baseDuration = anime.random(DURATION_MS_MIN, DURATION_MS_MAX)

    let phraseDiv = window.document.createElement('div')
    phraseDiv.setAttribute('id', `phrase_${this.phraseId}`)
    phraseDiv.style = `transform:
      translateX(${baseX0}px) translateY(${baseY0}px);`
    let phraseSpan = window.document.createElement('span')
    phraseSpan.textContent = this.phraseText
    phraseDiv.appendChild(phraseSpan)
    window.document.body.appendChild(phraseDiv)

    anime({
      targets: `#phrase_${this.phraseId}`,
      translateX: [
        {
          value: baseX1,
          duration: 10 * baseDuration,
          delay: 5 * baseDuration,
          elasticity: 0
        },
        {
          value: baseX0,
          duration: 10 * baseDuration,
          delay: 5 * baseDuration,
          elasticity: 0
        }
      ],
      translateY: [
        {
          value: baseY1,
          duration: 5 * baseDuration,
          delay: 10 * baseDuration,
          elasticity: 100
        },
        {
          value: baseY0,
          duration: 5 * baseDuration,
          delay: 10 * baseDuration,
          elasticity: 100
        }
      ],
      scaleX: [
        {
          value: 4,
          duration: baseDuration,
          delay: 5 * baseDuration,
          easing: 'easeOutExpo'
        },
        {
          value: 1,
          duration: 9 * baseDuration,
          elasticity: 300
        }
      ],
      scaleY: [
        {
          value: [1.75, 1],
          duration: 500 * baseDuration
        },
        {
          value: 2,
          duration: 100 * baseDuration,
          delay: 10 * baseDuration,
          easing: 'easeOutExpo'
        },
        {
          value: 1,
          duration: 40 * baseDuration
        },
        {
          value: 1.75,
          duration: 10 * baseDuration,
          delay: 10 * baseDuration,
          easing: 'easeOutExpo'
        },
        {
          value: 1,
          duration: 40 * baseDuration
        }
      ],
      loop: true
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
