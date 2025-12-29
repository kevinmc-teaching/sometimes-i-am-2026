import en from "./language-data/data-english.js"
import ja from "./language-data/data-japanese.js"
import it from "./language-data/data-italian.js"
import es from "./language-data/data-spanish.js"
import fa from "./language-data/data-persian.js"
import ur from "./language-data/data-urdu.js"
import de from "./language-data/data-german.js"
import fr from "./language-data/data-french.js"
import ko from "./language-data/data-korean.js"

export const TEXTDATA = {
  en: normalizeBySoundNum(en),
  ja: normalizeBySoundNum(ja),
  it: normalizeBySoundNum(it),
  es: normalizeBySoundNum(es),
  fa: normalizeBySoundNum(fa),
  ur: normalizeBySoundNum(ur),
  de: normalizeBySoundNum(de),
  fr: normalizeBySoundNum(fr),
  ko: normalizeBySoundNum(ko),
}
export const LANG_MAP = {
  en: "english",
  ja: "japanese",
  it: "italian",
  es: "spanish",
  fa: "persian",
  ur: "urdu",
  de: "german",
  fr: "french",
  ko: "korean",
}

function normalizeBySoundNum(arr) {
  return Object.fromEntries(arr.map((item) => [item.soundNum, item]))
}
