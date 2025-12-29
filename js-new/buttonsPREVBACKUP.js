import { getLang } from "./state/language-state.js"
import { TEXTDATA } from "./text-data.js"
import {
  updateMainText,
  newTextNode,
  getTextUpdatesNum,
} from "./text-updates.js"
import { hideInstructions, showInstructions } from "./ui-text.js"
// import { playSound } from "./sounds.js"
import { config } from "./config.js"
// import { outputContent } from "./content-output.js"

const buttonContainer = document.querySelector(".button-grid")

export function addButtons() {
  const buttonContainer = document.querySelector(".button-grid")
  const lang = getLang()
  const btnQuantity = Object.keys(TEXTDATA[lang]).length

  // To allow for grid changes based on number of buttons
  if (btnQuantity <= 60) {
    buttonContainer.classList.add("grid-small")
  } else if (btnQuantity <= 70) {
    buttonContainer.classList.add("grid-medium")
  } else {
    buttonContainer.classList.add("grid-large")
  }

  // Create buttons based on btnQuantity
  for (let i = 0; i < btnQuantity; i++) {
    const btn = document.createElement("button")
    btn.className = `btn-${i}`
    btn.dataset.buttonId = i
    buttonContainer.appendChild(btn)
    btn.textContent = i + 1
  }
}
export function removeButtons() {
  buttonContainer.classList.remove("grid-small", "grid-medium", "grid-large")
  const buttons = buttonContainer.querySelectorAll("button")
  buttons.forEach((button) => button.remove())
}

export function buttonClickHandler() {
  buttonContainer.addEventListener("click", doButtonStuff)
}

export function buttonMouseOverHandler() {
  buttonContainer.addEventListener("pointerover", doButtonStuff)
}

function doButtonStuffPREVIOUS(e) {
  // Treat pointerover as mouseover only if's an actual mouse.
  if (e.type === "pointerover" && e.pointerType !== "mouse") return

  if (getTextUpdatesNum() >= configuration.nuclearTrigger) {
    newTextNode()
  } else {
    const messageText = document.querySelector(".message-text")
    const messageSynonym = document.querySelector(".message-synonym")
    const targetedElement = e.target
    if (targetedElement.tagName === "BUTTON") {
      // plus sign converts string to number. Could also use parseInt.
      const buttonId = +targetedElement.dataset.buttonId
      updateMainText(buttonId + 1)
      playSound(buttonId + 1)
      phraseNum++
    }
  }
}

export function doButtonStuff(e) {
  // Treat pointerover as mouseover only if's an actual mouse.
  if (e.type === "pointerover" && e.pointerType !== "mouse") return
  outputContent(e)
  // outputContent(e.target.buttonId + 1)
}

export function storeBtnNumber(btnNumber = "1") {
  localStorage.setItem("lastBtnNumber", btnNumber)
}

export function getStoredBtnNumber() {
  return localStorage.getItem("lastBtnNumber")
}
