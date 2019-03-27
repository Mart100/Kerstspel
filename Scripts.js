let Storage = { 'buttons': { 'lightSwitch': { 'on': false }, 'snowSwitch': { 'on': true }, 'daySwitch': { 'on': true } }, 'music': { 'CurrentSong': '1-JingleBells', 'OnPause': true, 'songs': [{ }] } }
let XposKerstslee = 0
let WidthStop
let ForwardKerstslee = true
const ScreenWidth = window.innerWidth
const ScreenHeight = window.innerHeight
const texts = {
  'current': 'english',
  'english': {
    'DecorateText': 'Decorate your own Christmas tree!',
  },
  'nederlands': {
    'DecorateText': 'Versier je eigen kerstboom!'
  }
}
const Sled = {
  element() {
    return document.getElementById('sled')
  },
  start() {
    //document.getElementById('body').appendChild(Sled.element())
    setInterval(function() {
    Sled.move()
      }, 1)
  },
  move() {
    let SledE = Sled.element()
    WidthStop = ScreenWidth - ScreenWidth / 5
    if(XposKerstslee > WidthStop) {
      SledE.style.transform = 'scaleX(1)'
      ForwardKerstslee = false
    }
    if(XposKerstslee < 150) {
      XposKerstslee = 150
      SledE.style.transform = 'scaleX(-1)'
      ForwardKerstslee = true
    }
    if(ForwardKerstslee) XposKerstslee = XposKerstslee + 1
    if(!ForwardKerstslee) XposKerstslee = XposKerstslee - 1
    SledE.style.left = XposKerstslee
  }
}
const SideButtons = {
  setup() {
    $('#BUTTONsnow').click(function() { SideButtons.snow.click()})
    $('#BUTTONmusic').click(function() { SideButtons.music.click()})
    $('#BUTTONtranslate').click(function() { SideButtons.translate.click()})
  },
  'snow': {
    click() {
      $('#snowAnimation').toggle()
    }
  },
  'music': {
    click() {
      SideButtons.music.createPopup()
      setInterval(function() { SideButtons.music.status() }, 1000)
    },
    createPopup() {
      const Music = document.getElementById('Songs')
      // Create BOX for music edit
      $('#RightPanel').append('<div id="MUSICpopup"></div>')
      // Create Exit button
      $('#MUSICpopup').append('<img id="MUSICexit" src="Assets/Icons/Exit.png"/>')
      $('#MUSICexit').on('click', function() { SideButtons.music.removePopup() })

      // Creates Duration Text
      $('#MUSICpopup').append('<div id="MUSICduration">0:00</div>')

      // Create Playing text
      $('#MUSICpopup').append(`<a id="MUSICplayingText">Playing: ${Storage.music.CurrentSong.split('-')[1]}</a>`)
      // Create BUTTON holder
      $('#MUSICpopup').append('<div id="MUSICbuttonHolder"></div>')
      // Create PAUSE button
      $('#MUSICbuttonHolder').append('<img id="MUSICbuttonPAUSE"/>')
      if(Storage.music.OnPause) $('#MUSICbuttonPAUSE').attr('src', 'Assets/Icons/Music/Play.png')
      if(!Storage.music.OnPause) $('#MUSICbuttonPAUSE').attr('src', 'Assets/Icons/Music/Pause.png')
      //PauseButton.onmouseover = function() { PauseButton.style.width = 38; PauseButton.style.height = 38 }
      //PauseButton.onmouseleave = function() { PauseButton.style.width = 35; PauseButton.style.height = 35 }
      $('#MUSICbuttonPAUSE').on('click', function() {
        if(Storage.music.OnPause) {
          Storage.music.OnPause = false
          $('#MUSICbuttonPAUSE').attr('src', 'Assets/Icons/Music/Pause.png')
          document.getElementById('SongsAudio').play()

        } else {
          Storage.music.OnPause = true
          $('#MUSICbuttonPAUSE').attr('src', 'Assets/Icons/Music/Play.png')
          document.getElementById('SongsAudio').pause()
        }
      })
    },
    removePopup() {
      $('#MUSICpopup').remove()
    },
    status() {
      const SongSeconds = GetMinutes(Math.round(document.getElementById('SongsAudio').currentTime))
      const TotalSeconds = GetMinutes(Math.round(document.getElementById('SongsAudio').duration))
      $('#MUSICduration').html(SongSeconds + ' / ' + TotalSeconds)
      if(document.getElementById('SongsAudio').ended) { PlayNewSong() }
    }
  },
  'translate': {
    click() {
      SideButtons.translate.createPopup()
    },
    switchTo(to) {
      $('#decorateText').html(texts[to].DecorateText)
    },
    createPopup() {
      // Create BOX
      $('#RightPanel').append('<div id="TRANSLATEpopup"></div>')
      // Create Exit button
      $('#TRANSLATEpopup').append('<img id="TRANSLATEexit" src="Assets/Icons/Exit.png"/>')
      $('#TRANSLATEexit').on('click', function() { SideButtons.translate.removePopup() })
      // Create languages
      for(lang in texts) {
        if(lang == 'current') continue
        $('#TRANSLATEpopup').append(`<div id="TRANSLATElanguage" class="TRANSLATE${lang}">${lang}</div>`)
        $(`.TRANSLATE${lang}`).on('click', function() { SideButtons.translate.switchTo($(this).html())})
      }
    },
    removePopup() {
      $('#TRANSLATEpopup').remove()
    }
  }
}
function Scripts() {
  SideButtons.setup()
  MaakSleepBaar()
  Sled.start()
  document.getElementById('kerstbal - 0').oncontextmenu = function() { OpenMenu(document.getElementById('kerstbal - 0')) }
  document.addEventListener('contextmenu', event => event.preventDefault());

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
  let TempArray
  const Aan = Storage.buttons.lightSwitch.on
  for(let i = 0; i < 20; i++) {
    if(document.getElementById('slinger - ' + i) !== null) {
      item = document.getElementById('slinger - ' + i)
      TempArray = item.src.split('-')[0].split('/')
      size = TempArray[TempArray.length - 1]
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
    document.getElementById('background').src = 'Assets/Backgrounds/Night.jpg'
    document.getElementById('DagKnop').src = 'Assets/Icons/Sun.png'
  }
  else {
    Storage.buttons.daySwitch.on = true
    document.getElementById('background').src = 'Assets/Backgrounds/Day.png'
    document.getElementById('DagKnop').src = 'Assets/Icons/Moon.png'
  }
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
