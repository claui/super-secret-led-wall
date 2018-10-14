import anime from 'animejs'

const DURATION_MS_MIN = 10
const DURATION_MS_MAX = 250
const X_MIN = 0
const X_MAX = 600
const Y_MIN = 0
const Y_MAX = 500

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

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
    let phraseDiv = document.createElement('div')
    phraseDiv.setAttribute('id', `phrase_${this.phraseId}`)
    let phraseSpan = document.createElement('span')
    phraseSpan.textContent = this.phraseText
    phraseDiv.appendChild(phraseSpan)
    document.body.appendChild(phraseDiv)

    let baseX0 = getRandomInt(X_MAX - X_MIN) + X_MIN
    let baseX1 = getRandomInt(X_MAX - baseX0) + baseX0
    let baseY0 = getRandomInt(Y_MAX - Y_MIN) + Y_MIN
    let baseY1 = getRandomInt(Y_MAX - baseY0) + baseY0
    let baseDuration = getRandomInt(DURATION_MS_MAX - DURATION_MS_MIN)
      + DURATION_MS_MIN

    phraseDiv.style = `transform:
      translateX(${baseX0}px) translateY(${baseY0}px);`

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
          duration: 5 * baseDuration
        },
        {
          value: 2,
          duration: 0.5 * baseDuration,
          delay: 10 * baseDuration,
          easing: 'easeOutExpo'
        },
        {
          value: 1,
          duration: 4.5 * baseDuration
        },
        {
          value: 1.75,
          duration: 0.5 * baseDuration,
          delay: 10 * baseDuration,
          easing: 'easeOutExpo'
        },
        {
          value: 1,
          duration: 4.5 * baseDuration
        }
      ],
      loop: true
    })
  }

  destroy () {
    anime.remove(`#phrase_${this.phraseId}`)
    let phraseDiv = document.getElementById(`phrase_${this.phraseId}`)
    document.body.removeChild(phraseDiv)
    console.log(`Phrase #${this.phraseId} destroyed`)
  }

  get name () { return this.constructor.name }
}

if (module.hot) {
  module.renderersByPhraseId = new Map()

  module.hot.dispose(() => {
    console.log('module is about to be replaced')
    module.renderersByPhraseId.forEach((renderer) => {
      renderer.destroy()
    })
    console.log('All phrases destroyed')
  });
}
