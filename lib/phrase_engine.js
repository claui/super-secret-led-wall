import { RandomRendererChooser, SoloRendererChooser }
  from './phrase_engine/chooser.js'

import renderers from './renderers.js'

const PHRASE_INTERVAL_MS = 5000

export function run(phrases) {
  console.log('Initializing phrase animation')

  let soloRenderer = renderers.find((renderer) => renderer.solo)

  let chooser = (soloRenderer === undefined)
    ? new RandomRendererChooser(renderers)
    : new SoloRendererChooser(soloRenderer)

  let timerHandle = setInterval(() => {
    let randomIndex = Math.floor(phrases.length * Math.random())
    let phrase = phrases[randomIndex]

    if (window.document.getElementById(`phrase_${phrase.id}`)) {
      console.log(`Ignoring phrase: ${phrase.text}`)
      return
    } else {
      console.log(`Spawning phrase: ${phrase.text}`)
    }

    chooser.next()
      .plugin
      .then((plugin) => {
        let renderer = new plugin.default(phrase)
        renderer.setup()
      })
  }, PHRASE_INTERVAL_MS)

  console.log('Done initializing phrase animation')
}
