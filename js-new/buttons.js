import { config } from "./config.js"
import * as state from "./state/language-state.js"
import { TEXTDATA } from "./text-data.js"
import * as textUpdates from "./text-updates.js"
import * as sounds from "./sounds.js"

const buttonContainer = document.querySelector(".button-grid")

export function addButtons() {
  let lang = state.getLang()
  const btnQuantity = Object.keys(TEXTDATA[lang]).length

  // Grid changes based on number of buttons.
  //Chained ternary operator: the "false" part of the first condition is another ternary operator, resolving to medium if less than 70 (ie between 60 and 70), otherwise resolving to large
  const gridClass =
    btnQuantity <= 60
      ? "grid-small"
      : btnQuantity <= 70
      ? "grid-medium"
      : "grid-large"

  buttonContainer.classList.add(gridClass)

  // Create buttons based on btnQuantity
  for (let i = 0; i < btnQuantity; i++) {
    const btn = document.createElement("button")
    btn.className = `btn-${i + 1}`
    btn.dataset.buttonId = i + 1
    buttonContainer.appendChild(btn)
    btn.textContent = i + 1
  }

  buttonContainer.addEventListener("click", doButtonStuff)
  buttonContainer.addEventListener("pointerover", doButtonStuff)
}

export function removeButtons() {
  buttonContainer.classList.remove("grid-small", "grid-medium", "grid-large")
  const buttons = buttonContainer.querySelectorAll("button")
  buttons.forEach((button) => button.remove())
}

function doButtonStuff(e) {
  if (e.type === "pointerover" && e.pointerType !== "mouse") return

  if (state.getUpdatesNum() >= config.nuclearTrigger) {
    textUpdates.newTextNode()
  } else {
    const messageText = document.querySelector(".message-text")
    const messageSynonym = document.querySelector(".message-synonym")
    const targetedElement = e.target
    if (targetedElement.tagName === "BUTTON") {
      const btnId = +targetedElement.dataset.buttonId
      // console.log("BUTTON ID: ", btnId)
      textUpdates.updateMainText()
      sounds.playSound(btnId)
      state.incrementUpdatesNum()
      state.updateCurrentBtn(btnId)
    }
  }
}
