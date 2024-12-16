import anime from 'animejs'

import * as bars from '../bars/negative'
import { LivePhraseEngine, StaticPhraseEngine } from '../phrase_engine.js'
import renderers from '../renderers.js'

/*
 * To use static data instead of the live API, replace the lines:
 *
 *     let sourceUrl = 'http://led-wall.local:5101/api/wall/v1/negative/phrases'
 *     new LivePhraseEngine({ sourceUrl, renderers }).run()
 *
 * with:
 *
 *     import phrases from '../../api-dumped/wall/v1/negative/phrases.json'
 *     new StaticPhraseEngine({ phrases, renderers }).run()
 */

let sourceUrl = 'http://led-wall.local:5101/api/wall/v1/negative/phrases'
new LivePhraseEngine({ sourceUrl, renderers }).run()

bars.animate()
