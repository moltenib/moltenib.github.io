import {
    get_current_locale,
    get_translations,
    set_locale,
    SUPPORTED_LOCALES
} from "./translations/index.js";

const LABEL_KEYS = {
    size: "size",
    style: "style",
    accidental: "accidental",
    "as-written": "as_written",
    key: "key",
    clef: "clef"
};

let language_selector_bound = false;

function set_text(selector, text) {
    const element = document.querySelector(selector);

    if (element && typeof text === "string") {
        element.textContent = text;
    }
}

function set_meta_content(property, content) {
    const element = document.querySelector("meta[property='" + property + "']");

    if (element && typeof content === "string") {
        element.setAttribute("content", content);
    }
}

function set_select_options(select_id, options) {
    const element = document.getElementById(select_id);

    if (!element || !Array.isArray(options)) {
        return;
    }

    for (let i = 0; i < element.options.length && i < options.length; i++) {
        element.options[i].text = options[i];
    }
}

function on_language_selector_click(event) {
    const target = event.target;

    if (!(target instanceof Element)) {
        return;
    }

    const button = target.closest("button[data-locale]");

    if (!button) {
        return;
    }

    apply_i18n(button.dataset.locale);
}

function render_language_selector(locale, languages) {
    const element = document.querySelector(".language-selector");

    if (!element) {
        return;
    }

    const parts = SUPPORTED_LOCALES.map(function(code) {
        const label = (languages && languages[code]) || code.toUpperCase();

        if (code === locale) {
            return "<strong>" + label + "</strong>";
        }

        return (
            "<button type=\"button\" data-locale=\""
            + code
            + "\">"
            + label
            + "</button>"
        );
    });

    element.innerHTML = parts.join(" | ");

    if (!language_selector_bound) {
        element.addEventListener("click", on_language_selector_click);
        language_selector_bound = true;
    }
}

function render_description(description, footnote) {
    const element = document.querySelector(".description");

    if (!element || !Array.isArray(description)) {
        return;
    }

    const parts = description.map(function(paragraph) {
        return "<p>" + paragraph + "</p>";
    });

    if (footnote) {
        parts.push("<p class=\"footnote\">" + footnote + "</p>");
    }

    element.innerHTML = parts.join("\n");
}

function hide_tooltip() {
    const tooltip = document.getElementById("hole-tooltip");

    if (tooltip) {
        tooltip.style.display = "none";
    }
}

export function apply_i18n(locale = null) {
    const active_locale = set_locale(locale || get_current_locale());
    const translations = get_translations(active_locale);
    const page = translations.page || {};
    const labels = page.labels || {};
    const options = page.options || {};

    document.documentElement.lang = translations.locale || active_locale;

    if (page.title) {
        document.title = page.title;
    }

    set_meta_content("og:title", page.og_title || page.title || "");
    set_meta_content("og:description", page.og_description || "");

    set_text(".sidea h1", page.heading);
    set_text(".sidea > p", page.intro);

    for (const element_id in LABEL_KEYS) {
        const translation_key = LABEL_KEYS[element_id];
        set_text("label[for='" + element_id + "']", labels[translation_key]);
        set_select_options(element_id, options[translation_key]);
    }

    set_text("#out-of-range p", page.out_of_range);
    set_text("#too-small h3", page.too_small);

    render_description(page.description, page.footnote);
    render_language_selector(active_locale, page.languages);
    hide_tooltip();

    window.dispatchEvent(
        new CustomEvent("localechange", {
            detail: { locale: active_locale }
        })
    );
}
