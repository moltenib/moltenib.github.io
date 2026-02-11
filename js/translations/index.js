import { EN_TRANSLATIONS } from "./en.js";
import { ES_TRANSLATIONS } from "./es.js";
import { DE_TRANSLATIONS } from "./de.js";
import { IT_TRANSLATIONS } from "./it.js";

const TRANSLATIONS_BY_LOCALE = {
    en: EN_TRANSLATIONS,
    es: ES_TRANSLATIONS,
    de: DE_TRANSLATIONS,
    it: IT_TRANSLATIONS
};
export const SUPPORTED_LOCALES = Object.keys(TRANSLATIONS_BY_LOCALE);
const DEFAULT_LOCALE = "en";

const STORAGE_KEY = "recorder_locale";
let current_locale = "";

function normalize_locale(locale) {
    if (!locale) {
        return "";
    }

    return String(locale).trim().toLowerCase().split("-")[0];
}

function resolve_supported_locale(locale) {
    const normalized = normalize_locale(locale);

    return TRANSLATIONS_BY_LOCALE[normalized] ? normalized : null;
}

function get_stored_locale() {
    try {
        return resolve_supported_locale(
            window.localStorage.getItem(STORAGE_KEY)
        );
    } catch (_error) {
        return null;
    }
}

export function detect_locale() {
    const candidates = [
        new URLSearchParams(window.location.search).get("lang"),
        get_stored_locale(),
        navigator.language,
        document.documentElement.lang
    ];

    for (let i = 0; i < candidates.length; i++) {
        const locale = resolve_supported_locale(candidates[i]);

        if (locale) {
            return locale;
        }
    }

    return DEFAULT_LOCALE;
}

export function set_locale(locale) {
    current_locale = resolve_supported_locale(locale) || detect_locale();

    try {
        window.localStorage.setItem(STORAGE_KEY, current_locale);
    } catch (_error) {
        /* Ignore storage errors in restricted environments. */
    }

    return current_locale;
}

export function get_current_locale() {
    if (!resolve_supported_locale(current_locale)) {
        set_locale(detect_locale());
    }

    return current_locale;
}

export function get_translations(locale = get_current_locale()) {
    const normalized = resolve_supported_locale(locale) || DEFAULT_LOCALE;

    return TRANSLATIONS_BY_LOCALE[normalized];
}
