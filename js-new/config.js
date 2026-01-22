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
adminPanel.addEventListener("input", handleAdminChange)
adminPanel.addEventListener("change", handleAdminChange)

// when user opens the preferences panel, translate first
openPrefsBtn.addEventListener("click", () => {
  translatePreferenceLabels()
  openPreferencesPanel()
})

// keyboard shortcut: type "@@@" to toggle the preferences panel (and translate labels first)
;(() => {
  let buffer = ""
  const TRIGGER = "@@@"

  document.addEventListener("keydown", (e) => {
    // ignore when user is typing in a form field or editable region
    const t = e.target
    const tag = t && t.tagName
    if (tag === "INPUT" || tag === "TEXTAREA" || t?.isContentEditable) return

    // only react to single-character keys (ignore Shift, Arrow keys, etc.)
    if (typeof e.key !== "string" || e.key.length !== 1) return

    buffer = (buffer + e.key).slice(-TRIGGER.length)

    if (buffer === TRIGGER) {
      // mirror the button behavior: translate then toggle open/close
      translatePreferenceLabels()
      openPreferencesPanel()
      buffer = ""
    }
  })
})()


export function translatePreferenceLabels(lang = getLang()) {
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

function openPreferencesPanel() {
  const isOpen = adminPanel.classList.toggle("admin-visible")
  adminPanel.setAttribute("aria-hidden", String(!isOpen))
  openPrefsBtn.setAttribute("aria-expanded", String(isOpen))
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
