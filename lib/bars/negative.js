import anime from 'animejs'

var loop = true;
var easing = 'easeInOutSine';
var direction = 'alternate';
var duration = 10000;

var bar1Timeline = anime.timeline({
  loop,
  direction,
  duration
})

var bar2Timeline = anime.timeline({
  loop,
  direction,
  duration
})

var bar3Timeline = anime.timeline({
  loop,
  direction,
  duration
})

var bar4Timeline = anime.timeline({
  loop,
  direction,
  duration
})

var bar5Timeline = anime.timeline({
  loop,
  direction,
  duration
})

var bar6Timeline = anime.timeline({
  loop,
  direction,
  duration
})

bar1Timeline
.add({
  targets: '.bar1',
  translateX: '600',
  duration: 6000,
  easing,
  background: '#FFFFFF',
}).add({
  targets: '.bar1',
  translateX: 1600,
  duration: 10000,
  easing,
  background: '#FFFFFF',
}).add({
  targets: '.bar1',
  translateX: 0,
  duration: 20000,
  easing,
  background: '#FFFFFF',
})

bar2Timeline
.add({
  targets: '.bar2',
  translateX: '-400',
  duration: 16000,
  easing,
  background: '#FFFFFF',
}).add({
  targets: '.bar2',
  translateX: '-800',
  duration: 10000,
  easing,
  background: '#FFFFFF',
}).add({
  targets: '.bar2',
  translateX: '-1000',
  duration: 10000,
  easing,
  background: '#FFFFFF'
}).add({
  targets: '.bar2',
  translateX: '400',
  duration: 20000,
  easing,
  background: '#FFFFFF'
})

bar3Timeline
.add({
  targets: '.bar3',
  translateX: '-200',
  duration: 8000,
  easing,
  background: '#FFFFFF',
}).add({
  targets: '.bar3',
  translateX: 400,
  duration: 16000,
  easing,
  background: '#FFFFFF'
}).add({
  targets: '.bar3',
  translateX: 1200,
  duration: 16000,
  easing,
  background: '#FFFFFF'
}).add({
  targets: '.bar3',
  translateX: 0,
  duration: 16000,
  easing,
  background: '#FFFFFF'
})

bar4Timeline
.add({
  targets: '.bar4',
  translateX: '-600',
  duration: 12000,
  easing,
  background: '#FFFFFF'
}).add({
  targets: '.bar4',
  translateX: '-1200',
  duration: 16000,
  easing,
  background: '#FFFFFF'
}).add({
  targets: '.bar4',
  translateX: '-1700',
  duration: 16000,
  easing,
  background: '#FFFFFF'
}).add({
  targets: '.bar4',
  translateX: '-800',
  duration: 16000,
  easing,
  background: '#FFFFFF'
}).add({
  targets: '.bar4',
  translateX: '-400',
  duration: 12000,
  easing,
  background: '#FFFFFF'
})

bar5Timeline
.add({
  targets: '.bar5',
  translateX: '1800',
  duration: 16000,
  easing,
  background: '#FFFFFF'
}).add({
  targets: '.bar5',
  translateX: 1000,
  duration: 8000,
  easing,
  background: '#FFFFFF'
}).add({
  targets: '.bar5',
  translateX: '-200',
  duration: 8000,
  easing,
  background: '#FFFFFF'
}).add({
  targets: '.bar5',
  translateX: '600',
  duration: 16000,
  easing,
  background: '#FFFFFF'
  })

bar6Timeline
.add({
  targets: '.bar6',
  translateX: '400',
  duration: 6000,
  easing,
  background: '#FFFFFF'
}).add({
  targets: '.bar6',
  translateX: '-1000',
  duration: 16000,
  easing,
  background: '#FFFFFF'
}).add({
  targets: '.bar6',
  translateX: '-400',
  duration: 16000,
  easing,
  background: '#FFFFFF'
}).add({
  targets: '.bar6',
  translateX: '-1400',
  duration: 16000,
  easing,
  background: '#FFFFFF'
  }).add({
  targets: '.bar6',
  translateX: '400',
  duration: 16000,
  easing,
  background: '#FFFFFF'
})
