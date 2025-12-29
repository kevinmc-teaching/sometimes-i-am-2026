import * as ui from "./ui-text.js"
import * as buttons from "./buttons.js"
import * as sounds from "./sounds.js"
import * as state from "./state/language-state.js"
import * as textUpdates from "./text-updates.js"

const langMenu = document.getElementById("language-menu")

export function menuSetup() {
  const lang = state.getLang()
  const optionDefault = langMenu.querySelector(`option[value=${lang}]`)
  optionDefault.selected = true
  ui.showInstructions()

  document.body.classList.add(`lang-${lang}`)

  langMenu.addEventListener("change", function (e) {
    e.stopPropagation()
    const langChoice = e.target.value

    state.setLang(langChoice)
    state.resetUpdatesNum()
    ui.updateInstructionsText(langChoice)
    ui.showInstructions()
    buttons.removeButtons()
    buttons.addButtons()
    toggleBodyLangClass(langChoice)
    sounds.removeSounds()
    sounds.loadSounds(langChoice)
    textUpdates.removeTextNodes()
  })
}

function toggleBodyLangClass(newClass) {
  document.body.classList.forEach((cls) => {
    if (cls.startsWith("lang-")) {
      document.body.classList.remove(cls)
    }
  })
  document.body.classList.add(`lang-${newClass}`)
}
