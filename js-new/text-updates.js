import * as state from "./state/language-state.js"
import { SITENAMES, INSTRUCTIONS } from "./ui-text.js"
import { TEXTDATA } from "./text-data.js"
import { config } from "./config.js"
import * as sounds from "./sounds.js"

const activeSitenameSpan = document.getElementById("active-sitename")
const instructionTextSpan = document.querySelector(".instruction-text")
const langMenu = document.getElementById("language-menu")

export function hideInstructions() {
  instructionTextSpan.style.display = "none"
}

export function showInstructions() {
  instructionTextSpan.style.display = "block"
}

export function updateUIText(lang) {
  // const lang = state.getLang()
  const optionDefault = langMenu.querySelector(`option[value=${lang}`)
  optionDefault.selected = true

  document.body.className = ""
  document.body.classList.add(`lang-${lang}`)

  activeSitenameSpan.textContent = SITENAMES[lang]
  instructionTextSpan.textContent = `[ ${INSTRUCTIONS[lang]} ]`
  instructionTextSpan.textContent = `${INSTRUCTIONS[lang]}`
}

export function updateMainText() {
  const lang = state.getLang()
  const btnId = state.getCurrentBtn()

  const messageText = document.querySelector(".message-text")
  const messageSynonym = document.querySelector(".message-synonym")

  messageText.textContent = TEXTDATA[lang][btnId].text
  messageText.style.fontSize = randomFontSize(config.maxFZMessage)
  messageSynonym.textContent = TEXTDATA[lang][btnId].synonym
  messageText.style.fontSize = randomFontSize(config.maxFZSynonym)

  // console.log("TEXT UPDATED ", state.getUpdatesNum(), " TIMES")
}

export function newTextNode() {
  // console.log("IN NEW TEXT NODE")
  const messagesWrapper = document.querySelector(".messages-output-wrapper")

  // Destructuring object returned from randomTextBlock function creates five variables.
  const { language, text, synonym, sound, number } = randomTextBlock()

  // console.log(
  //   "RANDOM TEXT BLOCK DATA: ",
  //   language,
  //   text,
  //   synonym,
  //   sound,
  //   number
  // )

  const newNodeWrapper = document.createElement("div")
  newNodeWrapper.classList.add("new-text-node")

  const newMessage = document.createElement("p")
  newMessage.textContent = text
  newMessage.classList.add("message-text")
  newMessage.style.fontSize = randomFontSize(config.maxFZMessageNode)
  newNodeWrapper.appendChild(newMessage)

  const newSynonym = document.createElement("p")
  newSynonym.textContent = synonym
  newSynonym.classList.add("message-synonym")
  newSynonym.style.fontSize = randomFontSize(config.maxFZMessageNode)

  newNodeWrapper.appendChild(newSynonym)

  messagesWrapper.appendChild(newNodeWrapper)

  newNodeWrapper.style.position = "absolute"
  newNodeWrapper.style.top = `${randomLocation().y}px`
  newNodeWrapper.style.left = `${randomLocation().x}px`
  newNodeWrapper.style.opacity = randomOpacity()

  sounds.randomSound(language, number, sound)
}

function randomTextBlock() {
  const languages = Object.keys(SITENAMES)
  const randValue = Math.floor(Math.random() * languages.length)
  const randLang = languages[randValue]
  // console.log("++++++++++ RANDOM LANGUAGE: ", randLang)

  const randData = TEXTDATA[randLang]
  // get the number of phrase blocks in that language's data
  const randPhraseNum = Object.keys(randData).length
  // console.log("NUMBER OF PHRASES: ", randPhraseNum)

  // choose one phrase block at random from that data
  const randPhraseBlockNum = randomNumber(randPhraseNum)
  // console.log("RANDOM PHRASE BLOCK NUMBER: ", randPhraseBlockNum)

  const randPhraseBlock = randData[randPhraseBlockNum]
  // console.log("RANDOM PHRASE BLOCK: ", randPhraseBlock)

  return {
    language: randLang,
    text: randPhraseBlock.text,
    synonym: randPhraseBlock.synonym,
    sound: randPhraseBlock.sound,
    number: randPhraseBlock.number,
  }
}

function randomLocation() {
  const messagesArea = document.querySelector(".messages-output-wrapper")

  const messagesAreaW = messagesArea.clientWidth
  const messagesAreaH = messagesArea.clientHeight

  const randPointX = randomNumber(messagesAreaW)
  const randPointY = randomNumber(messagesAreaH)
  const randLocation = { x: randPointX, y: randPointY }

  return randLocation
}

function randomOpacity() {
  return (
    Math.random() * config.nodeOpacityTopLimit +
    config.nodeOpacityBtmLimit
  ).toFixed(2)
}

export function removeTextNodes() {
  const newTextNodes = document.querySelectorAll(".new-text-node")
  newTextNodes.forEach((node) => {
    node.remove()
  })
}

function randomNumber(input) {
  return Math.ceil(Math.random() * input)
}
function randomFontSize(input) {
  return `${randomNumber(input)}cqw`
}
