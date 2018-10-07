import phrases from '../api/wall/v1/positive/phrases.json';

let phraseText = phrases[0].text;

document.getElementById('wavy').innerHTML =
  `<div class="text">${phraseText}</div>`.repeat(26);
