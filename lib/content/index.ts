import type { Locale } from "@/lib/i18n/config"
import { en, type Dictionary } from "./en"
import { fr } from "./fr"
import { ar } from "./ar"

const dictionaries: Record<Locale, Dictionary> = { en, fr, ar }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

export type { Dictionary }
