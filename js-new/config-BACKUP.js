export const config = {
  nuclearTrigger: 60,
  nuclearDuration: 50,
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
  nuclearDuration: 50,
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

// adminPanel.addEventListener("input", handleAdminChange)
adminPanel.addEventListener("change", handleAdminChange)

function handleAdminChange(e) {
  console.log("In Handle Admin Change handler.")
  const target = e.target

  // ignore anything that's not an input
  // if (!(target instanceof HTMLInputElement)) return

  const { id, type, value, checked } = target

  // checkbox
  if (type === "checkbox") {
    console.log(id, checked)
    if (id === "reset-to-defaults") {
      resetToDefaults(id, checked)
    }
    return
  }

  // range inputs
  if (type === "range") {
    console.log(id, Number(value))
    updateConfig(id, Number(value))
  }
}

export function updateConfig(id, number) {
  console.log("UPDATE CONFIG")
  console.log(id, number)
}
export function resetToDefaults(id, checked) {
  console.log("RESET TO DEFAULTS")
  console.log(id, checked)
}
