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

// live updates for sliders + checkbox handling
adminPanel.addEventListener("input", handleAdminChange)
adminPanel.addEventListener("change", handleAdminChange)

function handleAdminChange(e) {
  const target = e.target
  if (!(target instanceof HTMLInputElement)) return

  const { id, type, value, checked } = target

  // RESET checkbox
  if (type === "checkbox" && id === "reset-to-defaults") {
    if (checked) resetToDefaults()
    // make it behave like a button
    target.checked = false
    return
  }

  // RANGE sliders
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

function syncAdminPanelFromConfig() {
  const sliders = adminPanel.querySelectorAll("input[type='range']")

  sliders.forEach((slider) => {
    const key = slider.id
    if (key in config) slider.value = String(config[key])
  })
}
