function Scripts() {
  MaakSleepBaar()
  document.getElementById('kerstbal - 0').oncontextmenu = function() { OpenMenu(document.getElementById('kerstbal - 0')) }
  document.addEventListener('contextmenu', event => event.preventDefault());

}

function OnItemMove(item, left, top) {
  const ItemType = item.id.split(' ')[0]
  document.getElementById('testt').innerHTML = left
  let LastMadeItem = 0
  for(let i = 0; i < 20; i++) {
    if(document.getElementById(ItemType + ' - ' + i) !== null) {
      LastMadeItem = i
    }
  }
  const LeftProp = window.getComputedStyle(document.getElementById(ItemType + ' - ' + LastMadeItem), null)['left'].replace('px', '')
  if(parseInt(LeftProp) > 140) {
    for(let i = 0; i < 50; i++) {
      if(document.getElementById(ItemType + ' - ' + i) == undefined) {
        console.log('Nieuwe ' + ItemType + ' gemaakt')
        const NewItem = document.createElement('img')
        // Set Style of new item
        if(ItemType == 'kerstbal') NewItem.setAttribute('style', 'position: absolute; left: 15%; top: 2%; width: 100; height: 100; cursor: move; user-drag: none;')
        if(ItemType == 'slinger') NewItem.setAttribute('style', 'position: absolute; left: 15%; top: 15%; width: 100; height: 100; cursor: move; user-drag: none;')
        // Set Image of new item
        if(ItemType == 'kerstbal') NewItem.src = 'https://gyazo.com/78287b22af92bded0feb779cea167727.png'
        if(ItemType == 'slinger') NewItem.src = 'https://gyazo.com/9c637de06cbd7bade0f086c38cc03e6d.png'
        // Set ID of new item
        NewItem.id = ItemType + ' - ' + i
        // Assign functions to new item
        if(ItemType == 'kerstbal') NewItem.oncontextmenu = function() { OpenMenu(NewItem) }
        // Add item to LeftPanel
        document.getElementById('LeftPanel').appendChild(NewItem)
        MaakSleepBaar()
        if(ItemType == 'slinger') {
          item.src = 'https://gyazo.com/726f2fd48154f6dafa063badbf7032ec.png'
          item.style.width = 550
          item.style.height = 150
          item.id = 'KerstLichtjes'
        }
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
  for(let i = 0; i < 50; i++) {
    if(document.getElementById('slinger - ' + i) !== null) {
      const slinger = document.getElementById('slinger - ' + i)
      slinger.onmousedown = function() { MouseDown(slinger) }
    }
  }
}

function MouseUp(item) {
  item.onmousemove = ''
}

function MouseDown(item) {
  item.onmousemove = function() { Move(item) }
  item.onmouseup = function() { MouseUp(item) }
}

function Move(item) {
  const SizeOfBall = parseInt(window.getComputedStyle(item, null)['height'].replace('px', ''))
  const offset = SizeOfBall / 2
  console.log(offset)
  OnItemMove(item, event.clientX - offset, event.clientY - offset)
  item.style.left = event.clientX - offset
  item.style.top = event.clientY - (offset + offset / 2)
  item.draggable = false
}

function StopMove(item) {
  item.onmouseup = null
  item.onmousedown = null
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
function CLICKlight() {
  const LichtKnop = document.getElementById('LichtKnop')
  const LichtAnimatie = document.getElementById('KerstLichtjes')
  if(LichtAnimatie.src == 'https://gyazo.com/47d3ca9d60b6a20342d29acefa92ecfd.png') {
   LichtAnimatie.src = 'https://gyazo.com/726f2fd48154f6dafa063badbf7032ec.png'
 } else {
  LichtAnimatie.src = 'https://gyazo.com/47d3ca9d60b6a20342d29acefa92ecfd.png'
 }
}
