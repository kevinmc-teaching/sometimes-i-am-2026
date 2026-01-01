import * as state from "./js-new/state/language-state.js"
import * as textUpdates from "./js-new/text-updates.js"
import * as menu from "./js-new/menu.js"
import * as buttons from "./js-new/buttons.js"
import * as sounds from "./js-new/sounds.js"
import * as config from "./js-new/config.js"

const lang = state.getLang()

menu.menuSetup()
textUpdates.updateUIText(lang)
sounds.loadSounds(lang)

buttons.addButtons()
config.syncAdminPanelFromConfig()

// config.createConfigPanel()
