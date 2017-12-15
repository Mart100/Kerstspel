function Scripts() {
  MaakSleepBaar()
  document.getElementById('kerstbal - 0').oncontextmenu = function() { OpenMenu() }
  document.addEventListener('contextmenu', event => event.preventDefault());

}

function OnItemMove(left, top) {
  document.getElementById('testt').innerHTML = left
  let LastMadeKerstbal = 0
  for(let i = 0; i < 20; i++) {
    if(document.getElementById('kerstbal - ' + i) !== null) {
      LastMadeKerstbal = i
    }
  }
  const LeftProp = window.getComputedStyle(document.getElementById('kerstbal - ' + LastMadeKerstbal), null)['left'].replace('px', '')
  if(parseInt(LeftProp) > 140) {
    for(let i = 0; i < 50; i++) {
      if(document.getElementById('kerstbal - ' + i) == undefined) {
        console.log('Nieuwe kerstbal gemaakt')
        const NewKerstbal = document.createElement('img')
        NewKerstbal.setAttribute('style', 'position: absolute; left: 0; width: 100; height: 100; cursor: move; user-drag: none;')
        NewKerstbal.src = 'https://gyazo.com/78287b22af92bded0feb779cea167727.png'
        NewKerstbal.id = 'kerstbal - ' + i
        document.getElementById('LeftPanel').appendChild(NewKerstbal)
        MaakSleepBaar()
        return
      }
    }
  }
}

function MaakSleepBaar() {
  for(let i = 0; i < 50; i++) {
    if(document.getElementById('kerstbal - ' + i) !== null) {
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

function CLICKsnow() {
  const SneeuwKnop = document.getElementById('SneeuwKnop')
  const SneeuwAnimatie = document.getElementById('SneeuwAnimatie')
  if(window.getComputedStyle(SneeuwAnimatie, null)['display'] == 'none') {
   SneeuwAnimatie.setAttribute('style', 'position: absolute; width: 100%; height: 100%; Display: block;')
 } else {
  SneeuwAnimatie.setAttribute('style', 'position: absolute; width: 100%; height: 100%; Display: none;')
 }
}

function OpenMenu() {
  console.log('Kerstbal Menu Geopend')
  let RCmenu
  if(document.getElementById('RCmenu') == undefined) {
    RCmenu = document.createElement('div')
  } else {
    RCmenu = document.getElementById('RCmenu')
    RCmenu.innerHTML = ''
  }
  RCmenu.setAttribute('style', `left: ${event.clientX}; top: ${event.clientY}; position: absolute; width: 150; height: 100; border-radius: 8px; font-size: 25px; padding: 6px; color: #000000; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); background-color: #f9ffed; `)
  RCmenu.id = 'RCmenu'
  let RCmenubuttons
  let buttoninformation
  for(let i = 1; i < 4; i++) {
    // Set Text of button
    if(i === 1) buttoninformation = 'Kleuren'
    if(i === 2) buttoninformation = 'Groote'
    if(i === 3) buttoninformation = 'Verwijderen'
    // Create the DIV element button
    RCmenubuttons = document.createElement('div')
    // Set event click of buttoninformation
    if(i === 1) RCmenubuttons.onclick = function() {}
    if(i === 2) RCmenubuttons.onclick = function() {}
    if(i === 3) RCmenubuttons.onclick = function() { RemoveShortcut(WichShortcut, Page) }
    // Set Hover color
    RCmenubuttons.addEventListener('mouseenter', function() { RCmenubuttons.setAttribute('style', 'background-color: #e0e0e0;') })
    RCmenubuttons.addEventListener('mouseleave', function() { RCmenubuttons.setAttribute('style', 'background-color: #f9ffed;') })

    RCmenubuttons.innerHTML = buttoninformation
    RCmenu.appendChild(RCmenubuttons)
  }
  if(document.getElementById('RCmenu') == undefined) document.getElementById('body').appendChild(RCmenu)
}
