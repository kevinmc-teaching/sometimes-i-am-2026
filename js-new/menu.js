import * as ui from "./ui-text.js"
import * as buttons from "./buttons.js"
import * as sounds from "./sounds.js"
import * as state from "./state/language-state.js"
import * as textUpdates from "./text-updates.js"
import * as config from "./config.js"

const langMenu = document.getElementById("language-menu")
const btnConfig = document.querySelector(".btn-config")
const adminPanel = document.querySelector(".admin-panel")

export function menuSetup() {
  const lang = state.getLang()
  const optionDefault = langMenu.querySelector(`option[value=${lang}]`)
  optionDefault.selected = true
  textUpdates.showInstructions()

  document.body.classList.add(`lang-${lang}`)

  langMenu.addEventListener("change", function (e) {
    e.stopPropagation()
    const langChoice = e.target.value

    state.setLang(langChoice)
    state.resetUpdatesNum()
    textUpdates.updateUIText(langChoice)
    textUpdates.showInstructions()
    buttons.removeButtons()
    buttons.addButtons()
    toggleBodyLangClass(langChoice)
    sounds.removeSounds()
    sounds.loadSounds(langChoice)
    textUpdates.removeTextNodes()
    config.syncAdminPanelFromConfig()
  })

  // ignore language menu clicks, but hide instructions if anywhere else is clicked.
  window.addEventListener("click", (e) => {
    if (e.target.closest("#language-menu")) return // ignore select menu clicks
    textUpdates.hideInstructions()
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
