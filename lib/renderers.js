/*
 * The `renderers` array registers each renderer with the app.
 *
 * The `weight` property assigns each renderer a probabilistic
 * weight. A higher `weight` increases the likelihood that the
 * app will pick that renderer.
 *
 * We use the dynamic import feature to defer the effect of
 * a malfunctioning renderer until that renderer is picked.
 */

let renderers = [
  {
    plugin: import('./renderers/apparition'),
    weight: 1
  },
  {
    plugin: import('./renderers/crazy'),
    weight: 1
  }
]

export default renderers
