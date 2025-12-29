import * as state from "./state/language-state.js"

window.addEventListener("click", (e) => {
  if (e.target.closest("#language-menu")) return // ignore select menu clicks
  hideInstructions()
})

export const SITENAMES = {
  en: "sometimes i am",
  fr: "parfois je suis",
  ja: "ときどき わたしは",
  it: "a volte io sono",
  es: "a veces yo soy",
  fa: "بعضی وقت ها من",
  ur: "کبھی کبھی میں",
  de: "manchmal bin ich",
  ko: "이따금 나는",
}

export const INSTRUCTIONS = {
  en: "go ahead: click somewhere...",
  fr: "allez-y: cliquez n'importe où...",
  ja: "どこでもクリックしてください。",
  it: "fai clic su un punto qualsiasi",
  es: "cliquear en cualquier lugar de la pantalla",
  fa: "شروع کن: هرجا (یا روی هرنقطه) کلیک کن",
  ur: "آگے بڑھیں: کہیں بھی کلک کریں...",
  de: "los geht’s: klick irgendwo",
  ko: "해보세요: 아무곳이나 눌러보세요 (클릭, 터치)",
}

export function updateInstructionsText(langChoice) {
  const activeSitenameSpan = document.getElementById("active-sitename")
  const instructionTextSpan = document.querySelector(".instruction-text")
  const langMenu = document.getElementById("language-menu")
  const lang = state.getLang()
  const optionDefault = langMenu.querySelector(`option[value=${lang}`)
  optionDefault.selected = true

  document.body.className = ""
  document.body.classList.add(`lang-${lang}`)

  activeSitenameSpan.textContent = SITENAMES[lang]
  instructionTextSpan.textContent = `[ ${INSTRUCTIONS[lang]} ]`
  instructionTextSpan.textContent = `${INSTRUCTIONS[lang]}`
}

export function hideInstructions() {
  const instructionTextSpan = document.querySelector(".instruction-text")
  instructionTextSpan.style.display = "none"
}

export function showInstructions() {
  const instructionTextSpan = document.querySelector(".instruction-text")
  instructionTextSpan.style.display = "block"
}
