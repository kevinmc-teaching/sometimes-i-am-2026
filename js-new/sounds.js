import { getLang } from "./state/language-state.js"
import { TEXTDATA, LANG_MAP } from "./text-data.js"
import { config } from "./config.js"

const activeSounds = []
const baseVolume = config.baseVolume
const fadeFactor = config.fadeFactor
const minVolume = config.minVolume

export function loadSounds(lang) {
  const soundsNumber = Object.keys(TEXTDATA[lang]).length

  for (let i = 1; i < soundsNumber; i++) {
    const full_lang = LANG_MAP[lang]
    const recording = TEXTDATA[lang][i].sound
    const recordingPath = `../sounds/${full_lang}/${recording}`
    const audio = document.createElement("audio")
    audio.id = `sound-${i}`
    audio.dataset.playing = "false"
    audio.src = recordingPath
    addSoundListeners(audio)
    document.body.appendChild(audio)
  }
}

export function removeSounds() {
  const sounds = document.querySelectorAll("audio")
  // console.log(sounds)
  sounds.forEach((sound) => {
    document.body.removeChild(sound)
  })
}

export function randomSound(language, soundNum = 10, sound) {
  // console.log(language, soundNum, sound)
  const audio = document.createElement("audio")
  const contentContainer = document.querySelector(".content-container")
  // const path = `../sounds/${LANG_MAP[language]}/${TEXTDATA[language][soundNum][sound]}`
  const path = `../sounds/${LANG_MAP[language]}/${sound}`
  // console.log("RANDOM SOUND PATH: ", path)
  audio.src = path
  audio.id = `random-sound-${language}-${soundNum}`
  document.body.appendChild(audio)
  audio.play()
}

export function playSound(btnId = 1) {
  // reduce volume of active sounds
  // manageActiveSounds()

  // console.log("PLAY SOUND CALLED FOR BUTTON ID: ", btnId)
  const sound = document.querySelector(`#sound-${btnId}`)
  // console.log("Sound element found:", sound)
  sound.play()
  addSoundListeners(sound)
  // activeSounds.unshift(audio)
  // audio.play()
  // manageActiveSounds(audio)
  // console.log(activeSounds)
}

function addSoundListeners(sound) {
  sound.addEventListener("play", () => {
    sound.dataset.playing = "true"
  })
  sound.addEventListener("pause", () => {
    sound.dataset.playing = "false"
  })
  sound.addEventListener("ended", () => {
    sound.dataset.playing = "false"
    sound.volume = baseVolume
    const index = activeSounds.indexOf(sound)
    activeSounds.splice(activeSounds.indexOf(sound), 1)
    // console.log(activeSounds)
  })
}

function manageActiveSounds(audio) {
  activeSounds.forEach((sound, index) => {
    if (sound.dataset.playing === "true") {
      const newVolume = baseVolume - (index + 1) * fadeFactor
      sound.volume = newVolume >= minVolume ? newVolume : minVolume
    }
  })
}
