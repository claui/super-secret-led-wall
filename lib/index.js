import anime from 'animejs'

import phrases from '../api/wall/v1/positive/phrases.json'

let phraseText = phrases[0].text
let phraseDiv = document.getElementById('phrase_1');
phraseDiv.getElementsByTagName('span')[0].innerHTML = phraseText

var path = anime.path('#motionPath path');

anime({
  targets: '#phrase_1',
  translateX: path('x'),
  translateY: path('y'),
  rotate: path('angle'),
  easing: 'linear',
  duration: 5000,
  loop: true
});
