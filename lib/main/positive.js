import anime from 'animejs'

import * as bars from '../bars/positive'
import * as phraseEngine from '../phrase_engine.js'

import phrases from '../../api/wall/v1/positive/phrases.json'

bars.animate()
phraseEngine.run(phrases)
