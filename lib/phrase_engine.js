import { RandomRendererChooser, SoloRendererChooser }
  from './phrase_engine/chooser.js'

import renderers from './renderers.js'

export function run(phrases) {
  console.log('Initializing phrase animation')

  let soloRenderer = renderers.find((renderer) => renderer.solo)

  let chooser = (soloRenderer === undefined)
    ? new RandomRendererChooser(renderers)
    : new SoloRendererChooser(soloRenderer)

  let animations = phrases.map((phrase) => {
    console.log(`Initializing animation for phrase #${phrase.id}: `
      + phrase.text)

    let renderer = chooser.next()
      .plugin
      .then((plugin) => {
        let renderer = new plugin.default(phrase)
        renderer.setup()
        return renderer
      })

    return { phrase, renderer }
  })

  console.log('Done initializing phrase animation')

  for(let animation of animations) {
    animation.renderer.then((renderer) => {
      console.log(
        `Animation for phrase #${animation.phrase.id}: ${renderer.name}`)
    })
  }
}
