import phrases from '../api/wall/v1/positive/phrases.json'
import renderers from './renderers.js'

console.log('Initializing phrase animation')

let animations = phrases.map((phrase) => {
  console.log(`Initializing animation for phrase #${phrase.id}: `
    + phrase.text)

  let renderer = renderers[0]
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
