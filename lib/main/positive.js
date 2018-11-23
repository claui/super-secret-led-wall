import anime from 'animejs'

import * as bars from '../bars/positive'
import * as phraseEngine from '../phrase_engine.js'

bars.animate()

fetch('http://localhost:5101/api/wall/v1/positive/phrases')
  .then(response => response.json())
  .then(phrases => phraseEngine.run(phrases))
