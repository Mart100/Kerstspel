function Scripts() {
  MaakSleepBaar()
  document.getElementById('kerstbal - 0').oncontextmenu = function() { OpenMenu(document.getElementById('kerstbal - 0')) }
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
        NewKerstbal.oncontextmenu = function() { OpenMenu(NewKerstbal) }
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
  const SizeOfBall = parseInt(window.getComputedStyle(kerstbal, null)['height'].replace('px', ''))
  const offset = SizeOfBall / 2
  console.log(offset)
  OnItemMove(event.clientX - offset, event.clientY - offset)
  kerstbal.style.left = event.clientX - offset
  kerstbal.style.top = event.clientY - (offset + offset / 2)
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

function OpenMenu(WelkeKerstbal) {
  console.log('Kerstbal Menu Geopend')
  let RCmenu
  if(document.getElementById('RCmenu') == undefined) {
    RCmenu = document.createElement('div')
  } else {
    RCmenu = document.getElementById('RCmenu')
    RCmenu.innerHTML = ''
  }
  RCmenu.setAttribute('style', `left: ${event.clientX}; top: ${event.clientY}; position: absolute; width: 150; height: 100; border-radius: 8px; font-size: 25px; padding: 6px; color: #000000; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); background-color: #f9ffed; `)
  const xPos = event.clientX
  const yPos = event.clientY

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
    if(i === 1) RCmenubuttons.onclick = function() { ChanceColorKerstbal(WelkeKerstbal, yPos, xPos)}
    if(i === 2) RCmenubuttons.onclick = function() { ChanceSizeKerstbal(WelkeKerstbal, yPos, xPos)}
    if(i === 3) RCmenubuttons.onclick = function() { RemoveKerstbal(WelkeKerstbal) }

    RCmenubuttons.innerHTML = buttoninformation
    RCmenu.appendChild(RCmenubuttons)
  }
  if(document.getElementById('RCmenu') == undefined) document.getElementById('body').appendChild(RCmenu)
}

function RemoveRCmenu() {
  if(document.getElementById('RCmenu') !== null) {
    const RCmenu = document.getElementById('RCmenu')
    RCmenu.parentNode.removeChild(RCmenu)
  }
}

function RemoveKerstbal(WelkeKerstbal) {
  WelkeKerstbal.parentNode.removeChild(WelkeKerstbal)

}

function ChanceColorKerstbal(WelkeKerstbal, Ypos, Xpos) {
  if(document.getElementById('RCcolormenu') !== null) return
  const RCcolormenu = document.createElement('div')
  RCcolormenu.innerHTML = ''
  RCcolormenu.setAttribute('style', `left: ${Xpos}; top: ${Ypos}; position: absolute; width: 150; height: 120; border-radius: 8px; font-size: 25px; padding: 6px; color: #000000; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); background-color: #f9ffed; `)
  RCcolormenu.id = 'RCcolormenu'
  let RCmenubuttons
  let buttoninformation
  for(let i = 1; i < 5; i++) {
    // Set Text of button
    if(i === 1) buttoninformation = 'Rood'
    if(i === 2) buttoninformation = 'Groen'
    if(i === 3) buttoninformation = 'Blauw'
    if(i === 4) buttoninformation = 'Goud'
    // Create the DIV element button
    RCmenubuttons = document.createElement('div')
    // Set event click of buttoninformation
    if(i === 1) RCmenubuttons.onclick = function() { WelkeKerstbal.style.backgroundColor = 'red'; RemoveChanceColor();}
    if(i === 2) RCmenubuttons.onclick = function() { WelkeKerstbal.style.backgroundColor = 'green'; RemoveChanceColor();}
    if(i === 3) RCmenubuttons.onclick = function() { WelkeKerstbal.style.backgroundColor = 'blue'; RemoveChanceColor();}
    if(i === 4) RCmenubuttons.onclick = function() { WelkeKerstbal.style.backgroundColor = 'gold'; RemoveChanceColor();}

    RCmenubuttons.innerHTML = buttoninformation
    RCcolormenu.appendChild(RCmenubuttons)
  }
  document.getElementById('body').appendChild(RCcolormenu)
}

function ChanceSizeKerstbal(WelkeKerstbal, Ypos, Xpos) {
  if(document.getElementById('RCsizemenu') !== null) return
  const RCsizemenu = document.createElement('div')
  RCsizemenu.innerHTML = ''
  RCsizemenu.setAttribute('style', `left: ${Xpos}; top: ${Ypos}; position: absolute; width: 150; height: 120; border-radius: 8px; font-size: 25px; padding: 6px; color: #000000; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); background-color: #f9ffed; `)
  RCsizemenu.id = 'RCsizemenu'
  let RCmenubuttons
  let buttoninformation
  for(let i = 1; i < 4; i++) {
    // Set Text of button
    if(i === 1) buttoninformation = 'Klein'
    if(i === 2) buttoninformation = 'Normaal'
    if(i === 3) buttoninformation = 'Groot'
    // Create the DIV element button
    RCmenubuttons = document.createElement('div')
    // Set event click of buttoninformation
    if(i === 1) RCmenubuttons.onclick = function() { WelkeKerstbal.style.width = 35; WelkeKerstbal.style.height = 35; RemoveChanceSize();}
    if(i === 2) RCmenubuttons.onclick = function() { WelkeKerstbal.style.width = 70; WelkeKerstbal.style.height = 70; RemoveChanceSize();}
    if(i === 3) RCmenubuttons.onclick = function() { WelkeKerstbal.style.width = 100; WelkeKerstbal.style.height = 100; RemoveChanceSize();}

    RCmenubuttons.innerHTML = buttoninformation
    RCsizemenu.appendChild(RCmenubuttons)
  }
  document.getElementById('body').appendChild(RCsizemenu)
  console.log('hi')
}

function RemoveChanceColor() {
  if(document.getElementById('RCcolormenu') !== null) {
    const RCcolormenu = document.getElementById('RCcolormenu')
    RCcolormenu.parentNode.removeChild(RCcolormenu)
  }
}
function RemoveChanceSize() {
  if(document.getElementById('RCsizemenu') !== null) {
    const RCsizemenu = document.getElementById('RCsizemenu')
    RCsizemenu.parentNode.removeChild(RCsizemenu)
  }
}
