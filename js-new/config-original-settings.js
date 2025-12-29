export const config = {
  nuclearTrigger: 80,
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

export function createConfigPanel() {
  const config = {
    nuclearTrigger: { min: 0, max: 200, step: 1 },
    nuclearDuration: { min: 10, max: 100, step: 1 },
    maxFZMessage: { min: 3, max: 20, step: 1 },
    maxFZSynonym: { min: 1, max: 16, step: 1 },
    maxFZMessageNode: { min: 3, max: 20, step: 1 },
    maxFZSynonymNode: { min: 1, max: 16, step: 1 },
    baseVolume: { min: 0, max: 1, step: 0.01 },
    fadeFactor: { min: 0, max: 0.9, step: 0.01 },
    minVolume: { min: 0, max: 1, step: 0.01 },
    nodeOpacityBtmLimit: { min: 0.1, max: 1, step: 0.01 },
    nodeOpacityTopLimit: { min: 0.1, max: 1, step: 0.01 },
  }

  const form = document.createElement("form")
  form.className = "config-form"
  form.id = "config-form"

  // helper: camelCase → "Regular English"
  const makeLabel = (key) =>
    key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())

  Object.entries(config).forEach(([key, { min, max, step }]) => {
    const wrapper = document.createElement("div")
    wrapper.className = "form-row"

    const label = document.createElement("label")
    label.htmlFor = key
    label.textContent = makeLabel(key)

    // const valueOutput = document.createElement("span")
    // valueOutput.className = "range-value"
    // valueOutput.textContent = min

    const input = document.createElement("input")
    input.type = "range"
    input.id = key
    input.name = key
    input.min = min
    input.max = max
    input.step = step
    input.value = min

    input.addEventListener("input", () => {
      valueOutput.textContent = input.value
    })

    wrapper.append(label, input)
    form.appendChild(wrapper)
  })

  // ---- Radio buttons: hideMainTextAtNuclear ----
  const radioWrapper = document.createElement("fieldset")
  radioWrapper.className = "form-row"

  const legend = document.createElement("legend")
  legend.textContent = "Hide Main Text At Nuclear"

  const yesLabel = document.createElement("label")
  const yesInput = document.createElement("input")
  yesInput.type = "radio"
  yesInput.name = "hideMainTextAtNuclear"
  yesInput.value = "yes"
  yesInput.checked = true
  yesLabel.append(yesInput, " Yes")

  const noLabel = document.createElement("label")
  const noInput = document.createElement("input")
  noInput.type = "radio"
  noInput.name = "hideMainTextAtNuclear"
  noInput.value = "no"
  noLabel.append(noInput, " No")

  radioWrapper.append(legend, yesLabel, noLabel)
  form.appendChild(radioWrapper)

  return form
}

// const form = createConfigPanel()
// document.body.appendChild(form)
