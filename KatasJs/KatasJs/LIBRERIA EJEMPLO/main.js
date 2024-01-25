import anime from './node_modules/animejs/lib/anime.es.js';

var pathEls = document.querySelectorAll('path');
for (var i = 0; i < pathEls.length; i++) {
  var pathEl = pathEls[i];
  var offset = anime.setDashoffset(pathEl);
  pathEl.setAttribute('stroke-dashoffset', offset);
  anime({
    targets: pathEl,
    strokeDashoffset: [offset, 0],
    duration: anime.random(1000, 3000),
    delay: anime.random(0, 0),
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutSine',
    autoplay: true
  });
}

var letterEls = document.querySelectorAll('.letter');
for (var i = 0; i < letterEls.length; i++) {
  var letterEl = letterEls[i];
  var offset = anime.setDashoffset(letterEl);
  letterEl.setAttribute('stroke-dashoffset', offset);
   anime({
    targets: letterEl,
    duration: anime.random(0, 1000),
    delay: anime.random(0, 300),
    opacity: [
      { value: 0, duration: anime.random(0, 300) },
    ],
    loop: true
  });
}