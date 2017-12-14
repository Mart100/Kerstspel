function Scripts() {
  MaakSleepBaar()

}

function OnItemMove(left, top) {
  document.getElementById('testt').innerHTML = left
  if(left > 140) {
    for(let i = 0; i < 20; i++) {
      if(document.getElementById('kerstbal - ' + i) == undefined) {
        const NewKerstbal = document.createElement('img')
        NewKerstbal.setAttribute('style', 'position: absolute; left: 0; width: 100; height: 100; cursor: move; user-drag: none;')
        NewKerstbal.src = 'https://gyazo.com/78287b22af92bded0feb779cea167727.png'
        NewKerstbal.id = 'kerstbal - ' + i
        document.getElementById('LeftPanel').appendChild(NewKerstbal)
        return
      }
    }
  }
}

function MaakSleepBaar() {
  for(let i = 0; i < 20; i++) {
    console.log(document.getElementById('kerstbal - ' + i))
    if(document.getElementById('kerstbal - ' + i) !== undefined) {
      const kerstbal = document.getElementById('kerstbal - ' + i)
      kerstbal.onmousedown = function() { MouseDown(kerstbal) }
    }
  }
}

function MouseUp(kerstbal) {
  kerstbal.onmousemove = ''
}

function MouseDown(kerstbal) {
  kerstbal.onmousemove = function() { Move(kerstbal) }
  kerstbal.onmouseup = function() { MouseUp(kerstbal) }
}

function Move(kerstbal) {
  OnItemMove(event.clientX - 50, event.clientY - 50)
  kerstbal.setAttribute('style', `position: absolute; width: 100; height: 100; left: ${event.clientX - 50}; top: ${event.clientY - 50}; cursor: move; user-drag: none;`)
  kerstbal.draggable = false
}
function StopMove(kerstbal) {
  kerstbal.onmouseup = null
  kerstbal.onmousedown = null
}
