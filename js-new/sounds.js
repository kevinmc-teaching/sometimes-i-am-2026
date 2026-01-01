import { getLang } from "./state/language-state.js"
import { TEXTDATA, LANG_MAP } from "./text-data.js"
import { config } from "./config.js"

const activeSounds = []

export function loadSounds(lang) {
  const soundsNumber = Object.keys(TEXTDATA[lang]).length

  for (let i = 1; i <= soundsNumber; i++) {
    const full_lang = LANG_MAP[lang]
    const recording = TEXTDATA[lang][i].sound
    const recordingPath = `./sounds/${full_lang}/${recording}`
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
  // const path = `./sounds/${LANG_MAP[language]}/${TEXTDATA[language][soundNum][sound]}`
  const path = `./sounds/${LANG_MAP[language]}/${sound}`
  // console.log("RANDOM SOUND PATH: ", path)
  audio.src = path
  audio.id = `random-sound-${language}-${soundNum}`
  document.body.appendChild(audio)
  audio.play()
}

export function playSound(btnId = 1) {
  const sound = document.querySelector(`#sound-${btnId}`)
  if (!sound) return

  const i = activeSounds.indexOf(sound)
  if (i !== -1) activeSounds.splice(i, 1)
  activeSounds.unshift(sound)

  sound.volume = config.baseVolume
  sound.play().catch(() => {})

  manageActiveSounds()
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
    sound.volume = config.baseVolume
    const index = activeSounds.indexOf(sound)
    if (index !== -1) activeSounds.splice(index, 1)
  })
}

function manageActiveSounds() {
  activeSounds.forEach((sound, index) => {
    if (sound.dataset.playing === "true") {
      const newVolume = config.baseVolume - index * config.fadeFactor
      sound.volume = Math.max(newVolume, config.minVolume)
    }
  })
}
