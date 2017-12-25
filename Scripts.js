let Storage = { 'buttons': { 'lightSwitch': { 'on': false }, 'snowSwitch': { 'on': true }, 'daySwitch': { 'on': true } }, 'music': { 'CurrentSong': '1-JingleBells', 'OnPause': true, 'songs': [{ }] } }
let XposKerstslee = 0
let WidthStop
let ForwardKerstslee = true
const ScreenWidth = window.innerWidth
const ScreenHeight = window.innerHeight
function Scripts() {
  MaakSleepBaar()
  KerstsleeStart()
  document.getElementById('kerstbal - 0').oncontextmenu = function() { OpenMenu(document.getElementById('kerstbal - 0')) }
  document.addEventListener('contextmenu', event => event.preventDefault());

}

function KerstsleeStart() {
  const Kerstslee = document.getElementById('Kerstslee')
  document.getElementById('body').appendChild(Kerstslee)
  setInterval(function() {
  MoveKerstslee(Kerstslee)
    }, 1)
}

function MoveKerstslee(Kerstslee) {
  WidthStop = ScreenWidth - ScreenWidth / 5
  if(XposKerstslee > WidthStop) {
    Kerstslee.style.transform = 'scaleX(1)'
    ForwardKerstslee = false
  }
  if(XposKerstslee < 150) {
    XposKerstslee = 150
    Kerstslee.style.transform = 'scaleX(-1)'
    ForwardKerstslee = true
  }
  if(ForwardKerstslee) XposKerstslee = XposKerstslee + 1
  if(!ForwardKerstslee) XposKerstslee = XposKerstslee - 1
  Kerstslee.style.left = XposKerstslee
}

function OnItemMove(item, left, top) {
  const ItemType = item.id.split(' ')[0]
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
        NewItem.oncontextmenu = function() { OpenMenu(NewItem) }
        // Add item to LeftPanel
        document.getElementById('LeftPanel').appendChild(NewItem)
        MaakSleepBaar()
        if(ItemType == 'slinger') {
          // If the Lightbutton is on/off
          if(Storage.buttons.lightSwitch.on) item.src = 'Assets/Slingers/Normaal-Aan.png'
          if(!Storage.buttons.lightSwitch.on) item.src = 'Assets/Slingers/Normaal-Uit.png'
          item.style.width = 380
          item.style.height = 125
          item.oncontextmenu = function() { OpenMenu(item) }
        }
        return
      }
    }
  }
}

function MaakSleepBaar() {
  // SleepBaar voor kerstballen
  for(let i = 0; i < 50; i++) {
    if(document.getElementById('kerstbal - ' + i) !== null) {
      const kerstbal = document.getElementById('kerstbal - ' + i)
      kerstbal.onmousedown = function() { MouseDown(kerstbal) }
    }
  }
  // SleepBaar voor slingers
  for(let i = 0; i < 50; i++) {
    if(document.getElementById('slinger - ' + i) !== null) {
      const slinger = document.getElementById('slinger - ' + i)
      slinger.onmousedown = function() { MouseDown(slinger) }
    }
  }
}

function MouseUp() {
  document.getElementById('body').onmousemove = ''
}

function MouseDown(item) {
  // Calculate offset from mouse and item
  const offsetX = event.clientX - parseInt(window.getComputedStyle(item, null)['left'].replace('px', ''))
  const offsetY = event.clientY - parseInt(window.getComputedStyle(item, null)['top'].replace('px', ''))

  document.getElementById('body').onmousemove = function() { Move(item, offsetX, offsetY) }
  item.onmouseup = function() { MouseUp() }
}

function Move(item, offsetX, offsetY) {
  OnItemMove(item, event.clientX - offsetX, event.clientY - offsetY)
  item.style.left = event.clientX - offsetX
  item.style.top = event.clientY - offsetY
  item.draggable = false
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

function OpenMenu(item) {
  const ItemType = item.id.split(' ')[0]
  console.log(ItemType + ' Menu Geopend')
  let RCmenu
  if(document.getElementById('RCmenu') == undefined) {
    RCmenu = document.createElement('div')
  } else {
    RCmenu = document.getElementById('RCmenu')
    RCmenu.innerHTML = ''
  }
  // Set Size of menu
  if(ItemType == 'kerstbal') RCmenu.setAttribute('style', `left: ${event.clientX}; top: ${event.clientY}; position: absolute; width: 150; height: 100; border-radius: 8px; font-size: 25px; padding: 6px; color: #000000; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); background-color: #f9ffed; `)
  if(ItemType == 'slinger') RCmenu.setAttribute('style', `left: ${event.clientX}; top: ${event.clientY}; position: absolute; width: 150; height: 60; border-radius: 8px; font-size: 25px; padding: 6px; color: #000000; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); background-color: #f9ffed; `)

  const xPos = event.clientX
  const yPos = event.clientY

  RCmenu.id = 'RCmenu'
  let RCmenubuttons
  let buttoninformation
  let HowMuchButtons
  if(ItemType == 'slinger') HowMuchButtons = 3
  if(ItemType == 'kerstbal') HowMuchButtons = 4
  for(let i = 1; i < HowMuchButtons; i++) {
    // Set Text of button
    if(ItemType == 'kerstbal') {
      if(i === 1) buttoninformation = 'Kleuren'
      if(i === 2) buttoninformation = 'Groote'
      if(i === 3) buttoninformation = 'Verwijderen'
    } else if(ItemType == 'slinger') {
      if(i === 1) buttoninformation = 'Groote'
      if(i === 2) buttoninformation = 'Verwijderen'
    }
    // Create the DIV element button
    RCmenubuttons = document.createElement('div')
    // Set event click of buttoninformation
    if(ItemType == 'kerstbal') {
      if(i === 1) RCmenubuttons.onclick = function() { ChanceColorKerstbal(item, yPos, xPos)}
      if(i === 2) RCmenubuttons.onclick = function() { ChanceSizeKerstbal(item, yPos, xPos)}
      if(i === 3) RCmenubuttons.onclick = function() { RemoveKerstbal(item) }
    } else if(ItemType == 'slinger') {
      if(i === 1) RCmenubuttons.onclick = function() { ChanceSizeKerstbal(item, yPos, xPos)}
      if(i === 2) RCmenubuttons.onclick = function() { RemoveKerstbal(item) }
    }

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
    if(i === 1) RCmenubuttons.onclick = function() { WelkeKerstbal.src = 'Assets/Kerstballen/Rood.png'; RemoveChanceColor();}
    if(i === 2) RCmenubuttons.onclick = function() { WelkeKerstbal.src = 'Assets/Kerstballen/Groen.png'; RemoveChanceColor();}
    if(i === 3) RCmenubuttons.onclick = function() { WelkeKerstbal.src = 'Assets/Kerstballen/Blauw.png'; RemoveChanceColor();}
    if(i === 4) RCmenubuttons.onclick = function() { WelkeKerstbal.src = 'Assets/Kerstballen/Goud.png'; RemoveChanceColor();}

    RCmenubuttons.innerHTML = buttoninformation
    RCcolormenu.appendChild(RCmenubuttons)
  }
  document.getElementById('body').appendChild(RCcolormenu)
}

function ChanceSizeKerstbal(item, Ypos, Xpos) {
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
    if(i === 1) RCmenubuttons.onclick = function() { SetItemSize(item, 'klein'); RemoveChanceSize();}
    if(i === 2) RCmenubuttons.onclick = function() { SetItemSize(item, 'normaal'); RemoveChanceSize();}
    if(i === 3) RCmenubuttons.onclick = function() { SetItemSize(item, 'groot'); RemoveChanceSize();}

    RCmenubuttons.innerHTML = buttoninformation
    RCsizemenu.appendChild(RCmenubuttons)
  }
  document.getElementById('body').appendChild(RCsizemenu)
  console.log('hi')
}

function SetItemSize(item, size) {
  const ItemType = item.id.split(' ')[0]
  if(ItemType == 'kerstbal') {
    if(size == 'klein') {
      item.style.width = 35
      item.style.height = 35
    }
    if(size == 'normaal') {
      item.style.width = 70
      item.style.height = 70
    }
    if(size == 'groot') {
      item.style.width = 100
      item.style.height = 100
    }
  }
  if(ItemType == 'slinger') {
    const AanOfUit = Storage.buttons.lightSwitch.on
    // If lightButton is ON
    if(AanOfUit) {
      if(size == 'klein') { item.src = 'Assets/Slingers/Kort-Aan.png'; item.style.width = '250'; item.style.height = '110'}
      if(size == 'normaal') { item.src = 'Assets/Slingers/Normaal-Aan.png'; item.style.width = '380'; item.style.height = '125'}
      if(size == 'groot') { item.src = 'Assets/Slingers/Lang-Aan.png'; item.style.width = '550'; item.style.height = '150'}
    }
    // If lightButton is OFF
    if(!AanOfUit) {
      if(size == 'klein') { item.src = 'Assets/Slingers/Kort-Uit.png'; item.style.width = '250'; item.style.height = '110'}
      if(size == 'normaal') { item.src = 'Assets/Slingers/Normaal-Uit.png'; item.style.width = '380'; item.style.height = '125'}
      if(size == 'groot') { item.src = 'Assets/Slingers/Lang-Uit.png'; item.style.width = '550'; item.style.height = '150'}
    }
  }
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
  let item
  let size
  const Aan = Storage.buttons.lightSwitch.on
  for(let i = 0; i < 20; i++) {
    if(document.getElementById('slinger - ' + i) !== null) {
      item = document.getElementById('slinger - ' + i)
      size = item.src.split('-')[0].split('/').pop()
      console.log(Aan + ' -- ' + size)
      if(Aan == false) {
        if(size == 'Kort') { item.src = 'Assets/Slingers/Kort-Aan.png'}
        if(size == 'Normaal') { item.src = 'Assets/Slingers/Normaal-Aan.png'}
        if(size == 'Lang') { item.src = 'Assets/Slingers/Lang-Aan.png'}
      }
      if(Aan == true) {
        if(size == 'Kort') { item.src = 'Assets/Slingers/Kort-Uit.png'}
        if(size == 'Normaal') { item.src = 'Assets/Slingers/Normaal-Uit.png'}
        if(size == 'Lang') { item.src = 'Assets/Slingers/Lang-Uit.png'}
      }

    } else {
      if(Aan) Storage.buttons.lightSwitch.on = false
      if(!Aan) Storage.buttons.lightSwitch.on = true
      return
    }
  }
}

function CLICKday() {
  console.log(Storage.buttons.daySwitch.on)
  if(Storage.buttons.daySwitch.on) {
    Storage.buttons.daySwitch.on = false
    document.getElementById('KerstboomAchtergrond').src = 'Assets/Backgrounds/Night.jpg'
    document.getElementById('DagKnop').src = 'Assets/Icons/Sun.png'
  }
  else {
    Storage.buttons.daySwitch.on = true
    document.getElementById('KerstboomAchtergrond').src = 'Assets/Backgrounds/Day.png'
    document.getElementById('DagKnop').src = 'Assets/Icons/Moon.png'
  }
}

function CLICKmusic() {
  const Music = document.getElementById('Songs')
  // Create BOX for music edit
  const MusicPopup = document.createElement('div')
  MusicPopup.setAttribute('style', 'position: absolute; right: 10%; bottom: 50%; top: 20%; left: -80%; border-radius: 10px; background-color: white; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);')

  // Create Exit button
  const ExitButton = document.createElement('img')
  ExitButton.src = 'Assets/Icons/Exit.png'
  ExitButton.setAttribute('style', 'position: absolute; right: 0; top: 0; border-radius: 10px; width: 35; height: 35; cursor: pointer;')
  ExitButton.onclick = function() { MusicPopup.parentNode.removeChild(MusicPopup)}

  // Creates Duration Text
  const DurationTEXT = document.createElement('a')
  DurationTEXT.setAttribute('style', 'position: absolute; top: 40px; left: 5px; font-size: 30px;')
  DurationTEXT.innerHTML = '0:00'
  DurationTEXT.id = 'DurationTEXT'

  // Create Playing text
  const PlayingTEXT = document.createElement('a')
  PlayingTEXT.setAttribute('style', 'position: absolute; top: 5px; left: 5px; font-size: 20px;')
  PlayingTEXT.innerHTML = 'Playing: ' + Storage.music.CurrentSong.split('-')[1]
  PlayingTEXT.id = 'PlayingTEXT'

  // Create BUTTON holder
  const ButtonHolder = document.createElement('div')
  ButtonHolder.setAttribute('style', 'position: absolute; bottom: 5%; left: 5%; right: 5%; height: 50; border-radius: 10px; background-color: #dbecff')

  // Create PAUSE button
  const PauseButton = document.createElement('img')
  PauseButton.setAttribute('style', 'position: absolute; width: 35; height: 35; cursor: pointer; margin: auto; top: 0; left: 0; bottom: 0; right: 0;')
  if(Storage.music.OnPause) PauseButton.src = 'Assets/Icons/Music/Play.png'
  if(!Storage.music.OnPause) PauseButton.src = 'Assets/Icons/Music/Pause.png'
  PauseButton.onmouseover = function() { PauseButton.style.width = 38; PauseButton.style.height = 38 }
  PauseButton.onmouseleave = function() { PauseButton.style.width = 35; PauseButton.style.height = 35 }
  PauseButton.onclick = function() {
    if(Storage.music.OnPause) {
      Storage.music.OnPause = false
      PauseButton.src = 'Assets/Icons/Music/Pause.png'
      document.getElementById('SongsAudio').play()

    } else {
      Storage.music.OnPause = true
      PauseButton.src = 'Assets/Icons/Music/Play.png'
      document.getElementById('SongsAudio').pause()
    }
  }
  // Add stuff to the BOX
  ButtonHolder.appendChild(PauseButton)
  MusicPopup.appendChild(PlayingTEXT)
  MusicPopup.appendChild(DurationTEXT)
  MusicPopup.appendChild(ButtonHolder)
  MusicPopup.appendChild(ExitButton)
  document.getElementById('RightPanel').appendChild(MusicPopup)
  setInterval(MusicStatus, 500)
}

function MusicStatus() {
  const SongSeconds = GetMinutes(Math.round(document.getElementById('SongsAudio').currentTime))
  const TotalSeconds = GetMinutes(Math.round(document.getElementById('SongsAudio').duration))

  document.getElementById('DurationTEXT').innerHTML = SongSeconds + ' / ' + TotalSeconds
  if(document.getElementById('SongsAudio').ended) { PlayNewSong() }
}

function GetMinutes(Seconds) {
  let Minutes
  for(Minutes = 0; Minutes < 1e2; Minutes++) {
    if(Seconds < 60) break
    Seconds -= 60
  }
  let zero = ''
  if(Seconds < 10) zero = '0'
  return Minutes + ':' + zero + Seconds
}

function PlayNewSong() {

}
