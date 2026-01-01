import { PREFERENCES_TEXT } from "./ui-text.js"
import { getLang } from "./state/language-state.js"

export const config = {
  nuclearTrigger: 60,
  nuclearEnd: 500,
  maxFZMessage: 14,
  maxFZSynonym: 8,
  maxFZMessageNode: 3,
  maxFZSynonymNode: 1.5,
  baseVolume: 1,
  fadeFactor: 0.3,
  minVolume: 0.2,
  nodeOpacityBtmLimit: 0.3,
  nodeOpacityTopLimit: 0.7,
  hideMainTextAtNuclear: true,
}

export const configResetData = {
  nuclearTrigger: 60,
  nuclearEnd: 500,
  maxFZMessage: 14,
  maxFZSynonym: 8,
  maxFZMessageNode: 3,
  maxFZSynonymNode: 1.5,
  baseVolume: 1,
  fadeFactor: 0.3,
  minVolume: 0.2,
  nodeOpacityBtmLimit: 0.3,
  nodeOpacityTopLimit: 0.7,
  hideMainTextAtNuclear: true,
}

const adminPanel = document.querySelector(".admin-panel")
const openPrefsBtn = document.querySelector(".btn-config")
const resetCheckbox = adminPanel.querySelector("#reset-to-defaults")

// live updates for sliders + checkbox handling
// adminPanel.addEventListener("input", handleAdminChange)
adminPanel.addEventListener("change", handleAdminChange)

// when user opens the preferences panel, translate first
openPrefsBtn.addEventListener("click", () => {
  const lang = getLang()
  translatePreferenceLabels(lang)
  openPreferencesPanel()
})

function translatePreferenceLabels(lang) {
  const dict = PREFERENCES_TEXT?.[lang] ?? PREFERENCES_TEXT?.en ?? {}

  // find all labels inside the admin panel that point to a control
  const labels = adminPanel.querySelectorAll("label[for]")

  labels.forEach((label) => {
    const key = label.getAttribute("for") // e.g. "maxFZMessage" or "reset-to-defaults"
    const translated = dict[key]

    if (typeof translated === "string" && translated.trim()) {
      label.textContent = translated
    }
  })
}

// replace with your own show logic
function openPreferencesPanel() {
  adminPanel.classList.toggle("admin-visible")
}

function handleAdminChange(e) {
  const input = e.target.closest("input")
  if (!input || !adminPanel.contains(input)) return

  const { id, type, value, checked } = input

  if (type === "checkbox" && id === "reset-to-defaults") {
    if (checked) resetToDefaults()
    input.checked = false
    return
  }

  if (type === "range") {
    updateConfig(id, value)
  }
}

export function updateConfig(id, rawValue) {
  // ensure slider ID exists in config
  if (!(id in config)) return

  const num = Number(rawValue)
  if (Number.isNaN(num)) return

  config[id] = num

  console.log("UPDATE CONFIG", id, config[id])
}

export function resetToDefaults() {
  // mutate existing config so imports stay live
  for (const [key, val] of Object.entries(configResetData)) {
    if (key in config) config[key] = val
  }

  syncAdminPanelFromConfig()

  console.log("RESET TO DEFAULTS", { ...config })
}

export function syncAdminPanelFromConfig() {
  const sliders = adminPanel.querySelectorAll("input[type='range']")

  sliders.forEach((slider) => {
    const key = slider.id
    if (key in config) slider.value = String(config[key])
  })
}
