import anime from 'animejs'

export function animate() {
  let loop = true
  let easing = 'easeInOutSine'
  let direction = 'alternate'
  let duration = 10000

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
    duration: 3000,
    easing,
    background: '#FF7BFF',
    duration: 2000
  }).add({
    targets: '.bar1',
      translateX: 1600,
    duration: 5000,
    easing,
    background: '#8CFE92',
  }).add({
    targets: '.bar1',
    translateX: 0,
    duration: 10000,
    easing,
    background: '#FFFC92',
  })

  bar2Timeline
  .add({
    targets: '.bar2',
    translateX: '-400',
    duration: 8000,
    easing,
    background: '#958DFF',
  }).add({
    targets: '.bar2',
    translateX: '-800',
    duration: 5000,
    easing,
    background: '#FFFC92',
  }).add({
    targets: '.bar2',
    translateX: '-1000',
    duration: 5000,
    easing,
    background: '#FF78AF'
  }).add({
    targets: '.bar2',
    translateX: '400',
    duration: 10000,
    easing,
    background: '#8CFE92'
  })

  bar3Timeline
  .add({
    targets: '.bar3',
    translateX: '-200',
    duration: 4000,
    easing,
    background: '#FFFC92',
  }).add({
    targets: '.bar3',
    translateX: 400,
    duration: 8000,
    easing,
    background: '#8CFE92'
  }).add({
    targets: '.bar3',
    translateX: 1200,
    duration: 8000,
    easing,
    background: '#FF94A1'
  }).add({
    targets: '.bar3',
    translateX: 0,
    duration: 8000,
    easing,
    background: '#B466FF'
  })

  bar4Timeline
  .add({
    targets: '.bar4',
    translateX: '-600',
    duration: 6000,
    easing,
    background: '#FF7BFF'
  }).add({
    targets: '.bar4',
    translateX: '-1200',
    duration: 8000,
    easing,
    background: '#4FFEC9'
  }).add({
    targets: '.bar4',
    translateX: '-1700',
    duration: 8000,
    easing,
    background: '#FF7BFF'
  }).add({
    targets: '.bar4',
    translateX: '-800',
    duration: 8000,
    easing,
    background: '#4FFEC9'
  }).add({
    targets: '.bar4',
    translateX: '-400',
    duration: 6000,
    easing,
    background: '#958DFF'
  })

  bar5Timeline
  .add({
    targets: '.bar5',
    translateX: '1800',
    duration: 8000,
    easing,
    background: '#FFB18A'
  }).add({
    targets: '.bar5',
    translateX: 1000,
    duration: 4000,
    easing,
    background: '#B466FF'
  }).add({
    targets: '.bar5',
    translateX: '-200',
    duration: 4000,
    easing,
    background: '#85FCFF'
  }).add({
    targets: '.bar5',
    translateX: '600',
    duration: 8000,
    easing,
    background: '#FF78AF'
    })

  bar6Timeline
  .add({
    targets: '.bar6',
    translateX: '400',
    duration: 3000,
    easing,
    background: '#FF94A1'
  }).add({
    targets: '.bar6',
    translateX: '-1000',
    duration: 8000,
    easing,
    background: '#958DFF'
  }).add({
    targets: '.bar6',
    translateX: '-400',
    duration: 8000,
    easing,
    background: '#FFB18A'
  }).add({
    targets: '.bar6',
    translateX: '-1400',
    duration: 8000,
    easing,
    background: '#85FCFF'
    }).add({
    targets: '.bar6',
    translateX: '400',
    duration: 8000,
    easing,
    background: '#FFFC92'
    })
}
