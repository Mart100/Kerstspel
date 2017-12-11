function MaakSleepBaar() {
  const kerstbaltest = document.getElementById('kerstbal')
  kerstbaltest.addEventListener('mousedown', function() { Slepen() })
  document.getElementById('testt').innerHTML = 'LadenVoltooid'
}

function Slepen() {
  const kerstbaltest = document.getElementById('kerstbal')
  kerstbaltest.setAttribute('style', `position: absolute; width: 100; height: 100; left: ${event.clientX}; top: ${event.clientY};`)
  kerstbaltest.src = 'https://gyazo.com/78287b22af92bded0feb779cea167727.png'
  document.getElementById('testt').innerHTML = 'SlepenVoltooid'
}
