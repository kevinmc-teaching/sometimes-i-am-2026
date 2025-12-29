import { config } from "../config.js"

let updatesNum = 0
let currentBtn = 1
let nuclear = false
let randomLang = "en"
let randomSound = 1

let currentLang = localStorage.getItem("langChoice") || detectBrowserLang()

function detectBrowserLang() {
  const full = navigator.language || navigator.userLanguage
  return full.split("-")[0] // get "en" from "en-CA", etc.
}

// UPDATE LANGUAGE STATE
export function setLang(lang) {
  currentLang = lang
  localStorage.setItem("langChoice", lang)
}

// READ LANGUAGE STATE
export function getLang() {
  return currentLang
}

// READ UPDATE COUNT
export function getUpdatesNum() {
  return updatesNum
}

// INCREMENT UPDATE COUNT
export function incrementUpdatesNum() {
  updatesNum += 1
}

// RESET UPDATE COUNT
export function resetUpdatesNum() {
  // console.log("RESETTING UPDATES NUMBER TO ZERO")
  updatesNum = 0
}

export function toggleNuclear() {
  nuclear = !nuclear
}

export function isNuclear() {
  if (updatesNum >= config.nuclearTrigger) {
    toggleNuclear()
  }
}

export function updateCurrentBtn(btnId) {
  currentBtn = btnId
}

export function getCurrentBtn() {
  return currentBtn
}

export function updateRandomLangSound() {
  randomLang = randomTextBlock().language
  randomSound = randomTextBlock().sound
}

export function getRandomLang() {
  return randomLang
}
export function getRandomSound() {
  return randomSound
}
