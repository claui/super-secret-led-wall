import * as bars from '../bars/negative'
import * as phraseEngine from '../phrase_engine.js'

import phrases from '../../api/wall/v1/negative/phrases.json'

bars.animate()
phraseEngine.run(phrases)
