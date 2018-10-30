import anime from 'animejs'

const DURATION_MS_MIN = 100
const DURATION_MS_MAX = 200
const X_MIN = 0
const X_MAX = 600
const Y_MIN = 0
const Y_MAX = 500

export default class TickingRenderer {
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
    phraseDiv.style = `
      mix-blend-mode: difference;
      transform:
        translateX(${baseX0}px) translateY(${baseY0}px);
    `
    let phraseSpan = window.document.createElement('span')
    phraseSpan.textContent = this.phraseText
    phraseDiv.appendChild(phraseSpan)
    window.document.body.appendChild(phraseDiv)

    anime({
      targets: `#phrase_${this.phraseId}`,
      translateX: [
        {
          value: '+20',
          duration: 1000,
          delay: 100,
          elasticity: 0
        },
        {
          value: '+40',
          duration: 1000,
          delay: 100,
          elasticity: 0
        },
        {
          value: '+60',
          duration: 1000,
          delay: 100,
          elasticity: 0
        },
        {
          value: 80,
          duration: 1000,
          delay: 100,
          elasticity: 0
        },
        {
          value: 100,
          duration: 1000,
          delay: 100,
          elasticity: 0
        },
        {
          value: 120,
          duration: 1000,
          delay: 100,
          elasticity: 0
        }
      ],
      translateY: [
        {
          value: 0,
          duration: 100,
          delay: 100,
          elasticity: 0
        },
        {
          value: 0,
          duration: 100,
          delay: 100,
          elasticity: 0
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
